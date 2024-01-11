import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { FilesService } from "../files/files.service";
import { CommentsEntity } from "./entities/comments.entity";
import { PostsEntity } from "../posts/entities/posts.entity";
import { CommentsLikesEntity } from "../likes/entities/comments-likes.entity";
import { FilesModule } from "src/files/files.module";

@Module({
    controllers: [CommentsController],
    providers: [CommentsService, FilesService],
    imports: [
        TypeOrmModule.forFeature([CommentsEntity, PostsEntity, CommentsLikesEntity]),
        FilesModule
    ],
})
export class CommentsModule {}