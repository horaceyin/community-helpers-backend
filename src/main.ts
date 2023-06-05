import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { UserActionMiddleware } from './user-action/user-action.middleware';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
