import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { MovieActors } from 'src/movie-actors/movie-actors.model';
import { Movies } from 'src/movies/movies.model';

@Table
export class Actors extends Model {
  @Column({ autoIncrement: true, unique: true })
  id!: number;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  actorId!: typeof DataType.UUID;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  dateOfBirth!: Date;

  @BelongsToMany(() => Movies, () => MovieActors)
  movies?: Movies[];
}
