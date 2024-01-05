import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { IFilesController } from "./interfaces/files-controllers.interface";
import { FilesService } from "./files.service";
import { Observable } from "rxjs";
import { GetPathDto } from "./dto/get-path.dto";

@Controller()
export class FilesController implements IFilesController {

    constructor(private readonly filesService: FilesService) {}

    @GrpcMethod("PostsService", "SendPhoto")
    async sendPhoto(dto: GetPathDto): Promise<Photo | Empty> {
        return await this.filesService.sendPhoto(dto);
    }

    @GrpcMethod("PostsService", "SendVideo")
    async sendVideo(dto: GetPathDto): Promise<Observable<Video> | Empty> {
        return await this.filesService.sendVideo(dto);
    }

}