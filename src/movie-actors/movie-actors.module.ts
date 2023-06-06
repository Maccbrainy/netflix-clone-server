import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieActors } from './movie-actors.model';
import { ActorsModule } from 'src/actors/actors.module';
import { MoviesModule } from 'src/movies/movies.module';
import { MovieActorsController } from './movie-actors.controller';
import { MovieActorsService } from './movie-actors.service';

@Module({
  imports: [
    SequelizeModule.forFeature([MovieActors]),
    ActorsModule,
    MoviesModule,
  ],
  exports: [SequelizeModule],
  controllers: [MovieActorsController],
  providers: [MovieActorsService],
})
export class MovieActorsModule {}
