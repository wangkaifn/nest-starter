import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_KEY } from '../decorators/role-permission.decorator';

@Injectable()
export class RolePermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classPermissions = this.reflector.get<string[]>(
      PERMISSION_KEY,
      context.getClass(),
    );

    const handlerPermissions = this.reflector.get<string[]>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    console.log(classPermissions, '-----', handlerPermissions);
    return true;
  }
}
