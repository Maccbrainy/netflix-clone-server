import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Actors } from 'src/actors/actors.model';
import { Genres } from 'src/genres/genres.model';
import { MovieActors } from 'src/movie-actors/movie-actors.model';
import { MovieGenres } from 'src/movie-genres/movie-genres.model';
import { Users } from 'src/users/users.model';

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

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  documentedBy!: typeof DataType.UUID;

  @BelongsTo(() => Users)
  users!: Users;

  @BelongsToMany(() => Actors, () => MovieActors)
  casts?: Actors[];

  @BelongsToMany(() => Genres, () => MovieGenres)
  genres?: Genres[];
}
