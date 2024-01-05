export class CreatePostDto {
    readonly title: string;
    readonly text: string;
    readonly authorId: string;
    readonly photos: Buffer[]; 
    readonly videos: Buffer[];
}
