import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { FilesService } from "src/files/files.service";
import { MailService } from "src/mail/mail.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokensEntity } from "./entities/tokens.entity";
import { UsersEntity } from "src/users/entities/users.entity";
import { RolesEntity } from "src/roles/entities/roles.entity";
import { MailModule } from "src/mail/mail.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
config({ path: "../.env" });

const configService = new ConfigService();
const mailServiceUrl = configService.get<string>("MAIL_SERVICE_URL");

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtService, UsersService, FilesService, MailService],
    imports: [
        TypeOrmModule.forFeature([TokensEntity, UsersEntity, RolesEntity]),
        JwtModule.register({}),
        MailModule,
        
    ],
})
export class AuthModule {}