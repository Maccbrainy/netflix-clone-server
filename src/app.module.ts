import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './config/configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccessRolesModule } from './access-roles/access-roles.module';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { GenresModule } from './genres/genres.module';
import { MovieActorsModule } from './movie-actors/movie-actors.module';
import { MovieGenresModule } from './movie-genres/movies-genres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DATABASE.dialect'),
        host: configService.get('DATABASE.host'),
        port: configService.get('DATABASE.port'),
        username: configService.get('DATABASE.username'),
        password: configService.get('DATABASE.password'),
        database: configService.get('DATABASE.database'),
        models: [__dirname + './**/*.model.ts'],
        autoLoadModels: true,
        synchronize: true, //Not recommended in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    AccessRolesModule,
    MoviesModule,
    ActorsModule,
    GenresModule,
    MovieActorsModule,
    MovieGenresModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
