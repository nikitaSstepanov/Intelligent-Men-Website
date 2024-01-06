import { Injectable } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { join, resolve } from "path";
import { existsSync, mkdir, mkdirSync } from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesEntity } from "./entities/files.entity";
import { Repository } from "typeorm";
import { SaveFilesDto } from "./dto/save-files.dto";
import { ModeAndNameDto } from "./dto/mode-and-name.dto";
import { UpdateFilesDto } from "./dto/update-files.dto";
import { Observable } from "rxjs";
import { FilePathDto } from "./dto/path.dto";

@Injectable()
export class FilesService implements IFilesService {

    constructor(
        @InjectRepository(FilesEntity)
        private readonly filesRepository: Repository<FilesEntity>,
    ) {}

    async initialize(): Promise<void> {
        const initPath = resolve(__dirname, "..", "..", "files");
        if (!existsSync(initPath)) {
            mkdirSync(initPath);
            mkdirSync(join(initPath, "posts"));
            mkdirSync(join(initPath, "users"));
            mkdirSync(join(initPath, "comments"));
        } else {
            if (!existsSync(join(initPath, "posts"))) { 
                mkdirSync(join(initPath, "posts"));
            }
            if (!existsSync(join(initPath, "users"))) {
                mkdirSync(join(initPath, "users"));
            }
            if (!existsSync(join(initPath, "comments"))) {
                mkdirSync(join(initPath, "comments"));
            }
            if (!existsSync(join(initPath, "content"))) {
                mkdirSync(join(initPath, "content"));
            }
        }
    }

    async saveFiles(dto: SaveFilesDto): Promise<DirName> {
        return;
    }

    async findFilesNames(dto: ModeAndNameDto): Promise<FilesNames> {
        return;
    }

    async updFiles(dto: UpdateFilesDto): Promise<Empty> {
        return {};
    }

    async delFiles(dto: ModeAndNameDto): Promise<Empty> {
        return {};
    }

    async sendFile(dto: FilePathDto): Promise<BufferType> {
        return;
    }

    async sendFileStream(dto: FilePathDto): Promise<Observable<Chunk>> {
        return;
    }

    private async GenerateName(path: string): Promise<string> {
        return;
    }

}