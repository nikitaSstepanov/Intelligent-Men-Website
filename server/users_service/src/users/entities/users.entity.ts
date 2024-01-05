import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "src/roles/entities/roles.entity";
import { TokensEntity } from "src/auth/entities/tokens.entity";

@Entity("users")
export class UsersEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    contentDir: string;

    @Column()
    birthDay: string;

    @Column({ default: false })
    isActivated: boolean;

    @Column({ nullable: true })
    activationUrl: string;

    @ManyToMany(() => RolesEntity, (role) => role.users, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    roles: RolesEntity[];

    @OneToOne(() => TokensEntity, (token) => token.user, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    refresh_token: TokensEntity;

}