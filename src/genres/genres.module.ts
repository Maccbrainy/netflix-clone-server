import { Module } from '@nestjs/common';
import { Genres } from './genres.model';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Genres])],
  exports: [SequelizeModule],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
