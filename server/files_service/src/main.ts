import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { FilesService } from "./files/files.service";
import { resolve } from "path";

const URL = process.env.FILES_SERVICE_URL;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: "files",
                protoPath: resolve(__dirname, "..", "src", "proto", "files.proto"),
                url: URL,
                maxReceiveMessageLength: 1024 * 1024 * 1024 * 10,
                maxSendMessageLength: 1024 * 1024 * 1024 * 10,
            },
        },
    );
    const filesService = app.get(FilesService);
    await filesService.initialize();
    await app.listen();
    console.log(`Files microservice is started on ${URL}`);
}
    
bootstrap();