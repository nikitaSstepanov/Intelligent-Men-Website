import { Controller } from "@nestjs/common";
import { IAuthController } from "./interfaces/auth-controller.interface";
import { GrpcMethod } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LogoutDto } from "./dto/logout.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { AccessDto } from "./dto/access.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { ActivateAccountDto } from "./dto/activate.dto";

@Controller()
export class AuthController implements IAuthController {

    constructor(private readonly authService: AuthService) {}

    @GrpcMethod("UsersService", "Login")
    async login(dto: LoginDto): Promise<Tokens> {
        return await this.authService.login(dto);
    }

    @GrpcMethod("UsersService", "Logout")
    async logout(dto: LogoutDto): Promise<Empty> {
        return await this.authService.logout(dto);
    }

    @GrpcMethod("UsersService", "Registration")
    async registration(dto: RegistrationDto): Promise<Tokens> {
        return await this.authService.addUser(dto);
    }

    @GrpcMethod("UsersService", "CheckAccess")
    async checkAccess(dto: AccessDto): Promise<Status> {
        return await this.authService.checkAccess(dto);
    }

    @GrpcMethod("UsersService", "RefreshTokens")
    async refresh(dto: RefreshDto): Promise<Tokens> {
        return await this.authService.refresh(dto);
    }

    @GrpcMethod("UsersService", "ActivateAccount")
    async activateAccount(dto: ActivateAccountDto): Promise<Status> {
        return await this.authService.activateAccount(dto);
    }

    @GrpcMethod("UsersService", "DropRegistration")
    async dropReg(dto: ActivateAccountDto): Promise<Empty> {
        return await this.authService.dropRegistration(dto)
    }

}