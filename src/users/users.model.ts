import * as bcrypt from 'bcrypt';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Scopes,
  BelongsToMany,
} from 'sequelize-typescript';
import { AccessRoles } from 'src/access-roles/access-roles.model';
import { Movies } from 'src/movies/movies.model';
import { Subscriptions } from 'src/subscriptions/subscriptions.model';
import { UserSubscriptionPlans } from 'src/user-subscription-plans/user-subscription-plans.model';
@Scopes(() => ({
  excludePassword: {
    attributes: {
      exclude: ['password'],
    },
  },
}))
@Table
export class Users extends Model {
  @Column({
    autoIncrement: true,
    unique: true,
  })
  id!: number;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV1,
  })
  userId!: typeof DataType.UUID;

  @Column({
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    unique: true,
    allowNull: true,
  })
  userName!: string;

  @Column({
    allowNull: true,
  })
  avatarUrl!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  set password(value: any) {
    const salt: string = bcrypt.genSaltSync();
    const password: string = bcrypt.hashSync(value, salt);
    this.setDataValue('password', password);
  }

  @ForeignKey(() => AccessRoles)
  @Column({
    defaultValue: 'User',
  })
  roleType!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  accountActivated!: boolean;

  @BelongsTo(() => AccessRoles)
  accessRoles!: AccessRoles;

  @BelongsToMany(() => Subscriptions, () => UserSubscriptionPlans)
  subscriptionPlans!: Subscriptions[];

  @HasMany(() => Movies)
  movies?: Movies[];
}
