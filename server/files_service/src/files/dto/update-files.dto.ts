import { IsString, IsNotEmpty } from "class-validator";

export class UpdateFilesDto {

    @IsString({ message: "mode must be string" })
    @IsNotEmpty({ message: "mode mustn`t be empty" })
    readonly mode: string;

    @IsString({ message: "directory name must be string" })
    @IsNotEmpty({ message: "directory name mustn`t be empty" })
    readonly directory: string;

    readonly text: string;

    readonly newFiles: FileType[];

    readonly filesToDel: string[];
    
}