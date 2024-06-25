import { ActivationDto } from "../dto/activation.dto";
import { AdminRoleMessageDto } from "../dto/admin-role-msg.dto";
import { MemberRoleMessageDto } from "../dto/member-role-msg.dto";
import { PostCreatedDto } from "../dto/post-created.dto";

export interface IMailService {
    sendActivationMessage(dto: ActivationDto): Promise<Empty>;
    sendAdminRoleIsSettedMessage(dto: AdminRoleMessageDto): Promise<Empty>;
    sendMemberRoleIsSettedMessage(dto: MemberRoleMessageDto): Promise<Empty>;
    sendPostCreatedMessage(dto: PostCreatedDto): Promise<Empty>;
}