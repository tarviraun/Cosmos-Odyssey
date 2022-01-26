import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricelistModule } from './pricelist/pricelist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.prelive', '.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      dbName: 'cosmos-odyssey',
      useNewUrlParser: true,
    }),
    PricelistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
