import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Movies extends Model {
  @Column({ autoIncrement: true, unique: true })
  id!: number;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  movieId!: typeof DataType.UUID;

  @Column({ allowNull: false })
  title!: string;

  @Column({ allowNull: false })
  releaseDate!: Date;

  @Column({ allowNull: false })
  duration!: string;

  @Column({ allowNull: false })
  synopsis!: string;

  @Column({ allowNull: false })
  posterUrl!: string;

  @Column
  trailerUrl!: string;
}
