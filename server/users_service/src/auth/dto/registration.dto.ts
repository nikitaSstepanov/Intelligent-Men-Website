export class RegistrationDto {
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly birthDay: string;
    readonly profileDescription: string;
    readonly profilePhoto: Buffer;
    readonly photoMimeType: string;
}