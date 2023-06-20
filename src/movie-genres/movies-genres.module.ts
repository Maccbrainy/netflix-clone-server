import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieGenres } from './movie-genres.model';
import { MovieGenresController } from './movie-genres.controller';
import { MovieGenresService } from './movie-genres.service';

@Module({
  imports: [SequelizeModule.forFeature([MovieGenres])],
  exports: [SequelizeModule],
  controllers: [MovieGenresController],
  providers: [MovieGenresService],
})
export class MovieGenresModule {}
