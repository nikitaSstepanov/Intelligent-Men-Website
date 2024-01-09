import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "./files/files.module";
import { resolve } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: resolve(__dirname, "..", "..", ".env"),
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get<string>("FILES_DB_HOST"),
                port: configService.get<number>("FILES_DB_PORT"),
                username: configService.get<string>("FILES_DB_USERNAME"),
                password: configService.get<string>("FILES_DB_PASSWORD"),
                database: configService.get<string>("FILES_DB_DATABASE"),
                synchronize: false,
                entities: [resolve(__dirname, "..", "dist", "**", "entities", "*entity.js")],
              }),
              inject: [ConfigService],
        }),
        FilesModule,
    ],
})
export class AppModule {}