import { IsUUID } from 'class-validator';

export class CreateUserSubscriptionPlanDto {
  userId?: string;
  @IsUUID()
  subscriptionId!: string;
  endDate?: any;
}
