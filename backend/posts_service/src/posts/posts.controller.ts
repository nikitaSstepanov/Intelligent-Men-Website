import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { IPostsController } from "./interfaces/posts-controller.interface";
import { PostsService } from "./posts.service";
import { GetUserIdDto } from "./dto/get-user-id.dto";
import { GetTagAndUserIdDto } from "./dto/get-tag-and-user-id.dto";
import { GetPostIdAndUserIdDto } from "./dto/get-post-id-and-user-id.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { GetPostIdDto } from "./dto/get-post-id.dto";

@Controller()
export class PostsController implements IPostsController {

    constructor(private readonly postsService: PostsService) {}

    @GrpcMethod("PostsService", "FindAllPosts")
    async getAllPosts(dto: GetUserIdDto): Promise<PostsArray> {
        return await this.postsService.findAllPosts(dto);
    }

    @GrpcMethod("PostsService", "FindAllPostsByTag")
    async getAllPostsByTag(dto: GetTagAndUserIdDto): Promise<PostsArray> {
        return await this.postsService.findAllPostsByTag(dto);
    }

    @GrpcMethod("PostsService", "FindOnePost")
    async getOnePost(dto: GetPostIdAndUserIdDto): Promise<Post | Empty> {
        return await this.postsService.findOnePost(dto);
    }

    @GrpcMethod("PostsService", "CreatePost") 
    async createPost(dto: CreatePostDto): Promise<Empty> {
        return await this.postsService.createPost(dto);
    }

    @GrpcMethod("PostsService", "UpdatePost")
    async updatePost(dto: UpdatePostDto): Promise<DirectoryName> {
        return await this.postsService.updPost(dto);
    }

    @GrpcMethod("PostsService", "DeletePost")
    async deletePost(dto: GetPostIdDto): Promise<Empty> {
        return await this.postsService.delPost(dto);
    }

}