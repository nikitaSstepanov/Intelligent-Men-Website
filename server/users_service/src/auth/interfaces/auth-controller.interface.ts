import { LoginDto } from "../dto/login.dto";
import { LogoutDto } from "../dto/logout.dto";
import { RegistrationDto } from "../dto/registration.dto";
import { AccessDto } from "../dto/access.dto";
import { RefreshDto } from "../dto/refresh.dto";
import { ActivateAccountDto } from "../dto/activate.dto";

export interface IAuthController {
    login(dto: LoginDto): Promise<Tokens>;
    logout(dto: LogoutDto): Promise<Empty>;
    registration(dto: RegistrationDto): Promise<Tokens>;
    checkAccess(dto: AccessDto): Promise<Status>;
    refresh(dto: RefreshDto): Promise<Tokens>;
    activateAccount(dto: ActivateAccountDto): Promise<Status>;
    dropReg(dto: ActivateAccountDto): Promise<Empty>;
}
