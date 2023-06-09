import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessRoles } from 'src/access-roles/access-roles.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private UserModel: typeof Users) {}

  async findProfile(request: any): Promise<any> {
    try {
      const { userId } = request.user;
      const user = await this.UserModel.findByPk(userId);
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProfile(
    updateUserDto: UpdateUserDto,
    request: any,
  ): Promise<any> {
    try {
      const { userId } = request.user;
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

    if (user) throw new PreconditionFailedException('User already exist');

    throw new NotFoundException('User does not exist');
  }

  async createUserAndSubscription(createUserDto: CreateUserDto): Promise<any> {
    const { email } = createUserDto;
    const user = await this.UserModel.findOne({ where: { email: email } });

    if (user) throw new PreconditionFailedException('User already exist');

    await this.UserModel.create({ ...createUserDto });
    return { message: 'Account created successfully' };
  }

  //=======================Register/Login/Subscription logic Ends=====//
  async findAll(): Promise<{ users: Users[] }> {
    const users = await this.UserModel.findAll();
    return { users };
  }

  async findOne(userId: string): Promise<Users | null> {
    const user = await this.UserModel.findByPk(userId);
    return user;
  }

  async upgradeOrDegradeUserAccountType(
    updateUserDto: UpdateUserDto,
    userId: string,
    request: any,
  ): Promise<any> {
    try {
      //Find the user whose account is to be upgraded/degraded
      const user: Users | null = await this.UserModel.findByPk(userId, {
        include: AccessRoles,
      });
      if (request.user.accessRoleLevel > (user as Users).accessRoles.level) {
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
