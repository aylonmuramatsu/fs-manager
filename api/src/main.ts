import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //Swagger Documentação
  const config = new DocumentBuilder()
    .setTitle('FS Manager API')
    .setDescription('Documentação da API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('v1');
  SwaggerModule.setup('v1/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
