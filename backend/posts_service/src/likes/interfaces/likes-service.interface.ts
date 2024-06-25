import { PostLikeDto } from "../dto/post-like.dto";
import { CommentLikeDto } from "../dto/comment-like.dto";

export interface ILikesService {
    addLikeToPost(dto: PostLikeDto): Promise<Empty>;
    rmLikeFromPost(dto: PostLikeDto): Promise<Empty>;
    addLikeToComment(dto: CommentLikeDto): Promise<Empty>;
    rmLikeFromComment(dto: CommentLikeDto): Promise<Empty>;
}