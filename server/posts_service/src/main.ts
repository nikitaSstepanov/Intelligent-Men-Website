import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { FilesService } from "./files/files.service";
import { resolve } from "path";

const URL = process.env.POSTS_SERVICE_URL;
const filesService = new FilesService();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.GRPC,
      options: {
        package: "posts",
        protoPath: resolve(__dirname, "..", "src", "proto", "posts.proto"),
        url: URL,
        maxReceiveMessageLength: 1024 * 1024 * 1024 * 10,
        maxSendMessageLength: 1024 * 1024 * 1024 * 10,
      },
    },
  );
  await filesService.initialize();
  await app.listen();
  console.log(`Posts microservice is started on ${URL}`);
}

bootstrap();