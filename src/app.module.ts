import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './components/items/items.module';

@Module({
  imports: [ItemsModule, ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
