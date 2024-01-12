import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices/enums/transport.enum";
import { AppModule } from "./app.module";
import { FilesService } from "./files/files.service";
import { Seeder } from "./config/seed/seed.service";
import { resolve } from "path";

const URL = process.env.USERS_SERVICE_URL;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: "users",
                protoPath: resolve(__dirname, "..", "src", "proto", "users.proto"),
                url: URL,
                maxReceiveMessageLength: 1024 * 1024 * 1024 * 10,
                maxSendMessageLength: 1024 * 1024 * 1024 * 10,
            },
        },
    );
    const seeder = app.get(Seeder);
    await seeder.seed();
    await app.listen()
    console.log(`Users microservice is started on ${URL}`);
}

bootstrap();