export class UpdateFilesDto {
    readonly mode: string;
    readonly directory: string;
    readonly text: string;
    readonly newFiles: FileType[];
    readonly filesToDel: string[];
}