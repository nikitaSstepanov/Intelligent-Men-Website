import { Observable } from "rxjs";
import { GetPathDto } from "../dto/get-path.dto";

export interface IFilesController {
    sendPhoto(dto: GetPathDto): Promise<Photo | Empty>;
    sendVideo(dto: GetPathDto): Promise<Observable<Video> | Empty>;
}