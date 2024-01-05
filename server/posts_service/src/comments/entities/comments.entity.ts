import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "../../posts/entities/posts.entity";

@Entity("comments")
export class CommentsEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    contentDir: string;

    @Column()
    authorId: number;

    @Column({ default: 0 })
    likesNumber: number;

    @Column({ default: 0 })
    answersNumber: number;

    @Column({ nullable: true })
    isAnswerFor: number;

    @ManyToOne(() => PostsEntity, (post) => post.comments, { onDelete: "SET NULL", onUpdate: "NO ACTION" })
    post: PostsEntity;

}