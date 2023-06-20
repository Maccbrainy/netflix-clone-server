import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([Users]), AuthModule],
  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
