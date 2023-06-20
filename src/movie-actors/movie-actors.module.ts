import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieActors } from './movie-actors.model';
import { MovieActorsController } from './movie-actors.controller';
import { MovieActorsService } from './movie-actors.service';

@Module({
  imports: [SequelizeModule.forFeature([MovieActors])],
  exports: [SequelizeModule],
  controllers: [MovieActorsController],
  providers: [MovieActorsService],
})
export class MovieActorsModule {}
