import { GetPhotoPathDto } from "../dto/get-path.dto";

export interface IFilesController {
    sendPhoto(dto: GetPhotoPathDto): Promise<Photo>;
}