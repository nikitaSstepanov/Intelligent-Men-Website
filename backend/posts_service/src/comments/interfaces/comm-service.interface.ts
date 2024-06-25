import { GetPostIdAndUserIdDto } from "../../posts/dto/get-post-id-and-user-id.dto";
import { GetCommentIdAndUserIdDto } from "../dto/get-comment-id-and-user-id.dto";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-post.dto";
import { GetCommentIdDto } from "../dto/get-comment-id.dto";

export interface ICommentsService {
    findAllComments(dto: GetPostIdAndUserIdDto): Promise<CommentsArray>;
    findCommentAnswers(dto: GetCommentIdAndUserIdDto): Promise<CommentsArray>;
    createComment(dto: CreateCommentDto): Promise<Empty>;
    updComment(dto: UpdateCommentDto): Promise<Empty>;
    delComment(dto: GetCommentIdDto): Promise<Empty>;
}