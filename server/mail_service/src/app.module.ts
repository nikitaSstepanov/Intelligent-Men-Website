import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";
import { resolve } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: resolve(__dirname, "..", "..", "..", ".env"),
            isGlobal: true,
        }),
        MailModule,
    ],
})
export class AppModule {}