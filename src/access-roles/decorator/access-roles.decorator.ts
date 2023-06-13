import { SetMetadata } from '@nestjs/common';
import { Roles } from '../access-roles.enum';

export const ROLES_KEY = 'roles';
export const RequiredAccessRoles = (...accessRoles: Roles[]) =>
  SetMetadata(ROLES_KEY, accessRoles);
