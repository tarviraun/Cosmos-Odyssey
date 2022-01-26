import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPricesApiService } from 'src/shared/services/travel-prices-api/travel-prices-api.service';
import { PricelistController } from './controllers/pricelist.controller';
import { Pricelist, PricelistSchema } from './schemas/pricelist.schema';
import { PricelistService } from './services/pricelist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pricelist.name, schema: PricelistSchema },
    ]),
    HttpModule,
  ],
  controllers: [PricelistController],
  providers: [PricelistService, TravelPricesApiService],
})
export class PricelistModule {}
