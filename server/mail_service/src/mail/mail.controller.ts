import { Controller, UsePipes } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { IMailController } from "./interfaces/mail-controller.interface";
import { MailService } from "./mail.service";
import { ActivationDto } from "./dto/activation.dto";
import { AdminRoleMessageDto } from "./dto/admin-role-msg.dto";
import { MemberRoleMessageDto } from "./dto/member-role-msg.dto";
import { PostCreatedDto } from "./dto/post-created.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller()
export class MailController implements IMailController {

    constructor(private readonly mailService: MailService) {}
    
    @UsePipes(new ValidationPipe())
    @GrpcMethod("MailService", "SendActivatonMessage")
    async sendActivationMessage(dto: ActivationDto): Promise<Empty> {

        return await this.mailService.sendActivationMessage(dto);
    }
    
    @GrpcMethod("MailService", "SendAdminRoleIsSettedMessage")
    async sendAdminRoleIsSettedMessage(dto: AdminRoleMessageDto): Promise<Empty> {
        return await this.mailService.sendAdminRoleIsSettedMessage(dto);
    }

    @GrpcMethod("MailService", "SendMemberRoleIsSettedMessage")
    async sendMemberRoleIsSettedMessage(dto: MemberRoleMessageDto): Promise<Empty> {
        return await this.mailService.sendMemberRoleIsSettedMessage(dto);
    }

    @GrpcMethod("MailService", "SendPostCreatedMessage")
    async sendPostCreatedMessage(dto: PostCreatedDto): Promise<Empty> {
        return await this.mailService.sendPostCreatedMessage(dto);
    }

}