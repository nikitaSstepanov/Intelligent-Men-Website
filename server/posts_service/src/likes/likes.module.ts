import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikesEntity } from "./entities/likes.entity";
import { PostsEntity } from "../posts/entities/posts.entity";
import { CommentsLikesEntity } from "./entities/comments-likes.entity";
import { CommentsEntity } from "../comments/entities/comments.entity";

@Module({
    controllers: [LikesController],
    providers: [LikesService],
    imports: [
        TypeOrmModule.forFeature([LikesEntity, PostsEntity, CommentsLikesEntity, CommentsEntity]),
    ],
})
export class LikesModule {}