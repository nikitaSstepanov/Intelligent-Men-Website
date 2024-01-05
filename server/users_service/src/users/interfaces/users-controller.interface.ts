import { GetUserIdDto } from "../dto/get-user-id.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";

export interface IUsersController {
    getProfile(dto: GetUserIdDto): Promise<Profile>;
    getUser(dto: GetUserIdDto): Promise<User>;
    updateUser(dto: UpdateProfileDto): Promise<Empty>;
    deleteUser(dto: GetUserIdDto): Promise<Empty>;
}