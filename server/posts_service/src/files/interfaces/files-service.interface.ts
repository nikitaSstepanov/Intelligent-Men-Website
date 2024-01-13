import { ModeAndNameDto } from "../dto/mode-and-name.dto";

export interface IFilesService {
    getFilesIds(dto: ModeAndNameDto): Promise<FilesIds>;
    deleteFiles(dto: ModeAndNameDto): Promise<Empty>;
}