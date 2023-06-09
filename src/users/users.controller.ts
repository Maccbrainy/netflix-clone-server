import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //User profile
  @Get('user')
  findProfile(@Request() request: any) {
    return this.usersService.findProfile(request);
  }

  //Update profile
  @Patch('user')
  updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() request: any) {
    return this.usersService.updateProfile(updateUserDto, request);
  }

  //Find user by email
  @Post('user')
  findUserByEmail(@Body() findUserByEmailDto: FindUserByEmailDto) {
    return this.usersService.findUserByEmail(findUserByEmailDto);
  }

  //Create user
  @Post()
  createUserAndSubscription(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUserAndSubscription(createUserDto);
  }
  //Find all users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }
  //update a user
  @Patch(':userId')
  upgradeOrDegradeUserAccountType(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
    @Request() request: Request,
  ) {
    return this.usersService.upgradeOrDegradeUserAccountType(
      updateUserDto,
      userId,
      request,
    );
  }
}
