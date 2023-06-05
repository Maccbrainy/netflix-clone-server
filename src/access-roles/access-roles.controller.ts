import { Controller } from '@nestjs/common';
import { AccessRolesService } from './access-roles.service';

@Controller('access-roles')
export class AccessRolesController {
  constructor(private readonly accessRolesService: AccessRolesService) {}
}
