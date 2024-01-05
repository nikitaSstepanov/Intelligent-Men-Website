import { Observable } from "rxjs";
import { GetPathDto } from "../dto/get-path.dto";

export interface IFilesService {
    initialize(): Promise<void>;
    getFiles(mode: string, dirName: string): Promise<ItemFiles>;
    saveFiles(mode: string, text: string, photos: Buffer[], videos: Buffer[]): Promise<string>;
    updFiles(mode: string, dirName: string, text: string, photos: Buffer[], videos: Buffer[]): Promise<void>;
    delFiles(mode: string, dirName: string): Promise<void>;
    delFilesSeparatly(delFiles: string[], mode: string, dirName: string, fileType: string): Promise<void>;
    sendPhoto(dto: GetPathDto): Promise<Photo | Empty>;
    sendVideo(dto: GetPathDto): Promise<Observable<Video> | Empty>;
    findTagsInText(text: string): Promise<string[]>;
}