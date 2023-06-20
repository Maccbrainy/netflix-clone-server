import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Subscriptions } from './subscriptions.model';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscriptions) private SubscriptionModel: typeof Subscriptions,
  ) {}

  async createPlan(createSubscriptionDto: CreateSubscriptionDto): Promise<any> {
    const { timeDurationAmount, timeDurationUnit } = createSubscriptionDto;
    const subscriptionPlan: Subscriptions | null =
      await this.SubscriptionModel.findOne({
        where: {
          [Op.and]: [
            { timeDurationAmount: timeDurationAmount },
            { timeDurationUnit: timeDurationUnit },
          ],
        },
      });
    if (subscriptionPlan)
      throw new ConflictException('Conflicting Subscription plan');

    await this.SubscriptionModel.create({ ...createSubscriptionDto });
    return { message: 'Subscription plan created successfully' };
  }

  async findAllPlans(): Promise<Subscriptions[]> {
    const subscriptionPlans = await this.SubscriptionModel.findAll();
    return subscriptionPlans;
  }

  async findOne(subscriptionId: string): Promise<Subscriptions | null> {
    const subscriptionPlan = await this.SubscriptionModel.findByPk(
      subscriptionId,
    );
    return subscriptionPlan;
  }

  async updatePlan(
    updateSubscriptionDto: UpdateSubscriptionDto,
    subscriptionId: string,
  ): Promise<any> {
    const subscriptionPlan = await this.SubscriptionModel.findByPk(
      subscriptionId,
    );
    if (subscriptionPlan) {
      await this.SubscriptionModel.update(updateSubscriptionDto, {
        where: { subscriptionId: subscriptionId },
      });

      return { message: 'Subscription plan updated successfully' };
    }
  }

  async removePlan(subscriptionId: string): Promise<any> {
    await this.SubscriptionModel.destroy({
      where: { subscriptionId: subscriptionId },
    });
    return { message: 'Subscription plan deleted successfully' };
  }
}
