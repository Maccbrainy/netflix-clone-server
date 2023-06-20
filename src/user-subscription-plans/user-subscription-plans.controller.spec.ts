import { Test, TestingModule } from '@nestjs/testing';
import { UserSubscriptionPlansController } from './user-subscription-plans.controller';
import { UserSubscriptionPlansService } from './user-subscription-plans.service';

describe('UserSubscriptionPlansController', () => {
  let controller: UserSubscriptionPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSubscriptionPlansController],
      providers: [UserSubscriptionPlansService],
    }).compile();

    controller = module.get<UserSubscriptionPlansController>(
      UserSubscriptionPlansController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
