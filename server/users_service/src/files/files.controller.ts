import { Controller } from "@nestjs/common";
import { IFilesController } from "./interfaces/files-controller.interface";
import { GrpcMethod } from "@nestjs/microservices";
import { FilesService } from "./files.service";
import { GetPhotoPathDto } from "./dto/get-path.dto";

@Controller()
export class FilesController implements IFilesController {

    constructor(private readonly filesService: FilesService) {}

    @GrpcMethod("UsersService", "SendPhoto")
    async sendPhoto(dto: GetPhotoPathDto): Promise<Photo> {
        return await this.filesService.sendPhoto(dto);
    }

}