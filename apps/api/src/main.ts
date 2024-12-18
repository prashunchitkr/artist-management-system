import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CONFIG_KEYS } from './core/config/app.config';
import { IHostConfig } from './core/config/host.config';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function addSwagger(app: INestApplication, endpoint: string) {
  const options = new DocumentBuilder()
    .setTitle('Artist Management System')
    .setDescription('Artist Management System API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(endpoint, app, document);
}

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const swaggerEndpoint = 'swagger';
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService);
  const { host, port } = appConfig.get<IHostConfig>(CONFIG_KEYS.host);

  addSwagger(app, swaggerEndpoint);

  await app.listen(port, host, () => {
    logger.log(`Server is running on http://${host}:${port}`);
    logger.log(
      `Swagger is running on http://${host}:${port}/${swaggerEndpoint}`,
    );
  });
}
bootstrap();
