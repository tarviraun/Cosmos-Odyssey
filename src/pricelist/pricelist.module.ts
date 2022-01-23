import { HttpModule, Module } from '@nestjs/common';
import { TralvelPricesApiService } from 'src/shared/services/travel-prices-api/travel-prices-api.service';
import { PricelistController } from './controllers/pricelist.controller';
import { PricelistService } from './services/pricelist.service';

@Module({
  imports: [HttpModule],
  controllers: [PricelistController],
  providers: [PricelistService, TralvelPricesApiService],
})
export class PricelistModule {}
