import { Controller } from "@nestjs/common";
import { IRolesController } from "./interfaces/roles-controller.interface";
import { GrpcMethod } from "@nestjs/microservices";
import { RolesService } from "./roles.service";
import { SetRoleDto } from "./dto/set-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { GetRoleId } from "./dto/get-role-id.dto";

@Controller()
export class RolesController implements IRolesController {

    constructor(private readonly rolesService: RolesService) {}

    @GrpcMethod("UsersService", "SetRole")
    async setRole(dto: SetRoleDto): Promise<Empty> {
        return await this.rolesService.setRole(dto);
    }

    @GrpcMethod("UsersService", "CreateRole")
    async createRole(dto: CreateRoleDto): Promise<Empty> {
        return await this.rolesService.createRole(dto);
    }

    @GrpcMethod("UsersService", "UpdateRole")
    async updateRole(dto: UpdateRoleDto): Promise<Empty> {
        return await this.rolesService.updateRole(dto);
    }

    @GrpcMethod("UsersService", "DeleteRole")
    async deleteRole(dto: GetRoleId): Promise<Empty> {
        return await this.rolesService.deleteRole(dto);
    }
    
}