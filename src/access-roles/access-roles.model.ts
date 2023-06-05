import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/users/users.model';

@Table
export class AccessRoles extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: typeof DataType.UUID;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  roleType!: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  level!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @HasMany(() => Users)
  users!: Users[];
}
