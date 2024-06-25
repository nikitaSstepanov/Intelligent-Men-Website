import { IsNotEmpty, IsString } from "class-validator";

export class ModeAndNameDto {

    @IsString({ message: "mode must be string" })
    @IsNotEmpty({ message: "mode mustn`t be empty" })
    readonly mode: string;

    @IsString({ message: "mode must be string" })
    @IsNotEmpty({ message: "mode mustn`t be empty" })
    readonly filesDir: string;
    
}