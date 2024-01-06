export class UpdateFilesDto {
    readonly mode: string;
    readonly names: string;
    readonly text: string;
    readonly newFiles: FileType[];
    readonly filesToDel: string[];
}