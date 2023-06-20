import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { SkipAuth } from 'src/auth/decorator/auth.decorator';
import { RequiredAccessRoles } from 'src/access-roles/decorator/access-roles.decorator';
import { Roles } from 'src/access-roles/access-roles.enum';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //User profile
  @Get('user')
  findProfile(@Request() request: any) {
    return this.usersService.findProfile(request.user);
  }

  //Update profile
  @Patch('user')
  updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() request: any) {
    return this.usersService.updateProfile(updateUserDto, request.user);
  }

  //Find user by email
  @Post('user')
  findUserByEmail(@Body() findUserByEmailDto: FindUserByEmailDto) {
    return this.usersService.findUserByEmail(findUserByEmailDto);
  }

  //Create user
  @SkipAuth()
  @Post()
  createUserAndAsignTokenIfUserDoesNotExistOrLoginUserIfExist(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUserAndAsignTokenIfUserDoesNotExistOrLoginUserIfExist(
      createUserDto,
    );
  }
  //Find all users
  @Get()
  @RequiredAccessRoles(Roles.SuperAdmin, Roles.Admin, Roles.AdminII)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @RequiredAccessRoles(Roles.SuperAdmin, Roles.Admin, Roles.AdminII)
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }
  //update a user
  @Patch(':userId')
  @RequiredAccessRoles(Roles.SuperAdmin, Roles.Admin, Roles.AdminII)
  upgradeOrDegradeUserAccountType(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
    @Request() request: any,
  ) {
    return this.usersService.upgradeOrDegradeUserAccountType(
      updateUserDto,
      userId,
      request.user,
    );
  }
}
