import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { IFilesController } from "./interfaces/files-controller.interface";
import { FilesService } from "./files.service";
import { ModeAndNameDto } from "./dto/mode-and-name.dto";
import { SaveFilesDto } from "./dto/save-files.dto";
import { UpdateFilesDto } from "./dto/update-files.dto";
import { FileIdDto } from "./dto/file-id.dto";
import { Observable } from "rxjs";

@Controller()
export class FilesController implements IFilesController {

    constructor(private readonly filesService: FilesService) {}

    @GrpcMethod("FilesService", "GetFilesIds")
    async getFilesIds(dto: ModeAndNameDto): Promise<FilesIds> {
        return await this.filesService.findFilesIds(dto);
    }
    
    @GrpcMethod("FilesService", "SaveFiles")
    async saveFiles(dto: SaveFilesDto): Promise<DirName> {
        return await this.filesService.saveFiles(dto);
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
    async sendFile(dto: FileIdDto): Promise<BufferType> {
        return await this.filesService.sendFile(dto);
    }

    @GrpcMethod("FilesService", "SendFileStream")
    async sendFileStream(dto: FileIdDto): Promise<Observable<Chunk>> {
        return await this.filesService.sendFileStream(dto);
    }

}