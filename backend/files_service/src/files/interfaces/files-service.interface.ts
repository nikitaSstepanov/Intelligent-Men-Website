import { ModeAndNameDto } from "../dto/mode-and-name.dto";
import { SaveFilesDto } from "../dto/save-files.dto";
import { UpdateFilesDto } from "../dto/update-files.dto";
import { FileIdDto } from "../dto/file-id.dto";
import { Observable } from "rxjs";

export interface IFilesService {
    initialize(): Promise<void>;
    findFilesIds(dto: ModeAndNameDto): Promise<FilesIds>;
    saveFiles(dto: SaveFilesDto): Promise<DirName>;
    updFiles(dto: UpdateFilesDto): Promise<Empty>;
    delFiles(dto: ModeAndNameDto): Promise<Empty>;
    sendFile(dto: FileIdDto): Promise<BufferType>;
    sendFileStream(dto: FileIdDto): Promise<Observable<Chunk>>;
}
