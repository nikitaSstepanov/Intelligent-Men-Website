import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config({ path: resolve(__dirname, "..", "..", "..", "..", ".env") });
const configSerice = new ConfigService();
const filesSericeUrl = configSerice.get<string>("FILES_SERVICE_URL");

@Module({
    providers: [FilesService],
    imports: [
        ClientsModule.register([
            {
                name: "FILES_SERVICE",
                transport: Transport.GRPC,
                options: {
                    package: "files",
                    protoPath: resolve(__dirname, "..", "..", "src", "files", "proto", "files.proto"),
                    url: filesSericeUrl,
                },
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class FilesModule {}