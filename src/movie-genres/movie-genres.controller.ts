import { Controller } from '@nestjs/common';
import { MovieGenresService } from './movie-genres.service';

@Controller('movie_genre')
export class MovieGenresController {
  constructor(private readonly movieGenresService: MovieGenresService) {}
}
