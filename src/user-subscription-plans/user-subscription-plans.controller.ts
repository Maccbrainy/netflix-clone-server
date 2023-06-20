import { Body, Controller, Post, Request } from '@nestjs/common';
// import { SkipAuth } from 'src/auth/decorator/auth.decorator';
import { UserSubscriptionPlansService } from './user-subscription-plans.service';
import { CreateUserSubscriptionPlanDto } from './dto/create-user-subscription-plan.dto';

@Controller('api/v1/user-subscription-plan')
export class UserSubscriptionPlansController {
  constructor(
    private readonly userSubscriptionPlansService: UserSubscriptionPlansService,
  ) {}

  @Post()
  createUserSubscriptionPlanAndActivateAccount(
    @Body() createUserSubscriptionPlanDto: CreateUserSubscriptionPlanDto,
    @Request() request: any,
  ) {
    return this.userSubscriptionPlansService.createUserSubscriptionPlanAndActivateAccount(
      createUserSubscriptionPlanDto,
      request.user,
    );
  }
}
