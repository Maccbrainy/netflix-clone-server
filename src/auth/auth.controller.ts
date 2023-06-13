import { Body, Controller, Post } from '@nestjs/common';
import { SkipAuth } from './decorator/auth.decorator';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  verifyAndTokenizeLoginUser(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.verifyAndTokenizeLoginUser(loginCredentialsDto);
  }
}
