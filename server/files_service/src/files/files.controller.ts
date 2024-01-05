import { Controller } from "@nestjs/common";
import { IFilesController } from "./interfaces/files-controller.interface";

@Controller()
export class FilesController implements IFilesController {}