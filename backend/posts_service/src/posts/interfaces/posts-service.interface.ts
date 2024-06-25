import { GetUserIdDto } from "../dto/get-user-id.dto";
import { GetTagAndUserIdDto } from "../dto/get-tag-and-user-id.dto";
import { GetPostIdAndUserIdDto } from "../dto/get-post-id-and-user-id.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { GetPostIdDto } from "../dto/get-post-id.dto";

export interface IPostsService {
    findAllPosts(dto: GetUserIdDto): Promise<PostsArray>;
    findAllPostsByTag(dto: GetTagAndUserIdDto): Promise<PostsArray>;
    findOnePost(dto: GetPostIdAndUserIdDto): Promise<Post | Empty>;
    createPost(dto: CreatePostDto): Promise<Empty>;
    updPost(dto: UpdatePostDto): Promise<Empty>;
    delPost(dto: GetPostIdDto): Promise<Empty>;
}