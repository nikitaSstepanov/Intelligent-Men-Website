import { Observable } from "rxjs";
import { ModeAndNameDto } from "../dto/mode-and-name.dto";
import { FilePathDto } from "../dto/path.dto";
import { SaveFilesDto } from "../dto/save-files.dto";
import { UpdateFilesDto } from "../dto/update-files.dto";

export interface IFilesController {
    saveFiles(dto: SaveFilesDto): Promise<DirName>;
    getFilesNames(dto: ModeAndNameDto): Promise<FilesNames>;
    updateDirectory(dto: UpdateFilesDto): Promise<Empty>;
    deleteFiles(dto: ModeAndNameDto): Promise<Empty>;
    sendFile(dto: FilePathDto): Promise<BufferType>;
    sendFileStream(dto: FilePathDto): Promise<Observable<Chunk>>;
}