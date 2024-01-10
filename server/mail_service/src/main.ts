import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { resolve } from "path";

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
            },
        },
    );
    await app.listen();
    console.log(`Mail microservice is started on ${URL}`);
}

bootstrap();