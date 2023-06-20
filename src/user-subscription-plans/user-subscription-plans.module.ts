import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { UserSubscriptionPlans } from './user-subscription-plans.model';
import { UserSubscriptionPlansService } from './user-subscription-plans.service';
import { UserSubscriptionPlansController } from './user-subscription-plans.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([UserSubscriptionPlans]),
    UsersModule,
    SubscriptionsModule,
  ],
  exports: [SequelizeModule],
  controllers: [UserSubscriptionPlansController],
  providers: [UserSubscriptionPlansService],
})
export class UserSubscriptionPlansModule {}
