import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Actors } from 'src/actors/actors.model';
import { Movies } from 'src/movies/movies.model';

@Table
export class MovieActors extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: typeof DataType.UUID;

  @ForeignKey(() => Movies)
  @Column({ type: DataType.UUID })
  movieId!: typeof DataType.UUID;

  @ForeignKey(() => Actors)
  @Column({ type: DataType.UUID })
  actorId!: typeof DataType.UUID;
}
