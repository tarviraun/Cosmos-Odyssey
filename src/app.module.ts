import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricelistModule } from './pricelist/pricelist.module';

@Module({
  imports: [PricelistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
