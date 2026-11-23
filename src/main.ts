import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  const logger = new LoggerMiddleware();
  app.use((req, res, next) => logger.use(req, res, next));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT || 3000);
  console.log(`Hospital API running at http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
