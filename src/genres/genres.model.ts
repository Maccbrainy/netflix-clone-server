import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { MovieGenres } from 'src/movie-genres/movie-genres.model';
import { Movies } from 'src/movies/movies.model';

@Table
export class Genres extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: typeof DataType.UUID;

  @Column({ type: DataType.STRING, primaryKey: true })
  genreName!: string;

  @BelongsToMany(() => Movies, () => MovieGenres)
  movies?: Movies[];
}
