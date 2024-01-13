import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { firstValueFrom } from "rxjs";
import { ClientGrpc } from "@nestjs/microservices";
import { ModeAndNameDto } from "./dto/mode-and-name.dto";
import { IFilesGrpcService } from "./interfaces/files-grpc-service.interface";

@Injectable()
export class FilesService implements IFilesService, OnModuleInit  {

    private filesGrpcService: IFilesGrpcService;

    constructor(
        @Inject("FILES_SERVICE")
        private readonly client: ClientGrpc,
    ) {}

    onModuleInit() {
        this.filesGrpcService =  this.client.getService<IFilesGrpcService>("FilesService");
    }

    async getFilesIds(dto: ModeAndNameDto): Promise<FilesIds> {
        return await firstValueFrom(this.filesGrpcService.getFilesIds(dto));
    }

    async deleteFiles(dto: ModeAndNameDto): Promise<Empty> {
        return await firstValueFrom(this.filesGrpcService.deleteFiles(dto));
    }

}