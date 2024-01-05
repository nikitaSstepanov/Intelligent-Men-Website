import { Controller } from "@nestjs/common";
import { IUsersController } from "./interfaces/users-controller.interface";
import { GrpcMethod } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { GetUserIdDto } from "./dto/get-user-id.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller()
export class UsersController implements IUsersController {

    constructor(private readonly usersService: UsersService) {}

    @GrpcMethod("UsersService", "GetProfile")
    async getProfile(dto: GetUserIdDto): Promise<Profile> {
        return await this.usersService.findProfile(dto);
    }

    @GrpcMethod("UsersService", "GetUser")
    async getUser(dto: GetUserIdDto): Promise<User> {
        return await this.usersService.findUser(dto);
    }

    @GrpcMethod("UsersService", "UpdateAccount")
    async updateUser(dto: UpdateProfileDto): Promise<Empty> {
        return await this.usersService.updUser(dto);
    }

    @GrpcMethod("UsersService", "DeleteAccount")
    async deleteUser(dto: GetUserIdDto): Promise<Empty> {
        return await this.deleteUser(dto);
    }

}