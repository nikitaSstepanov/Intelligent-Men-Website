import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "src/users/entities/users.entity";

@Entity("roles")
export class RolesEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => UsersEntity, (user) => user.roles, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    users: UsersEntity[];

}