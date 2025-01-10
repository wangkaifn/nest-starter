import { CreatePermissionDto } from '@/permission/dto/create-permission.dto';
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
interface PermissionType {
  id?: number;
  name: string;
  action: string;
  description?: string;
}
export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Optional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @Type(() => CreatePermissionDto)
  permissions?: PermissionType[];
}
