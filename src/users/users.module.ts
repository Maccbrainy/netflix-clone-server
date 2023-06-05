import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { AccessRolesModule } from 'src/access-roles/access-roles.module';

@Module({
  imports: [SequelizeModule.forFeature([Users]), AccessRolesModule],
  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
