import { Injectable } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { GetPhotoPathDto } from "./dto/get-path.dto";
import { v4 } from "uuid";

@Injectable()
export class FilesService implements IFilesService {

    private startPath = resolve(__dirname, "..", "..", "content");

    async initialize(): Promise<void> {
        const initPath = resolve(__dirname, "..", "..", "content");
        if (!existsSync(initPath)) {
            mkdirSync(initPath);
            mkdirSync(join(initPath, "users"));
        } else {
            if (!existsSync(join(initPath, "users"))) {
                mkdirSync(join(initPath, "users"));
            }
        }
    }

    async getDescription(mode: string, contentDir: string): Promise<string> {
        const filePath = join(this.startPath, mode, contentDir, "text.txt");
        const description = readFileSync(filePath, { encoding: "utf8" });
        return description;
    }

    async getPhotoPath(mode: string, contentDir: string): Promise<string> {
        const path = `${mode} ${contentDir}`;
        return path;
    }

    async saveFiles(mode: string, photo: Buffer, photoMimeType: string, description: string): Promise<string> {
        const modePath = join(this.startPath, mode);
        const dirName = await this.generateName(modePath, "");
        const dirPath = join(modePath, dirName);
        if (photo) {
            const extesion = await this.getExtension(photoMimeType);
            writeFileSync(join(dirPath, `photo${extesion}`), photo);
        }
        if (description) {
            writeFileSync(join(dirPath, "text.txt"), description);
        }
        return dirName;
    }

    async updFiles(mode: string, contentDir: string, text: string, photo: Buffer, photoMimeType: string): Promise<void> {
        const dirPath = join(this.startPath, mode, contentDir);
        if (text) {
            writeFileSync(join(dirPath, "text.txt"), text);
        }
        if (photo) {
            const extesion = await this.getExtension(photoMimeType);
            writeFileSync(join(dirPath, `photo${extesion}`), photo);
        }
    }

    async delFiles(mode: string, contentDir: string): Promise<void> {
        const dirPath = join(this.startPath, mode, contentDir);
        rmSync(dirPath);
    }

    async sendPhoto(dto: GetPhotoPathDto): Promise<Photo> {
        const result: Photo = {};
        const photoPath = dto.path.split(" ");
        const modeName = photoPath[0];
        const dirName = photoPath[1];
        const checkPaths = (modeName.includes("..")) || (dirName.includes(".."));
        if (checkPaths) {
            result.error = "";
            return result;
        }
        const dirPath = join(this.startPath, modeName, dirName);
        const filesNames = readdirSync(dirPath);
        let photoFileName: string;
        if (filesNames.length != 0) {
            if (filesNames[0][0] == "p") {
                photoFileName = filesNames[0];
            } else if (filesNames.length != 1) {
                photoFileName = filesNames[1];
            }
        }
        const filePath = join(dirPath, photoFileName);
        const photo = readFileSync(filePath);
        result.photo = photo;
        return result; 
    }

    private async generateName(dirName: string, addition: string): Promise<string> {
        let name = v4() + addition;
        while (existsSync(join(dirName, name))) {
            name = v4() + addition;
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
            default:
                break;
        }
        return extesion;
    }

}