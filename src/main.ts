/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error for unknown properties
      transform: true, // Automatically transform payloads to DTO instances
      errorHttpStatusCode: 422, // Set validation errors to return 422
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
