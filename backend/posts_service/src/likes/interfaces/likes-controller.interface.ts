import { PostLikeDto } from "../dto/post-like.dto";
import { CommentLikeDto } from "../dto/comment-like.dto";

export interface ILikesCOntroller {
    addLikeToPost(dto: PostLikeDto): Promise<Empty>;
    removeLikeFromPost(dto: PostLikeDto): Promise<Empty>;
    addLikeToComment(dto: CommentLikeDto): Promise<Empty>;
    removeLikeFromComment(dto: CommentLikeDto): Promise<Empty>;
}