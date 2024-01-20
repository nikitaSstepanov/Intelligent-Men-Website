import { IsEmail, IsNotEmpty } from "class-validator";

export class ActivationDto {

    @IsEmail({}, { message: "incorrect email" })
    readonly email: string;

    @IsNotEmpty({ message: "username mustn`t be empty" })
    readonly username: string;

    @IsNotEmpty({ message: "url mustn`t be empty" })
    readonly url: string;
    
}