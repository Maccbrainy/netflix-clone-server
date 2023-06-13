import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/users/users.model';
import { AccessRoles } from 'src/access-roles/access-roles.model';
import { JwtPayload } from './type/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Users) private UserModel: typeof Users,
    protected configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT.secret'),
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.UserModel.findByPk(payload.sub, {
      include: AccessRoles,
    });
    if (user)
      return {
        userId: user.userId,
        email: user.email,
        roleType: user.roleType,
        accessRoleLevel: user.accessRoles.level,
      };
  }
}
