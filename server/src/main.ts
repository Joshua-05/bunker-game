import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173', 'http://26.207.11.211:5173/']
    }
  });
  const configservice = app.get(ConfigService);
  const port = configservice.get('port');
  app.useGlobalPipes(new ValidationPipe)

  const config = new DocumentBuilder()
    .setTitle('Bunker api')
    .setDescription('This api for bunker')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
