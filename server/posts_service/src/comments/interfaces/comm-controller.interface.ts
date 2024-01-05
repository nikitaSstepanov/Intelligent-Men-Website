import { GetPostIdAndUserIdDto } from "../../posts/dto/get-post-id-and-user-id.dto";
import { GetCommentIdAndUserIdDto } from "../dto/get-comment-id-and-user-id.dto";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-post.dto";
import { GetCommentIdDto } from "../dto/get-comment-id.dto";

export interface ICommentsController {
    getAllComments(dto: GetPostIdAndUserIdDto): Promise<CommentsArray>;
    getCommentAnswers(dto: GetCommentIdAndUserIdDto): Promise<CommentsArray>;
    createComment(dto: CreateCommentDto): Promise<Empty>;
    updateComment(dto: UpdateCommentDto): Promise<Empty>;
    deleteComment(dto: GetCommentIdDto): Promise<Empty>;
}