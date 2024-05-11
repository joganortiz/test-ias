import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configEnv = new ConfigService();

  app.useGlobalPipes(new ValidationPipe({}));

  app.setGlobalPrefix('/api/v1');

  await app.listen(configEnv.get('PORT'), async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
