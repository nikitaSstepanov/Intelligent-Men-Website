export class CreateCommentDto {
    readonly postId: string;
    readonly authorId: string;
    readonly text: string;
    readonly isAnswerFor: string;
    readonly photos: Buffer[];
    readonly videos: Buffer[];
}