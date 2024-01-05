import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files")
export class FilesEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    mode: string;

    @Column()
    fileDir: string;

    @Column()
    fileName: string;

}