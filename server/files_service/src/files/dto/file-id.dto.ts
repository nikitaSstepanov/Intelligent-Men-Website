import { IsNumberString, IsString } from "class-validator";

export class FileIdDto {

    @IsString({ message: "id must be a string" })
    @IsNumberString({}, { message: "incorrect id" })
    readonly id: string;

}