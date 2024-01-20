import { IsEmail } from "class-validator";

export class PostCreatedDto {

    @IsEmail({}, { message: "incorrect email" })
    readonly email: string;

    readonly title: string;
    
}