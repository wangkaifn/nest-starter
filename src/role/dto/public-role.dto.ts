import { Transform } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';

export class PublicRoleDto extends CreateRoleDto {
  @Transform(({ value }) => {
    return value.map((permission) => permission.permission.name);
  })
  RolePermissions: any[];
}
