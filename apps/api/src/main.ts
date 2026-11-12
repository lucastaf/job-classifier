import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { stringify } from 'yaml';

import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
    const config = new DocumentBuilder()
    .setTitle('Job Classifier API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Disponibiliza a documentação Swagger
  SwaggerModule.setup('api', app, document);

  // Exporta o contrato OpenAPI em YAML
  writeFileSync(
    'openapi.yaml',
    stringify(document),
    'utf-8',
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
