import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RequiredAccessRoles } from './decorator/access-roles.decorator';
import { Roles } from './access-roles.enum';
import { AccessRolesService } from './access-roles.service';
import { CreateAccessRolesDto } from './dto/create-access-roles.dto';

@Controller('api/v1/security-protocol')
export class AccessRolesController {
  constructor(private readonly accessRolesService: AccessRolesService) {}

  @Post()
  @RequiredAccessRoles(Roles.SuperAdmin)
  create(@Body() createAccessRolesDto: CreateAccessRolesDto) {
    return this.accessRolesService.create(createAccessRolesDto);
  }

  @Get()
  findAll(@Request() request: any) {
    return this.accessRolesService.findAll(request.user);
  }
}
