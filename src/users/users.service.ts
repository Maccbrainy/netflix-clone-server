import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { AuthService } from 'src/auth/auth.service';
import { AccessRoles } from 'src/access-roles/access-roles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestUser } from './interfaces/request-user.interface';
import { LoginCredentialsDto } from 'src/auth/dto/login-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private UserModel: typeof Users,
    private jwtService: JwtService,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  async findProfile(requestUser: RequestUser): Promise<Users | null> {
    const { userId } = requestUser;
    const user = await this.UserModel.scope('excludePassword').findByPk(userId);
    return user;
  }

  async updateProfile(
    updateUserDto: UpdateUserDto,
    requestUser: RequestUser,
  ): Promise<{
    message: string;
    statusCode: number;
    error?: null;
  }> {
    const { userId } = requestUser;
    await this.UserModel.update(updateUserDto, { where: { userId: userId } });
    return { message: 'Profile updated successfully', statusCode: 201 };
  }

  //=======================Register/Subscription logic Begins=====//
  async findUserByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<{
    message: string;
    statusCode: number;
    error?: null;
  }> {
    const { email } = findUserByEmailDto;
    const user: Users | null = await this.UserModel.findOne({
      where: { email: email },
    });

    if (user && user.accountActivated)
      return {
        message: 'This is an activated account',
        statusCode: 201,
        error: null,
      };
    if (user && !user.accountActivated)
      return { message: 'User account is not activated yet', statusCode: 412 };

    return { message: 'User does not exist', statusCode: 404 };
  }

  async createNewUserAndAsignTokenOrLogInExistingUser(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const { email } = createUserDto;
    const user = await this.UserModel.findOne({ where: { email: email } });

    if (user && user.accountActivated)
      throw new ForbiddenException('This is an activated account');
    //Login user if user exist and user account is not activated
    if (user && !user.accountActivated) {
      const loginCredentialsDto: LoginCredentialsDto = createUserDto;
      return this.authService.verifyAndTokenizeLoginUser(loginCredentialsDto);
    }

    const newlyRegisteredUser: Users = await this.UserModel.create({
      ...createUserDto,
    });
    const payload = {
      sub: newlyRegisteredUser.userId,
      roleType: newlyRegisteredUser.roleType,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
  //=======================Register/Subscription logic Ends=====//
  async findAll(): Promise<{ users: Users[] }> {
    const users = await this.UserModel.scope('excludePassword').findAll();
    return { users };
  }

  async findOne(userId: string): Promise<Users | null> {
    const user = await this.UserModel.scope('excludePassword').findByPk(userId);
    return user;
  }

  async upgradeOrDegradeUserAccountType(
    updateUserDto: UpdateUserDto,
    userId: string,
    requestUser: RequestUser,
  ): Promise<{
    message: string;
    statusCode: number;
    error?: null;
  }> {
    //Find the user whose account is to be upgraded/degraded
    const user: Users | null = await this.UserModel.findByPk(userId, {
      include: AccessRoles,
    });
    if (requestUser.accessRoleLevel > (user as Users).accessRoles.level) {
      throw new ForbiddenException('Consult your higher authority');
    } else {
      await this.UserModel.update(updateUserDto, {
        where: { userId: userId },
      });
      return { message: 'Account updated successfully', statusCode: 201 };
    }
  }
}
