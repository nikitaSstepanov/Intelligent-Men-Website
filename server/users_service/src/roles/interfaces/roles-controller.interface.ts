import { SetRoleDto } from "../dto/set-role.dto";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { GetRoleId } from "../dto/get-role-id.dto";

export interface IRolesController {
    setRole(dto: SetRoleDto): Promise<Empty>;
    createRole(dto: CreateRoleDto): Promise<Empty>;
    updateRole(dto: UpdateRoleDto): Promise<Empty>;
    deleteRole(dto: GetRoleId): Promise<Empty>;
}