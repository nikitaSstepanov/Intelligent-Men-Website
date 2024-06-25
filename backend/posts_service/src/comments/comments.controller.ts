import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { ICommentsController } from "./interfaces/comm-controller.interface";
import { CommentsService } from "./comments.service";
import { GetPostIdAndUserIdDto } from "../posts/dto/get-post-id-and-user-id.dto";
import { GetCommentIdAndUserIdDto } from "./dto/get-comment-id-and-user-id.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-post.dto";
import { GetCommentIdDto } from "./dto/get-comment-id.dto";

@Controller()
export class CommentsController implements ICommentsController {

    constructor(private readonly commentsService: CommentsService) {}

    @GrpcMethod("PostsService", "SendComments")
    async getAllComments(dto: GetPostIdAndUserIdDto): Promise<CommentsArray> {
        return await this.commentsService.findAllComments(dto);
    }

    @GrpcMethod("PostsService", "SendCommentAnswers")
    async getCommentAnswers(dto: GetCommentIdAndUserIdDto): Promise<CommentsArray> {
        return await this.commentsService.findCommentAnswers(dto);
    }

    @GrpcMethod("PostsService", "CreateComment")
    async createComment(dto: CreateCommentDto): Promise<Empty> {
        return await this.commentsService.createComment(dto);
    }

    @GrpcMethod("PostsService", "UpdateComment")
    async updateComment(dto: UpdateCommentDto): Promise<Empty> {
        return await this.commentsService.updComment(dto);
    }

    @GrpcMethod("PostsService", "DeleteComment")
    async deleteComment(dto: GetCommentIdDto): Promise<Empty> {
        return await this.commentsService.delComment(dto);
    }

}