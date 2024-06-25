import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";

@Entity("tags")
export class TagsEntiy {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => PostsEntity, (post) => post.tags, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    posts: PostsEntity[];

}