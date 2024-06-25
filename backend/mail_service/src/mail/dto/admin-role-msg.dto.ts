import { IsEmail, IsNotEmpty } from "class-validator";

export class AdminRoleMessageDto {

    @IsEmail({}, { message: "incorrect email" })
    readonly email: string;

    @IsNotEmpty({ message: "username mustn`t be empty" })
    readonly username: string;
    
}