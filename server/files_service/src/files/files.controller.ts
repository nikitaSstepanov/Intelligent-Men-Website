import { Controller } from "@nestjs/common";
import { IFilesController } from "./interfaces/files-controller.interface";
import { FilesService } from "./files.service";
import { GrpcMethod } from "@nestjs/microservices";

@Controller()
export class FilesController implements IFilesController {

    constructor(private readonly filesService: FilesService) {}

    @GrpcMethod("FilesService", "SavePostFiles")
    async savePostFiles(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "SaveUserFiles")
    async saveUserFiles(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "SaveCommentFiles")
    async saveCommentsFiles(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "GetFilesNames")
    async getFilesNames(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "UpdateDirectory")
    async updateDirectory(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "DeleteFiles")
    async deleteFiles(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "SendFile")
    async sendFile(dto: any): Promise<any> {}

    @GrpcMethod("FilesService", "SendFileStream")
    async sendFileStream(dto: any): Promise<any> {}

}