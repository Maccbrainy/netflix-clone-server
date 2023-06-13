import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './access-roles.enum';
import { ROLES_KEY } from './decorator/access-roles.decorator';

@Injectable()
export class AccessRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAccessRoles = this.reflector.getAllAndOverride<Roles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAccessRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredAccessRoles.some((role) => user.roleType.includes(role));
  }
}
