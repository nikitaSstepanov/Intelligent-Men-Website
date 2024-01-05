import { Injectable } from "@nestjs/common";
import { ILikesService } from "./interfaces/likes-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LikesEntity } from "./entities/likes.entity";
import { PostsEntity } from "../posts/entities/posts.entity";
import { CommentsLikesEntity } from "./entities/comments-likes.entity";
import { CommentsEntity } from "../comments/entities/comments.entity";
import { PostLikeDto } from "./dto/post-like.dto";
import { CommentLikeDto } from "./dto/comment-like.dto";

@Injectable()
export class LikesService implements ILikesService {

    constructor(
        @InjectRepository(LikesEntity)
        private readonly likesRepository: Repository<LikesEntity>,
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
        @InjectRepository(CommentsLikesEntity)
        private readonly commentsLikesRepository: Repository<CommentsLikesEntity>,
        @InjectRepository(CommentsEntity)
        private readonly commentsRepository: Repository<CommentsEntity>,
    ) {}

    async addLikeToPost(dto: PostLikeDto): Promise<Empty> {
        let post = await this.postsRepository.findOne({
            where: { id: Number(dto.postId) },
        });
        post.likesNumber += 1;
        await this.postsRepository.save(post);
        const like = new LikesEntity();
        like.userId = Number(dto.userId);
        like.postId = Number(dto.postId);
        await this.likesRepository.save(like);
        return {};
    }

    async rmLikeFromPost(dto: PostLikeDto): Promise<Empty> {
        const post = await this.postsRepository.findOne({
            where: { id: Number(dto.postId) },
        });
        post.likesNumber -= 1;
        await this.postsRepository.save(post);
        const like = await this.likesRepository.findOne({
            where: {
                userId: Number(dto.userId),
                postId: Number(dto.postId),
            },
        });
        await this.likesRepository.delete(like.id);
        return {};
    }

    async addLikeToComment(dto: CommentLikeDto): Promise<Empty> {
        const comment = await this.commentsRepository.findOne({
            where: { id: Number(dto.commentId) },
        });
        comment.likesNumber += 1;
        await this.commentsRepository.save(comment);
        const like = new CommentsLikesEntity();
        like.userId = Number(dto.userId);
        like.commentId = Number(dto.commentId);
        await this.commentsLikesRepository.save(like);
        return {};
    }

    async rmLikeFromComment(dto: CommentLikeDto): Promise<Empty> {
        const comment = await this.commentsRepository.findOne({
            where: { id: Number(dto.commentId) },
        });
        comment.likesNumber -= 1;
        await this.commentsRepository.save(comment);
        const like = await this.commentsLikesRepository.findOne({
            where: {
                userId: Number(dto.userId),
                commentId: Number(dto.commentId),
            },
        });
        await this.commentsLikesRepository.delete(like.id);
        return {};
    }
     
}