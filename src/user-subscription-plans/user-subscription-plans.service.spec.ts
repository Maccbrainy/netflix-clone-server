import { Test, TestingModule } from '@nestjs/testing';
import { UserSubscriptionPlansService } from './user-subscription-plans.service';

describe('UserSubscriptionPlansService', () => {
  let service: UserSubscriptionPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSubscriptionPlansService],
    }).compile();

    service = module.get<UserSubscriptionPlansService>(
      UserSubscriptionPlansService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
