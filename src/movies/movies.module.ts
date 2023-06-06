import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movies } from './movies.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Movies]), UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
