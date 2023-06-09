import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
