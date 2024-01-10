import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { LikesModule } from "./likes/likes.module";
import { FilesModule } from "./files/files.module";
import { resolve } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "../../.env",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("POSTS_DB_HOST"),
        port: configService.get<number>("POSTS_DB_PORT"),
        username: configService.get<string>("POSTS_DB_USERNAME"),
        password: configService.get<string>("POSTS_DB_PASSWORD"),
        database: configService.get<string>("POSTS_DB_DATABASE"),
        synchronize: false,
        entities: [resolve(__dirname, "**", "entities", "*entity.ts")],
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    CommentsModule,
    LikesModule,
    FilesModule,
  ],
})
export class AppModule {}