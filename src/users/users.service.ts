import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { AccessRoles } from 'src/access-roles/access-roles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestUser } from './type/request-user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async findProfile(requestUser: RequestUser): Promise<any> {
    try {
      const { userId } = requestUser;
      const user = await this.UserModel.scope('excludePassword').findByPk(
        userId,
      );
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProfile(
    updateUserDto: UpdateUserDto,
    requestUser: RequestUser,
  ): Promise<any> {
    try {
      const { userId } = requestUser;
      await this.UserModel.update(updateUserDto, { where: { userId: userId } });
      return { message: 'Profile updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //=======================Register/Login/Subscription logic Begins=====//
  async findUserByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<any> {
    const { email } = findUserByEmailDto;
    const user = await this.UserModel.findOne({ where: { email: email } });

    if (user) throw new ConflictException('User already exist');

    throw new NotFoundException('User does not exist');
  }

  async createUserAndSubscription(createUserDto: CreateUserDto): Promise<any> {
    const { email } = createUserDto;
    const user = await this.UserModel.findOne({ where: { email: email } });

    if (user) throw new ConflictException('User already exist');

    await this.UserModel.create({ ...createUserDto });
    return { message: 'Account created successfully' };
  }

  //=======================Register/Login/Subscription logic Ends=====//
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
  ): Promise<any> {
    try {
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
        return { message: 'Account updated successfully' };
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
