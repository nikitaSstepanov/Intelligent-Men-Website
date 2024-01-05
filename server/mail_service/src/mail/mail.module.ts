import { Module } from "@nestjs/common";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
config({ path: "../.env" });

const configService = new ConfigService();

@Module({
    controllers: [MailController],
    providers: [MailService],
    imports: [
        MailerModule.forRoot({
            transport: {
                host: configService.get<string>("MAIL_HOST"), 
                port: configService.get<number>("MAIL_PORT"),
                secure: configService.get<boolean>("IS_SECURE"),
                auth: {
                    user: configService.get<string>("MAIL_USER"),
                    pass: configService.get<string>("MAIL_PASSWORD"),
                },
            },
            defaults: {
                from: `"Intelligent Men" <${configService.get<string>("MAIL_USER")}>`,
            },
        }),
    ],
})
export class MailModule {}