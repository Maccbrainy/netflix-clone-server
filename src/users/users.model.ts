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
} from 'sequelize-typescript';
import { AccessRoles } from 'src/access-roles/access-roles.model';
import { Movies } from 'src/movies/movies.model';
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

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  accountActivated!: boolean;

  @ForeignKey(() => AccessRoles)
  @Column({
    defaultValue: 'User',
  })
  roleType!: string;

  @BelongsTo(() => AccessRoles)
  accessRoles!: AccessRoles;

  @HasMany(() => Movies)
  movies?: Movies[];
}
