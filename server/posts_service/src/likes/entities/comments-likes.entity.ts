import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments_likes")
export class CommentsLikesEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    userId: number;

    @Column()
    commentId: number;

}