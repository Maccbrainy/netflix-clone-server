import { addDays, addMinutes, addMonths, addYears } from 'date-fns';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Subscriptions } from 'src/subscriptions/subscriptions.model';
import { Users } from 'src/users/users.model';

interface TimeInfo {
  timeDurationAmount: number;
  timeDurationUnit: string;
}
const getExpirationDate = (startDate: Date, value: TimeInfo) => {
  const startingDate = new Date(startDate);
  const { timeDurationAmount, timeDurationUnit } = value;
  const expirationAmount = timeDurationAmount;

  let expirationDate;

  switch (timeDurationUnit) {
    case 'YEAR':
      expirationDate = addYears(startingDate, expirationAmount);
      break;
    case 'MONTH':
      expirationDate = addMonths(startingDate, expirationAmount);
      break;
    case 'DAYS':
      expirationDate = addDays(startingDate, expirationAmount);
      break;
    case 'MINUTES':
      expirationDate = addMinutes(startingDate, expirationAmount);
      break;
  }
  return expirationDate;
};

@Table
export class UserSubscriptionPlans extends Model {
  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  userId!: typeof DataType.UUID;

  @ForeignKey(() => Subscriptions)
  @Column({ type: DataType.UUID })
  subscriptionId!: typeof DataType.UUID;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: false })
  startDate!: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  set endDate(value: TimeInfo) {
    const startDate = this.startDate;
    const expirationDate = getExpirationDate(startDate, value);
    this.setDataValue('endDate', expirationDate);
  }

  @Column({
    type: DataType.ENUM('ACTIVE', 'CANCELED', 'EXPIRED', 'SUSPENDED'),
    defaultValue: 'ACTIVE',
  })
  subscriptionStatus!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  expired!: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  expiredAt!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  canceledAt!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  suspendedAt!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  subscriptionAutoRenewal!: boolean;
}
