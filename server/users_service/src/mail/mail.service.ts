import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { IMailService } from "./interfaces/mail-service.interface";
import { ClientGrpc } from "@nestjs/microservices";
import { IGrpcMailService } from "./interfaces/mail-grpc-service.interface";
import { ActivationDto } from "./dto/activation.dto";
import { AdminRoleMessageDto } from "./dto/admin-role-msg.dto";
import { MemberRoleMessageDto } from "./dto/member-role-msg.dto";
import { firstValueFrom } from "rxjs";

@Injectable()
export class MailService implements IMailService, OnModuleInit {

    private mailService;

    constructor(
        @Inject("MAIL")
        private readonly client: ClientGrpc,
    ) {}

    onModuleInit() {
        this.mailService = this.client.getService("MailService");
    }

    async sendActivationMessage(dto: ActivationDto): Promise<void> {
        await firstValueFrom(this.mailService.sendActivatonMessage(dto));
    }

    async sendAdminRoleSetMessage(dto: AdminRoleMessageDto): Promise<void> {
        await this.mailService.sendAdminRoleIsSettedMessage(dto);
    }

    async sendMemberRoleSetMessage(dto: MemberRoleMessageDto): Promise<void> {
        await this.mailService.sendMemberRoleIsSettedMessage(dto);
    }

}