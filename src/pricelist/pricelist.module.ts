import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPricesApiService } from 'src/shared/services/travel-prices-api/travel-prices-api.service';
import { PricelistController } from './controllers/pricelist.controller';
import {
  PricelistLeg,
  PricelistLegSchema,
} from './schemas/pricelist-leg.schema';
import { Pricelist, PricelistSchema } from './schemas/pricelist.schema';
import { PricelistService } from './services/pricelist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pricelist.name, schema: PricelistSchema },
      { name: PricelistLeg.name, schema: PricelistLegSchema },
    ]),
    HttpModule,
  ],
  controllers: [PricelistController],
  providers: [PricelistService, TravelPricesApiService],
})
export class PricelistModule {}
