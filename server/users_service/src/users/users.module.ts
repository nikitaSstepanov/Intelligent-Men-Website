import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { FilesService } from "src/files/files.service";
import { MailService } from "src/mail/mail.service";
import { UsersEntity } from "./entities/users.entity";
import { RolesEntity } from "src/roles/entities/roles.entity";
import { MailModule } from "src/mail/mail.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService, FilesService, MailService],
    imports: [
        TypeOrmModule.forFeature([UsersEntity, RolesEntity]), 
        MailModule,
    ],
})
export class UsersModule {}