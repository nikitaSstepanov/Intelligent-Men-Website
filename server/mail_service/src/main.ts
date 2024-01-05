import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices/enums/transport.enum";
import { AppModule } from "./app.module";
import { resolve } from "path";
import { ServerCredentials } from "@grpc/grpc-js";

const URL = process.env.MAIL_SERVICE_URL;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: "mail",
                protoPath: resolve(__dirname, "..", "src", "proto", "mail.proto"),
                url: URL,
                maxReceiveMessageLength: 1024 * 1024 * 1024 * 10,
                maxSendMessageLength: 1024 * 1024 * 1024 * 10,
                credentials: ServerCredentials.createInsecure(),
            },
        },
    );
    await app.listen();
    console.log(`Mail microservice is started on ${URL}`);
}

bootstrap();