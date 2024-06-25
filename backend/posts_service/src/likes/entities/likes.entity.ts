import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("likes")
export class LikesEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    userId: number;

    @Column()
    postId: number;

}