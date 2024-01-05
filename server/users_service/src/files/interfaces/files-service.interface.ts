import { GetPhotoPathDto } from "../dto/get-path.dto";

export interface IFilesService {
    initialize(): Promise<void>;
    getDescription(mode: string, contentDir: string): Promise<string>;
    getPhotoPath(mode: string, contentDir: string): Promise<string>;
    saveFiles(mode: string, photo: Buffer, photoMimeType: string, description: string): Promise<string>;
    updFiles(mode: string, contentDir: string, text: string, photo: Buffer, photoMimeType: string): Promise<void>;
    delFiles(mode: string, contentDir: string): Promise<void>;
    sendPhoto(dto: GetPhotoPathDto): Promise<Photo>;
}