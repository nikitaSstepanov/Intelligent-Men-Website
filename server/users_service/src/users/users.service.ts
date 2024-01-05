import { Injectable } from "@nestjs/common";
import { IUsersService } from "./interfaces/users-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilesService } from "src/files/files.service";
import { MailService } from "src/mail/mail.service";
import { UsersEntity } from "./entities/users.entity";
import { RolesEntity } from "src/roles/entities/roles.entity";
import { GetUserIdDto } from "./dto/get-user-id.dto";
import { RegistrationDto } from "../auth/dto/registration.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { hash } from "bcryptjs";
import { v4 } from "uuid";

@Injectable()
export class UsersService implements IUsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>,
        private readonly filesService: FilesService,
        private readonly mailService: MailService,
    ) {}

    async findProfile(dto:  GetUserIdDto): Promise<Profile> {
        const user = await this.usersRepository.findOne({
            where: { id: Number(dto.id) },
        });
        const photoPath = await this.filesService.getPhotoPath("users", user.contentDir);
        const description = await this.filesService.getDescription("users", user.contentDir);
        const result: Profile = {
            username: user.username,
            email: user.email,
            photoPath, 
            description,
            birthDay: user.birthDay,
        };
        return result; 
    }

    async findUser(dto: GetUserIdDto): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id: Number(dto.id) },
        });
        const profilePhotoPath = await this.filesService.getPhotoPath("users", user.contentDir);
        const result: User = {
            id: String(user.id),
            username: user.username,
            profilePhotoPath,
        };
        return result;
    }

    async createUser(dto: RegistrationDto): Promise<CreationResult> {
        const result: CreationResult = {};
        const check = await this.checkData(dto);
        if (!check.status) {
            result.errors = check.errors;
            return result;
        }
        const userRole = await this.rolesRepository.findOne({
            where: { name: "USER" },
        });
        let user = new UsersEntity();
        user.email = dto.email;
        user.username = dto.username;
        user.password = await hash(dto.password, 5);
        user.contentDir =  await this.filesService.saveFiles("users", dto.profilePhoto, dto.photoMimeType, dto.profileDescription);
        user.birthDay = dto.birthDay;
        user.roles = [userRole];
        user.activationUrl = v4() + dto.email;
        user = await this.usersRepository.save(user);
        result.id = user.id;
        return result;
    }

    async updUser(dto: UpdateProfileDto): Promise<Empty> {
        const user = await this.usersRepository.findOne({
            where: { id: Number(dto.id) },
        });
        if (dto.username) {
            const candidate1 = await this.usersRepository.findOne({
                where: { username: dto.username },
            });
            if (!candidate1) {
                user.username = dto.username;
            }
        }
        if (dto.password) {
            const hashPassword = await hash(dto.password, 5);
            user.password = hashPassword;
        }
        if (dto.email) {
            const candidate2 = await this.usersRepository.findOne({
                where: { email: dto.email },
            });
            if (!candidate2) {
                user.email = dto.email;
                user.activationUrl = v4() + dto.email;
                user.isActivated = false;
                const activationMessageData = {
                    url: user.activationUrl,
                    email: dto.email,
                    username: user.username,
                };
                await this.mailService.sendActivationMessage(activationMessageData);
            }
        }
        if (dto.birthDay) {
            user.birthDay = dto.birthDay;
        }
        await this.filesService.updFiles("users", user.contentDir, dto.profileDescription, dto.profilePhoto, dto.photoMimeType);
        await this.usersRepository.save(user);
        return {};
    }

    async delUser(dto: GetUserIdDto): Promise<void> {
        const user = await this.usersRepository.findOne({
            where: { id: Number(dto.id) },
        });
        await this.filesService.delFiles("users", user.contentDir);
        await this.usersRepository.delete(user.id);
    }

    private async checkData(dto: RegistrationDto): Promise<Status> {
        const result = {
            status: true,
            errors: [],
        };
        const candidate1 = await this.usersRepository.findOne({
            where: { email: dto.email },
        });
        if (candidate1) {
            result.errors.push("There is already a user with this email.");
        } 
        const candidate2 = await this.usersRepository.findOne({
            where: { username: dto.username },
        });
        if (candidate2) {
            result.errors.push("This username is already taken.");
        }
        if (result.errors.length != 0) {
            result.status = false;
            return result;
        }
        return result;
    }
    
}