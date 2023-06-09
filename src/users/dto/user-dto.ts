import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  password!: string;
  userName!: string;
  avatarUrl!: string;
  roleType!: string;
  @IsBoolean()
  accountActivated!: boolean;
}
