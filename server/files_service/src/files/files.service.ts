import { Injectable } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { join, resolve } from "path";
import { existsSync, mkdir, mkdirSync, writeFileSync } from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesEntity } from "./entities/files.entity";
import { Repository } from "typeorm";
import { SaveFilesDto } from "./dto/save-files.dto";
import { ModeAndNameDto } from "./dto/mode-and-name.dto";
import { UpdateFilesDto } from "./dto/update-files.dto";
import { Observable } from "rxjs";
import { FilePathDto } from "./dto/path.dto";
import { v4 } from "uuid";

@Injectable()
export class FilesService implements IFilesService {

    constructor(
        @InjectRepository(FilesEntity)
        private readonly filesRepository: Repository<FilesEntity>,
    ) {}

    private startPath = resolve(__dirname, "..", "..", "files");

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
        const modePath = join(this.startPath, dto.mode);
        const dirName = await this.generateName(modePath, "");
        const dirPath = join(modePath, dirName);
        mkdirSync(dirPath);
        if (dto.text) {
            writeFileSync(join(dirPath, "text.txt"), dto.text);
        }
        if (dto.files) {
            mkdirSync(join(dirPath, "files"));
            for (const file of dto.files) {
                const extension = await this.getExtension(file.mimeType);
                let fileType: string;
                if (extension == ".mp4") {
                    fileType = "v";
                } else {
                    fileType = "p";
                }
                const fileName = await this.generateName(join(dirPath, "files"), extension);
                writeFileSync(join(dirPath, "files", fileName), file.file);
                const newFile = new FilesEntity();
                newFile.mode = dto.mode;
                newFile.fileDir = dirName;
                newFile.fileName = fileName;
                newFile.fileType = fileType;
                await this.filesRepository.save(newFile);
            }
        }
        return { name: dirName };
    } 

    async findFilesNames(dto: ModeAndNameDto): Promise<FilesNames> {
        const files = await this.filesRepository.find({
            where: {
                mode: dto.mode,
                fileDir: dto.filesDir,
            },
        });
        const result = { names: [] };
        for (const file of files) {
            result.names.push(`${dto.mode} ${dto.filesDir} ${file.fileType} ${file.fileName}`);
        }
        return result;
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

    private async generateName(path: string, extension: string): Promise<string> {
        let name = v4() + extension;
        while (existsSync(join(path, name))) {
            name = v4() + extension;
        }
        return name;
    }

    private async getExtension(mimeType: string): Promise<string> {
        let extesion: string;
        switch (mimeType) {
            case "image/jpeg":
                extesion = ".jpeg";
                break;
            case "image/png":
                extesion = ".png";
                break;
            case "image/heic":
                extesion = ".heic";
                break;
            case "video/mp4":
                extesion = ".mp4";
                break;
            default:
                break;
        }
        return extesion;
    }

}