import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService]
})
export class ActorsModule {}
