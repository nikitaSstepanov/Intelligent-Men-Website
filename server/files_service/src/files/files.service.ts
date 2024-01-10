import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilesEntity } from "./entities/files.entity";
import { IFilesService } from "./interfaces/files-service.interface";
import { createReadStream, existsSync, mkdir, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { ModeAndNameDto } from "./dto/mode-and-name.dto";
import { SaveFilesDto } from "./dto/save-files.dto";
import { UpdateFilesDto } from "./dto/update-files.dto";
import { FileIdDto } from "./dto/file-id.dto";
import { Observable, Subject } from "rxjs";
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
            mkdirSync(join(initPath, "content"));
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

    async findFilesIds(dto: ModeAndNameDto): Promise<FilesIds> {
        const files = await this.filesRepository.find({
            where: {
                mode: dto.mode,
                fileDir: dto.filesDir,
            },
        });
        const result = { ids: [] };
        for (const file of files) {
            result.ids.push(String(file.id));
        }
        return result;
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
                await this.saveFile(file, dto.mode, dirPath, dirName);
            }
        }
        return { name: dirName };
    } 

    async updFiles(dto: UpdateFilesDto): Promise<Empty> {
        const checkPaths = (dto.mode.includes("..")) || (dto.directory.includes(".."));
        if (checkPaths) {
            return {};
        }
        const dirPath = join(this.startPath, dto.mode, dto.directory);
        if (dto.text) {
            writeFileSync(join(dirPath, "text.txt"), dto.text);
        }
        if (dto.newFiles) {
            if (!existsSync(join(dirPath, "files"))) {
                mkdirSync(join(dirPath, "files"));
            }
            for (const file of dto.newFiles) {
                await this.saveFile(file, dto.mode, dirPath, dto.directory);
            }
        }
        if (dto.filesToDel) {
            for (const fileId of dto.filesToDel) {
                const fileToDelete = await this.filesRepository.findOne({
                    where: { id: Number(fileId) },
                });
                rmSync(join(dirPath, "files", fileToDelete.fileName));
                await this.filesRepository.delete(fileToDelete.id);
            }
        }
        return {};
    }

    async delFiles(dto: ModeAndNameDto): Promise<Empty> {
        const checkPaths = (dto.mode.includes("..")) || (dto.filesDir.includes(".."));
        if (checkPaths) {
            return {};
        }
        const dirPath = join(this.startPath, dto.mode, dto.filesDir);
        rmSync(dirPath, { recursive: true });
        const filesToDel = await this.filesRepository.find({
            where: {
                mode: dto.mode,
                fileDir: dto.filesDir,
            },
        });
        for (const file of filesToDel) {
            await this.filesRepository.delete(file.id);
        }
        return {};
    }

    async sendFile(dto: FileIdDto): Promise<BufferType> {
        const file = await this.filesRepository.findOne({
            where: { id: Number(dto.id) },
        });
        const pathToFile = join(this.startPath, file.mode, file.fileDir, "files", file.fileName);
        const fileBuffer = readFileSync(pathToFile);
        const result = { file: fileBuffer };
        return result;
    }

    async sendFileStream(dto: FileIdDto): Promise<Observable<Chunk>> {
        const file = await this.filesRepository.findOne({
            where: { id: Number(dto.id) },
        });
        const pathToFile = join(this.startPath, file.mode, file.fileDir, "files", file.fileName);
        const subject = new Subject<Chunk>();
        const stream = createReadStream(pathToFile);
        stream.on("data", (chunk: Buffer) => subject.next({ chunk }));
        stream.on("end", () => subject.complete());
        return subject.asObservable();
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

    private async saveFile(file: FileType, mode: string, dirPath: string, dirName: string): Promise<void> {
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
        newFile.mode = mode;
        newFile.fileDir = dirName;
        newFile.fileName = fileName;
        newFile.fileType = fileType;
        await this.filesRepository.save(newFile);
    }

}