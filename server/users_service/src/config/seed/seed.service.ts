import { Injectable } from "@nestjs/common";
import { ISeeder } from "./interfaces/seeder.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolesEntity } from "src/roles/entities/roles.entity";

@Injectable()
export class Seeder implements ISeeder {

    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>,
    ) {}

    async seed(): Promise<void> {

        //Init all needed roles.
        await this.initRoles("USER");
        await this.initRoles("ADMIN");
        await this.initRoles("MEMBER");
    }

    private async initRoles(name: string): Promise<void> {
        const candidate = await this.rolesRepository.findOne({
            where: { name },
        });
        if (!candidate) {
            const role = new RolesEntity();
            role.name = name;
            await this.rolesRepository.save(role);
        }
    }

}