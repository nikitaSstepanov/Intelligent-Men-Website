import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "src/users/entities/users.entity";

@Entity("refresh_tokens")
export class TokensEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    token: string;

    @OneToOne(() => UsersEntity, (user) => user.refresh_token, { onDelete: "SET NULL", onUpdate: "NO ACTION" })
    @JoinColumn({ name: "user" })
    user: UsersEntity;

}