import { Controller } from "@nestjs/common";
import { IFilesController } from "./interfaces/files-controller.interface";
import { FilesService } from "./files.service";
import { GrpcMethod } from "@nestjs/microservices";
import { SaveFilesDto } from "./dto/save-files.dto";
import { ModeAndNameDto } from "./dto/mode-and-name.dto";
import { UpdateFilesDto } from "./dto/update-files.dto";
import { Observable } from "rxjs";
import { FilePathDto } from "./dto/path.dto";

@Controller()
export class FilesController implements IFilesController {

    constructor(private readonly filesService: FilesService) {}

    @GrpcMethod("FilesService", "SaveFiles")
    async saveFiles(dto: SaveFilesDto): Promise<DirName> {
        return await this.filesService.saveFiles(dto);
    }

    @GrpcMethod("FilesService", "GetFilesNames")
    async getFilesNames(dto: ModeAndNameDto): Promise<FilesIds> {
        return await this.filesService.findFilesNames(dto);
    }

    @GrpcMethod("FilesService", "UpdateDirectory")
    async updateDirectory(dto: UpdateFilesDto): Promise<Empty> {
        return await this.filesService.updFiles(dto);
    }

    @GrpcMethod("FilesService", "DeleteFiles")
    async deleteFiles(dto: ModeAndNameDto): Promise<Empty> {
        return await this.filesService.delFiles(dto);
    }

    @GrpcMethod("FilesService", "SendFile")
    async sendFile(dto: FilePathDto): Promise<BufferType> {
        return await this.filesService.sendFile(dto);
    }

    @GrpcMethod("FilesService", "SendFileStream")
    async sendFileStream(dto: FilePathDto): Promise<Observable<Chunk>> {
        return await this.filesService.sendFileStream(dto);
    }

}