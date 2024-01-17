import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: "../../.env" });

const configService = new ConfigService();
const mailServiceUrl = configService.get<string>("MAIL_SERVICE_URL");

@Module({
    providers: [MailService],
    imports: [
        ClientsModule.register([
            {
                name: "MAIL_SERVICE",
                transport: Transport.GRPC,
                options: {
                    package: "mail",
                    protoPath: resolve(__dirname, "..", "..", "src", "mail", "proto", "mail.proto"),
                    url: mailServiceUrl,
                },
            }
        ]),
    ],
    exports: [ClientsModule]
})
export class MailModule {}