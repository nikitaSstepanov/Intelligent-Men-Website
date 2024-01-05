import { Injectable } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { join, resolve } from "path";
import { existsSync, mkdir, mkdirSync } from "fs";

@Injectable()
export class FilesService implements IFilesService {

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
        }
    }

}