import { Injectable } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokensEntity } from "./entities/tokens.entity";
import { UsersEntity } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/mail/mail.service";
import { ConfigService } from "@nestjs/config";
import { LoginDto } from "./dto/login.dto";
import { LogoutDto } from "./dto/logout.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { AccessDto } from "./dto/access.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { ActivateAccountDto } from "./dto/activate.dto";
import { compare } from "bcryptjs";

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @InjectRepository(TokensEntity)
        private readonly tokensRepository: Repository<TokensEntity>,
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
    ) {}

    async login(dto: LoginDto): Promise<Tokens> {
        const tokens: Tokens = { refreshToken: "", accessToken: "" };
        let user: UsersEntity;
        if (dto.email) {
            user = await this.usersRepository.findOne({
                where: { email:  dto.email },
            });
            if (!user) {
                tokens.errors = ["Uncorrect email or password."];
                return tokens;
            }
        } else if (dto.username) {
            user = await this.usersRepository.findOne({
                where: { username:  dto.username },
            });
            if (!user) {
                tokens.errors = ["Uncorrect username or password."];
                return tokens;
            }
        } else {
            tokens.errors = ["Email or username was not selected."];
            return tokens;
        }
        const passwordEquals = compare(dto.password, user.password);
        if (!passwordEquals) {
            tokens.errors = ["Uncorrect email or password."];
            return tokens;
        } 
        const { refreshToken, accessToken } = await this.generateTokens(user);
        tokens.refreshToken = refreshToken;
        tokens.accessToken = accessToken;
        return tokens;
    }

    async logout(dto: LogoutDto): Promise<Empty> {
        const token = await this.tokensRepository.findOne({
            where: { token: dto.refreshToken },
        });
        await this.tokensRepository.delete(token.id);
        return {};
    }

    async addUser(dto: RegistrationDto): Promise<Tokens> {
        const tokens: Tokens = { refreshToken: "", accessToken: "" };
        const creationResult = await this.usersService.createUser(dto);
        if (creationResult.errors.length != 0) {
            tokens.errors = creationResult.errors;
            return tokens;
        }
        const user = await this.usersRepository.findOne({
            where: { id: creationResult.id },
            relations: { refresh_token: true },
        });
        const activationMessageData = { 
            url: user.activationUrl, 
            email: user.email, 
            username: user.username, 
        };
        await this.mailService.sendActivationMessage(activationMessageData);
        const { refreshToken, accessToken } = await this.generateTokens(user);
        tokens.refreshToken = refreshToken;
        tokens.accessToken = accessToken;
        return tokens;
    }

    async checkAccess(dto: AccessDto): Promise<Status> {
        const status_err: Status = { status: false, errors: ["Unauthorize"] };
        const data = await this.jwtService.verifyAsync(dto.accessToken, {
            secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
        });
        if (!data) {
            return status_err;
        }
        if (dto.id) {
            if (dto.id != data.id) {
                return status_err;
            }
        }
        for (const role of data.roles) {
            if (dto.roles.includes(role)) {
                const status: Status = { status: true };
                return status;
            }
        }
        return status_err;
    }

    async refresh(dto: RefreshDto): Promise<Tokens> {
        const tokens: Tokens = { refreshToken: "", accessToken: "" };
        const data = await this.jwtService.verifyAsync(dto.refreshToken, {
            secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
        });
        if (!data) {
            tokens.errors = ["Unauthorize"];
            return tokens;
        }
        const token = await this.tokensRepository.findOne({
            where: { token: dto.refreshToken },
            relations: { user: true },
        });
        const user = token.user;
        await this.tokensRepository.delete(token.id);
        const { refreshToken, accessToken } = await this.generateTokens(user);
        tokens.refreshToken = refreshToken;
        tokens.accessToken = accessToken;
        return tokens;
    }

    async activateAccount(dto: ActivateAccountDto): Promise<Status> {
        const user = await this.usersRepository.findOne({
            where: { activationUrl: dto.url },
        });
        user.isActivated = true;
        user.activationUrl = "";
        await this.usersRepository.save(user);
        const status = { status: true };
        return status;
    }

    async dropRegistration(dto: ActivateAccountDto): Promise<Empty> {
        const user = await this.usersRepository.findOne({
            where: { activationUrl: dto.url },
            relations: { refresh_token: true },
        });
        await this.logout({ refreshToken: user.refresh_token.token });
        await this.usersRepository.delete(user.id);
        return {};
    }

    private async generateTokens(user: UsersEntity): Promise<Tokens> {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
            expiresIn: "7d",
        });
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
            expiresIn: "1800s",
        });
        const newRefreshToken = new TokensEntity();
        newRefreshToken.token = refreshToken;
        newRefreshToken.user = user;
        await this.tokensRepository.save(newRefreshToken);
        const tokens: Tokens = {
            refreshToken,
            accessToken,
        };
        return tokens;
    }

}