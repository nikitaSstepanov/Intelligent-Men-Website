import { GetUserIdDto } from "../dto/get-user-id.dto";
import { GetTagAndUserIdDto } from "../dto/get-tag-and-user-id.dto";
import { GetPostIdAndUserIdDto } from "../dto/get-post-id-and-user-id.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { GetPostIdDto } from "../dto/get-post-id.dto";

export interface IPostsController {
    getAllPosts(dto: GetUserIdDto): Promise<PostsArray>;
    getAllPostsByTag(dto: GetTagAndUserIdDto): Promise<PostsArray>;
    getOnePost(dto: GetPostIdAndUserIdDto): Promise<Post | Empty>;
    createPost(dto: CreatePostDto): Promise<Empty>;
    updatePost(dto: UpdatePostDto): Promise<Empty>;
    deletePost(dto: GetPostIdDto): Promise<Empty>;
}