import { NestFactory } from '@nestjs/core';
import setupSwagger from 'swagger';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  setupSwagger(app);

  await app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server started on ${process.env.SERVER_URL} and Port: ${process.env.PORT}`)
  });
};

bootstrap();