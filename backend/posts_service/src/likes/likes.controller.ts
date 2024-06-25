import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { ILikesCOntroller } from "./interfaces/likes-controller.interface";
import { LikesService } from "./likes.service";
import { PostLikeDto } from "./dto/post-like.dto";
import { CommentLikeDto } from "./dto/comment-like.dto";

@Controller()
export class LikesController implements ILikesCOntroller {

    constructor(private readonly likesService: LikesService) {}

    @GrpcMethod("PostsService", "AddLikeToPost")
    async addLikeToPost(dto: PostLikeDto): Promise<Empty> {
        return await this.likesService.addLikeToPost(dto);
    }

    @GrpcMethod("PostsService", "RemoveLikeFromPost")
    async removeLikeFromPost(dto: PostLikeDto): Promise<Empty> {
        return await this.likesService.rmLikeFromPost(dto);
    }

    @GrpcMethod("PostsService", "AddLikeToComment")
    async addLikeToComment(dto: CommentLikeDto): Promise<Empty> {
        return await this.likesService.addLikeToComment(dto);
    }

    @GrpcMethod("PostsService", "RemoveLikeFromComment")
    async removeLikeFromComment(dto: CommentLikeDto): Promise<Empty> {
        return await this.likesService.rmLikeFromComment(dto);
    }

}