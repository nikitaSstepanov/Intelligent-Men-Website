import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentsEntity } from "../../comments/entities/comments.entity";
import { TagsEntiy } from "./tags.entity";

@Entity("posts")
export class PostsEntity {
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    title: string;

    @Column()
    contentDir: string;

    @Column()
    authorId: number;

    @Column({ default: 0 })
    likesNumber: number;

    @Column({ default: 0 })
    commentsNumber: number;

    @OneToMany(() => CommentsEntity, (comment) => comment.post, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    comments: CommentsEntity[];

    @ManyToMany(() => TagsEntiy, (tag) => tag.posts, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    @JoinTable({ name: "posts_to_tags" })
    tags: TagsEntiy[];

}