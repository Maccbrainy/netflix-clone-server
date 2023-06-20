import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { SkipAuth } from 'src/auth/decorator/auth.decorator';
import { RequiredAccessRoles } from 'src/access-roles/decorator/access-roles.decorator';
import { Roles } from 'src/access-roles/access-roles.enum';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('api/v1/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @RequiredAccessRoles(Roles.SuperAdmin)
  createPlan(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.createPlan(createSubscriptionDto);
  }

  @Get()
  findAllPlans() {
    return this.subscriptionsService.findAllPlans();
  }

  @Get('subscriptionId')
  @RequiredAccessRoles(Roles.SuperAdmin)
  findOne(@Param('subscriptionId') subscriptionId: string) {
    return this.subscriptionsService.findOne(subscriptionId);
  }

  @Patch('subscriptionId')
  @RequiredAccessRoles(Roles.SuperAdmin)
  updatePlan(
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Param('subscriptionId') subscriptionId: string,
  ) {
    return this.subscriptionsService.updatePlan(
      updateSubscriptionDto,
      subscriptionId,
    );
  }

  @Delete('subscriptionId')
  @RequiredAccessRoles(Roles.SuperAdmin)
  removePlan(@Param('subscriptionId') subscriptionId: string) {
    return this.subscriptionsService.removePlan(subscriptionId);
  }
}
