import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  type!: string;
  @IsNotEmpty()
  description!: string;
  @IsInt()
  amount!: number;
  @IsInt()
  timeDurationAmount!: number;
  @IsNotEmpty()
  timeDurationUnit!: string;
}
