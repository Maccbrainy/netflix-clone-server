import { PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/users/dto/user-dto';

export class LoginCredentialsDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}
