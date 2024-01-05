import { Injectable } from "@nestjs/common";
import { IRolesService } from "./interfaces/roles-service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolesEntity } from "./entities/roles.entity";
import { UsersEntity } from "src/users/entities/users.entity";
import { SetRoleDto } from "./dto/set-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { GetRoleId } from "./dto/get-role-id.dto";

@Injectable()
export class RolesService implements IRolesService {

    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>,
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    async setRole(dto: SetRoleDto): Promise<Empty> {
        const role = await this.rolesRepository.findOne({
            where: { name: dto.roleName },
        });
        const user = await this.usersRepository.findOne({
            where: { id: Number(dto.userId) },
            relations: { roles: true },
        });
        user.roles.push(role);
        await this.usersRepository.save(user);
        return {};
    }

    async createRole(dto: CreateRoleDto): Promise<Empty> {
        const candidate = await this.rolesRepository.findOne({
            where: { name: dto.name },
        });
        if (!candidate) {
            const role = new RolesEntity();
            role.name = dto.name;
            await this.rolesRepository.save(role);
        }
        return {};
    }

    async updateRole(dto: UpdateRoleDto): Promise<Empty> {
        if (dto.name) {
            const role = await this.rolesRepository.findOne({
                where: { name: dto.preName },
            });
            role.name = dto.name;
            await this.rolesRepository.save(role);
        }
        return {};
    }

    async deleteRole(dto: GetRoleId): Promise<Empty> {
        const role = await this.rolesRepository.findOne({
            where: { id: Number(dto.roleId) },
        });
        if (role) {
            await this.rolesRepository.delete(dto.roleId);
        }
        return {};
    }

}