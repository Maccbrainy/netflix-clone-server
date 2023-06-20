import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserSubscriptionPlans } from 'src/user-subscription-plans/user-subscription-plans.model';
import { Users } from 'src/users/users.model';

@Table
export class Subscriptions extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true })
  ID!: number;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  subscriptionId!: typeof DataType.UUID;

  @Column({ allowNull: false })
  type!: string;

  @Column({ allowNull: false })
  description!: string;

  @Column({ allowNull: false })
  amount!: number;

  @Column({ allowNull: false })
  timeDurationAmount!: number;

  @Column({ allowNull: false })
  timeDurationUnit!: string;

  @BelongsToMany(() => Users, () => UserSubscriptionPlans)
  users!: Users[];
}
