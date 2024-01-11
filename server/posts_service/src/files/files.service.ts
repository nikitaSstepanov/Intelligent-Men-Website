import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, createReadStream } from "fs";
import { resolve, join } from "path";
import { v4 } from "uuid";
import { Observable, Subject, firstValueFrom } from "rxjs";
import { GetPathDto } from "./dto/get-path.dto";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class FilesService implements OnModuleInit  {

    private filesGrpcService;

    constructor(
        @Inject("FILES_SERVICE")
        private readonly client: ClientGrpc,
    ) {}

    onModuleInit() {
        this.filesGrpcService =  this.client.getService("FilesService");
    }

    async getFilesIds(dto): Promise<any> {
        return await firstValueFrom(this.filesGrpcService.getFilesIds(dto));
    }

    async deleteFiles(dto): Promise<Empty> {
        return await firstValueFrom(this.filesGrpcService.deleteFiles(dto));
    }

}