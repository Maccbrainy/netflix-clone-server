import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieGenres } from './movie-genres.model';
import { ActorsModule } from 'src/actors/actors.module';
import { MoviesModule } from 'src/movies/movies.module';
import { MovieGenresController } from './movie-genres.controller';
import { MovieGenresService } from './movie-genres.service';

@Module({
  imports: [
    SequelizeModule.forFeature([MovieGenres]),
    ActorsModule,
    MoviesModule,
  ],
  exports: [SequelizeModule],
  controllers: [MovieGenresController],
  providers: [MovieGenresService],
})
export class MovieGenresModule {}
