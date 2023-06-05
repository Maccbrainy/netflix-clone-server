import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccessRolesService } from './access-roles.service';
import { AccessRolesController } from './access-roles.controller';
import { AccessRoles } from './access-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([AccessRoles])],
  exports: [SequelizeModule],
  controllers: [AccessRolesController],
  providers: [AccessRolesService],
})
export class AccessRolesModule {}
