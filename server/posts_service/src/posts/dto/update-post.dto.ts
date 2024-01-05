export class UpdatePostDto {
    readonly id: string;
    readonly title: string;
    readonly text: string;
    readonly authorId: string;
    readonly photos: Buffer[]; 
    readonly videos: Buffer[];
    readonly delPhotos: string[];
    readonly delVideos: string[];
}