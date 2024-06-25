export class CreatePostDto {
    readonly title: string;
    readonly text: string;
    readonly authorId: string;
    readonly contentDir: string;
}