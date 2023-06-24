import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSubscriptionPlans } from './user-subscription-plans.model';
import { Subscriptions } from 'src/subscriptions/subscriptions.model';
import { Users } from 'src/users/users.model';
import { CreateUserSubscriptionPlanDto } from './dto/create-user-subscription-plan.dto';
import { RequestUser } from 'src/users/interfaces/request-user.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UserSubscriptionPlansService {
  constructor(
    @InjectModel(UserSubscriptionPlans)
    private userSubscriptionPlansModel: typeof UserSubscriptionPlans,
    @InjectModel(Users) private UserModel: typeof Users,
    @InjectModel(Subscriptions) private SubscriptionModel: typeof Subscriptions,
  ) {}

  async createUserSubscriptionPlanAndActivateAccount(
    createUserSubscriptionPlanDto: CreateUserSubscriptionPlanDto,
    requestUser: RequestUser,
  ): Promise<any> {
    const { userId } = requestUser;
    const { subscriptionId } = createUserSubscriptionPlanDto;

    const subscription: Subscriptions | null =
      await this.SubscriptionModel.findByPk(subscriptionId);

    if (subscription) {
      createUserSubscriptionPlanDto.userId = userId;
      createUserSubscriptionPlanDto.endDate = {
        timeDurationAmount: subscription.timeDurationAmount,
        timeDurationUnit: subscription.timeDurationUnit,
      };

      await this.userSubscriptionPlansModel.create({
        ...createUserSubscriptionPlanDto,
      });
      const updateUserDto: UpdateUserDto = {
        accountActivated: true,
      };
      await this.UserModel.update(updateUserDto, {
        where: { userId: userId },
      });
      return { message: 'Account activated successfully', statusCode: 201 };
    }
  }
}
