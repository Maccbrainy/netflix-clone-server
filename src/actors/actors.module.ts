import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actors } from './actors.model';

@Module({
  imports: [SequelizeModule.forFeature([Actors])],
  exports: [SequelizeModule],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
