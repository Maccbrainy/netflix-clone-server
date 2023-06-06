import { Controller } from '@nestjs/common';
import { MovieActorsService } from './movie-actors.service';

@Controller('casts')
export class MovieActorsController {
  constructor(private readonly movieActorsService: MovieActorsService) {}
}
