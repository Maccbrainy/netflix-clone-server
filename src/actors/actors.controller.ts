import { Controller } from '@nestjs/common';
import { ActorsService } from './actors.service';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}
}
