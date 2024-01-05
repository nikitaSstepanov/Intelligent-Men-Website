import { Injectable } from "@nestjs/common";
import { ICommentsService } from "./interfaces/comm-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentsEntity } from "./entities/comments.entity";
import { PostsEntity } from "../posts/entities/posts.entity";
import { CommentsLikesEntity } from "../likes/entities/comments-likes.entity";
import { FilesService } from "../files/files.service";
import { GetPostIdAndUserIdDto } from "src/posts/dto/get-post-id-and-user-id.dto";
import { GetCommentIdAndUserIdDto } from "./dto/get-comment-id-and-user-id.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-post.dto";
import { GetCommentIdDto } from "./dto/get-comment-id.dto";

@Injectable()
export class CommentsService implements ICommentsService {

    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentsRepository: Repository<CommentsEntity>,
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
        @InjectRepository(CommentsLikesEntity)
        private readonly commentsLikesRepository: Repository<CommentsLikesEntity>,
        private readonly filesService: FilesService,
    ) {}

    async findAllComments(dto: GetPostIdAndUserIdDto): Promise<CommentsArray> {
        const post = await this.postsRepository.findOne({  
            where: { id: Number(dto.postId) },
            relations: { comments: true },
        });
        const comments = post.comments;
        const result = { comments: [] };
        for (const comment of comments) {
            if (comment.isAnswerFor) {
                continue;
            }
            const readyComment = await this.prepareComment(comment, Number(dto.userId));
            result.comments.push(readyComment);
        }
        return result;
    }

    async findCommentAnswers(dto: GetCommentIdAndUserIdDto): Promise<CommentsArray> {
        const answers = await this.commentsRepository.find({
            where: { isAnswerFor: Number(dto.commentId) },
        });
        const result = { comments: [] };
        for (const comment of answers) {
            const readyComment = await this.prepareComment(comment, Number(dto.userId));
            result.comments.push(readyComment);
        }
        return result;
    }

    async createComment(dto: CreateCommentDto): Promise<Empty> {
        const comment = new CommentsEntity();
        comment.authorId = Number(dto.authorId);
        comment.contentDir = await this.filesService.saveFiles("comments", dto.text, dto.photos, dto.videos);
        if (dto.isAnswerFor) {
            const recipient = await this.commentsRepository.findOne({
                where: { id: Number(dto.isAnswerFor) },
            });
            recipient.answersNumber += 1;
            await this.commentsRepository.save(recipient);
            comment.isAnswerFor = Number(dto.isAnswerFor);
        }
        const post = await this.postsRepository.findOne({
            where: { id: Number(dto.postId) },
        });
        comment.post = post;
        await this.commentsRepository.save(comment);
        return {};
    }

    async updComment(dto: UpdateCommentDto): Promise<Empty> {
        const comment = await this.commentsRepository.findOne({
            where: { id: Number(dto.id) },
        });
        const contentDir = comment.contentDir;
        if (dto.delPhotos) {
            await this.filesService.delFilesSeparatly(dto.delPhotos, "mode", contentDir, "photos");
        }
        if (dto.delVideos) {
            await this.filesService.delFilesSeparatly(dto.delVideos, "mode", contentDir, "videos");
        }
        await this.filesService.updFiles( "comments", contentDir, dto.text, dto.photos, dto.videos);
        return {};
    }

    async delComment(dto: GetCommentIdDto): Promise<Empty> {
        const comment = await this.commentsRepository.findOne({
            where: { id: Number(dto.commentId) },
        });
        if (comment.isAnswerFor) {
            const recipient = await this.commentsRepository.findOne({
                where: { id: comment.isAnswerFor },
            });
            recipient.answersNumber -= 1;
            await this.commentsRepository.save(recipient);
        }
        if (comment.answersNumber != 0) {
            await this.commentsRepository.delete({ isAnswerFor: comment.id });
        }
        await this.filesService.delFiles("comments", comment.contentDir);
        await this.commentsLikesRepository.delete({ commentId: comment.id });
        await this.commentsRepository.delete(comment.id);
        return {};
    }

    private async prepareComment(comment: CommentsEntity, userId: number): Promise<CommentType> {
        const like = await this.commentsLikesRepository.findOne({
            where: {
                userId,
                commentId: comment.id, 
            },
        });
        let isLiked = false;
        if (like) {
            isLiked = true;
        }
        const commentFiles = await this.filesService.getFiles("comments", comment.contentDir);
        const readyComment: CommentType = {
            id: String(comment.id),
            authorId: String(comment.authorId),
            likesNumber: String(comment.likesNumber),
            isLiked,
        }
        if (comment.answersNumber != 0) {
            readyComment.answersNumber = String(comment.answersNumber);
        }
        if (commentFiles.text) {
            readyComment.text = commentFiles.text;
        }
        if (commentFiles.photos) {
            readyComment.photos = commentFiles.photos;
        }
        if (commentFiles.videos) {
            readyComment.videos = commentFiles.videos;
        }
        return readyComment;
    }

}