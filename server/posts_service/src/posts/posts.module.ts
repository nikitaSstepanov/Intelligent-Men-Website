import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { FilesService } from "../files/files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsEntity } from "./entities/posts.entity";
import { LikesEntity } from "../likes/entities/likes.entity";
import { TagsEntiy } from "./entities/tags.entity";
import { CommentsLikesEntity } from "../likes/entities/comments-likes.entity";

@Module({
    controllers: [PostsController],
    providers: [PostsService, FilesService],
    imports: [ 
        TypeOrmModule.forFeature([PostsEntity, LikesEntity, TagsEntiy, CommentsLikesEntity]),
    ],
})
export class PostsModule {}