import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.model';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users) private UserModel: typeof Users,
    private jwtService: JwtService,
  ) {}

  async verifyAndTokenizeLoginUser(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginCredentialsDto;

    if (email && password) {
      const user = await this.UserModel.findOne({ where: { email: email } });

      if (!user) throw new UnauthorizedException('User does not exist');

      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          sub: user.userId,
          roleType: user.roleType,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
      }
      throw new UnauthorizedException('Incorrect password');
    }
    throw new UnauthorizedException('Invalid email or password');
  }
}
