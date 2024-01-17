import { Observable } from "rxjs";
import { ActivationDto } from "../dto/activation.dto";
import { AdminRoleMessageDto } from "../dto/admin-role-msg.dto";
import { MemberRoleMessageDto } from "../dto/member-role-msg.dto";

export interface IGrpcMailService {
    sendActivatonMessage(dto: ActivationDto): Observable<Empty>;
    sendAdminRoleIsSettedMessage(dto: AdminRoleMessageDto): Observable<Empty>;
    sendMemberRoleIsSettedMessage(dto: MemberRoleMessageDto): Observable<Empty>;
}