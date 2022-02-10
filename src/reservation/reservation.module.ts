import {HttpModule, Module} from '@nestjs/common';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationService } from './services/reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import {
  PricelistLeg,
  PricelistLegSchema,
} from '../pricelist/schemas/pricelist-leg.schema';
import { PricelistService } from '../pricelist/services/pricelist.service';
import {
  Pricelist,
  PricelistSchema,
} from '../pricelist/schemas/pricelist.schema';
import { TravelPricesApiService } from '../shared/services/travel-prices-api/travel-prices-api.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: Pricelist.name, schema: PricelistSchema },
      { name: PricelistLeg.name, schema: PricelistLegSchema },
    ]),
    HttpModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, PricelistService, TravelPricesApiService],
})
export class ReservationModule {}
