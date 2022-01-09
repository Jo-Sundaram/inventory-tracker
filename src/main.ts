import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ItemsModule } from './components/items/items.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
  .setTitle('Inventory Tracker')
  .setDescription('The Inventory Tracker API description')
  .setVersion('v1')
  .addTag('items')
  .build();

  const options: SwaggerDocumentOptions = {
    include: [ItemsModule]
  };

  const document = SwaggerModule.createDocument(app, config, {include: [ItemsModule]});

  SwaggerModule.setup('api/docs/inventory-tracker', app, document);
  await app.listen(3000);
}
bootstrap();
