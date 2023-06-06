import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Genres } from 'src/genres/genres.model';
import { Movies } from 'src/movies/movies.model';

@Table
export class MovieGenres extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: typeof DataType.UUID;

  @ForeignKey(() => Movies)
  @Column({ type: DataType.UUID })
  movieId!: typeof DataType.UUID;

  @ForeignKey(() => Genres)
  @Column
  genreName!: string;
}
