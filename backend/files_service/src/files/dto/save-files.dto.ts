import { IsNotEmpty, IsString } from "class-validator";

export class SaveFilesDto {

    @IsString({ message: "mode must be string" })
    @IsNotEmpty({ message: "mode mustn`t be empty" })
    readonly mode: string;

    readonly text: string;

    readonly files: FileType[];

}