import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
  app.use(helmet());
  app.enableCors({
    origin: ['http://127.0.0.1:5173'],
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(compression());
  app.set('json spaces', 4);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(parseInt(port));
}
bootstrap();
