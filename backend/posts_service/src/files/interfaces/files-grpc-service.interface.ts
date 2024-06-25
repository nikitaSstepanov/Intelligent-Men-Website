import { ModeAndNameDto } from "../dto/mode-and-name.dto";
import { Observable } from "rxjs";

export interface IFilesGrpcService {
    getFilesIds(dto: ModeAndNameDto): Observable<FilesIds>;
    deleteFiles(dto: ModeAndNameDto): Observable<Empty>;
}