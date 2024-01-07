import { Observable } from "rxjs";
import { ModeAndNameDto } from "../dto/mode-and-name.dto";
import { FilePathDto } from "../dto/path.dto";
import { SaveFilesDto } from "../dto/save-files.dto";
import { UpdateFilesDto } from "../dto/update-files.dto";

export interface IFilesService {
    initialize(): Promise<void>;
    saveFiles(dto: SaveFilesDto): Promise<DirName>;
    findFilesNames(dto: ModeAndNameDto): Promise<FilesIds>;
    updFiles(dto: UpdateFilesDto): Promise<Empty>;
    delFiles(dto: ModeAndNameDto): Promise<Empty>;
    sendFile(dto: FilePathDto): Promise<BufferType>;
    sendFileStream(dto: FilePathDto): Promise<Observable<Chunk>>
}
