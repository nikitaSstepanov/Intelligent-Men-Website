import { Injectable } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, createReadStream } from "fs";
import { resolve, join } from "path";
import { v4 } from "uuid";
import { Observable, Subject } from "rxjs";
import { GetPathDto } from "./dto/get-path.dto";

@Injectable()
export class FilesService implements IFilesService {

    private startPath = resolve(__dirname, "..", "..", "content");
    
    async initialize(): Promise<void> {
        const initPath = resolve(__dirname, "..", "..", "content");
        if (!existsSync(initPath)) {
            mkdirSync(initPath);
            mkdirSync(join(initPath, "posts"));
            mkdirSync(join(initPath, "comments"));
        } else {
            if (!existsSync(join(initPath, "posts"))) { 
                mkdirSync(join(initPath, "posts"));
            }
            if (!existsSync(join(initPath, "comments"))) {
                mkdirSync(join(initPath, "comments"));
            }
        }
    }
    
    async getFiles(mode: string, dirName: string): Promise<ItemFiles> {
        const dirPath = join(this.startPath, mode, dirName);
        const result: ItemFiles = {};
        const text = readFileSync(join(dirPath, "text.txt"), { encoding: "utf8" });
        result.text = text;
        const photos = readdirSync(join(dirPath, "photos"));
        if ((photos) && (photos.length != 0)) {
            result.photos = [];
            for (const photo of photos) {
                const photoPath = `${mode} ${dirName} ${photo}`;
                result.photos.push(photoPath);
            }
        }
        const videos = readdirSync(join(dirPath, "videos"));
        if ((videos) && (videos.length != 0)) {
            result.videos = [];
            for (const video of videos) {
                const videoPath = `${mode} ${dirName} ${video}`;
                result.videos.push(videoPath);
            }
        }
        return result;
    }

    async saveFiles(mode: string, text: string, photos: Buffer[], videos: Buffer[]): Promise<string> {
        const modePath = join(this.startPath, mode);
        const contentDir = await this.generateName(modePath, "");
        const dirPath = join(modePath, contentDir);
        mkdirSync(dirPath);
        mkdirSync(join(dirPath, "photos"));
        mkdirSync(join(dirPath, "videos"));
        if (!text) {
            text = "";
        }
        writeFileSync(join(dirPath, "text.txt"), text);
        if (photos) {
            for (const photo of photos) {
                const photoFileName = await this.generateName(join(dirPath, "photos"), ".jpeg");
                writeFileSync(join(dirPath, "photos", photoFileName), photo);
            }
        }
        if (videos) {
            for (const video of videos) {
                const videoFileName = await this.generateName(join(dirPath, "videos"), ".mp4");
                writeFileSync(join(dirPath, "videos", videoFileName), video);
            }
        }
        return contentDir;
    }

    async updFiles(mode: string, dirName: string, text: string, photos: Buffer[], videos: Buffer[]): Promise<void> {
        const dirPath = join(this.startPath, mode, dirName);
        if (text) {
            writeFileSync(join(dirPath, "text.txt"), text);
        }
        if (photos) {
            for (const photo of photos) {
                const photoFileName = await this.generateName(join(dirPath, "photos"), ".jpeg")
                writeFileSync(join(dirPath, "photos", photoFileName), photo);
            }
        }
        if (videos) {
            for (const video of videos) {
                const videoFileName = await this.generateName(join(dirPath, "videos"), ".mp4");
                writeFileSync(join(dirPath, "videos", videoFileName), video);
            }
        }
    }

    async delFiles(mode: string, dirName: string): Promise<void> {
        const dirPath = join(this.startPath, mode, dirName);
        rmSync(dirPath, { recursive: true });
    }

    async delFilesSeparatly(delFiles: string[], mode: string, dirName: string, fileType: string): Promise<void> {
        const dirPath = join(this.startPath, mode, dirName, fileType);
        for (const file of delFiles) {
            rmSync(join(dirPath, file));
        }
    }

    async sendPhoto(dto: GetPathDto): Promise<Photo | Empty> {
        const photoPath = dto.path;
        const modeName = photoPath.split(" ")[0];
        const dirName = photoPath.split(" ")[1];
        const fileName = photoPath.split(" ")[2];
        const checkPaths = (modeName.includes("..")) || (dirName.includes("..")) || (fileName.includes(".."));
        if (checkPaths) {
            return {};
        }
        const filePath = join(this.startPath, modeName, dirName, "photos", fileName);
        const photo = readFileSync(filePath);
        const result = { photo };
        return result;
    }

    async sendVideo(dto: GetPathDto): Promise<Observable<Video> | Empty> {
        const videoPath = dto.path;
        const modeName = videoPath.split(" ")[0];
        const dirName = videoPath.split(" ")[1];
        const fileName = videoPath.split(" ")[2];
        const checkPaths = (modeName.includes("..")) || (dirName.includes("..")) || (fileName.includes(".."));
        if (checkPaths) {
            return {};
        }
        const filePath = join(this.startPath, modeName, dirName, "videos", fileName);
        const subject = new Subject<Video>();
        const stream = createReadStream(filePath);
        stream.on("data", (chunk: Buffer) => subject.next({ chunk }));
        stream.on("end", () => subject.complete());
        return subject.asObservable();
    }

    async findTagsInText(text: string): Promise<string[]> {
        const tags: string[] = [];
        let isTag = false;
        let tag = "";
        for (const symbol of text) {
            if (symbol === "#") {
                isTag = true;
            } else if (isTag === false) {
                continue;
            } else if (symbol != " ") {
                tag += symbol;
            } else if (symbol === " ") {
                tags.push(tag);
                isTag = false;
                tag = "";
            }
        }
        if (tag != "") {
            tags.push(tag);
        }
        return tags;
    }

    private async generateName(dirName: string, addition: string): Promise<string> {
        let name = v4() + addition;
        while (existsSync(join(dirName, name))) {
            name = v4() + addition;
        }
        return name;
    }

}