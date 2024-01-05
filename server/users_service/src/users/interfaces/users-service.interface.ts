import { GetUserIdDto } from "../dto/get-user-id.dto";
import { RegistrationDto } from "src/auth/dto/registration.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";

export interface IUsersService {
    findProfile(dto:  GetUserIdDto): Promise<Profile>;
    findUser(dto: GetUserIdDto): Promise<User>;
    createUser(dto: RegistrationDto): Promise<CreationResult>;
    updUser(dto: UpdateProfileDto): Promise<Empty>;
    delUser(dto: GetUserIdDto): Promise<void>;
}