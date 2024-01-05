import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { FilesModule } from "./files/files.module";
import { MailModule } from "./mail/mail.module";
import { SeedModule } from "./config/seed/seed.module";
import { resolve } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: "../.env",
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get<string>("USERS_DB_HOST"),
                port: configService.get<number>("USERS_DB_PORT"),
                username: configService.get<string>("USERS_DB_USERNAME"),
                password: configService.get<string>("USERS_DB_PASSWORD"),
                database: configService.get<string>("USERS_DB_DATABASE"),
                synchronize: false,
                entities: [resolve(__dirname, "..", "dist", "**", "entities", "*entity.js")],
              }),
              inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        RolesModule,
        FilesModule,
        MailModule,
        SeedModule,
    ],
})
export class AppModule {}