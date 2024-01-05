import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seeder } from "./seed.service";
import { RolesEntity } from "src/roles/entities/roles.entity";

@Module({
    providers: [Seeder],
    imports: [TypeOrmModule.forFeature([RolesEntity])],
})
export class SeedModule {}