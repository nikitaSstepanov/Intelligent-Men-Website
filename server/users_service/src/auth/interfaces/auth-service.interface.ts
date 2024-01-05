import { LoginDto } from "../dto/login.dto";
import { LogoutDto } from "../dto/logout.dto";
import { RegistrationDto } from "../dto/registration.dto";
import { RefreshDto } from "../dto/refresh.dto";
import { AccessDto } from "../dto/access.dto";
import { ActivateAccountDto } from "../dto/activate.dto";

export interface IAuthService {
    login(dto: LoginDto): Promise<Tokens>;
    logout(dto: LogoutDto): Promise<Empty>;
    addUser(dto: RegistrationDto): Promise<Tokens>;
    checkAccess(dto: AccessDto): Promise<Status>;
    refresh(dto: RefreshDto): Promise<Tokens>;
    activateAccount(dto: ActivateAccountDto): Promise<Status>;
    dropRegistration(dto: ActivateAccountDto): Promise<Empty>;
}