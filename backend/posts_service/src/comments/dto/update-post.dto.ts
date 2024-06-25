export class UpdateCommentDto {
    readonly id: string;
    readonly text: string;
    readonly photos: Buffer[];
    readonly videos: Buffer[];
    readonly delPhotos: string[];
    readonly delVideos: string[];
}