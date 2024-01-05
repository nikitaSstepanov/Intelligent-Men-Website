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
      envFilePath: "../.env",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("TYPEORM_POSTS_HOST"),
        port: configService.get<number>("TYPEORM_POSTS_PORT"),
        username: configService.get<string>("TYPEORM_POSTS_USERNAME"),
        password: configService.get<string>("TYPEORM_POSTS_PASSWORD"),
        database: configService.get<string>("TYPEORM_POSTS_DATABASE"),
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