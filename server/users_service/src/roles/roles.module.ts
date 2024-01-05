import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { RolesEntity } from "./entities/roles.entity";
import { UsersEntity } from "src/users/entities/users.entity";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [TypeOrmModule.forFeature([RolesEntity, UsersEntity])],
})
export class RolesModule {}