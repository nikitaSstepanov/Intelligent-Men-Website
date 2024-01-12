export class CreateCommentDto {
    readonly postId: string;
    readonly authorId: string;
    readonly isAnswerFor: string;
    readonly contentDir: string;
}