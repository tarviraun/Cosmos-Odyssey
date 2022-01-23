import { Module } from '@nestjs/common';
import { PricelistController } from './controllers/pricelist.controller';
import { PricelistService } from './services/pricelist.service';

@Module({
  controllers: [PricelistController],
  providers: [PricelistService],
})
export class PricelistModule {}
