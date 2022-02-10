import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from '../schemas/reservation.schema';
import { ReservationRequestDto } from '../dtos/reservation-request.dto';
import { ReservationRoute } from '../schemas/sub-schemas/reservation-routes.schema';
import { pricelistLegProjection } from '../../pricelist/constants/projections.constants';
import {
  PricelistLeg,
  PricelistLegDocument,
} from '../../pricelist/schemas/pricelist-leg.schema';
import { EObjectStatus } from '../../shared/enums/status.enum';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { PricelistService } from '../../pricelist/services/pricelist.service';

@Injectable()
export class ReservationService {
  private logger: Logger;

  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
    @InjectModel(PricelistLeg.name)
    private readonly pricelistLegModel: Model<PricelistLegDocument>,
    private readonly pricelistService: PricelistService,
  ) {
    this.logger = new Logger(ReservationService.name);
  }

  public async makeReservation(
    body: ReservationRequestDto,
  ): Promise<ReservationResponseDto> {
    const { pricelistId, routes } = body;
    const routesToInsert: ReservationRoute[] = [];
    let totalPrice = 0;
    let totalTravelTime = 0;

    if (routes.length === 0) {
      this.logger.error(`routes cannot be empty`);
      throw new BadRequestException(`routes cannot be empty`);
    }

    const pricelist = await this.pricelistService.getPriceListById(pricelistId);

    await Promise.all(
      routes.map(async (route) => {
        const { legId, providerId } = route;

        const leg = await this.pricelistLegModel
          .findOne({ legId }, pricelistLegProjection)
          .lean();

        if (!leg) {
          this.logger.error(`Could not find leg ${legId}`);
          throw new NotFoundException(`Could not find leg ${legId}`);
        }

        const provider = leg.providers.find(
          (provider) => providerId === provider.providerId,
        );

        if (!provider) {
          this.logger.error(`Could not find provider ${providerId}`);
          throw new NotFoundException(`Could not find provider ${providerId}`);
        }

        totalPrice += provider.price;
        totalTravelTime += leg.route.distance;

        routesToInsert.push({
          provider,
          route: leg.route,
        });
      }),
    );

    const reservation = await this.reservationModel.create({
      ...body,
      routes: routesToInsert,
      totalPrice,
      totalTravelTime,
      createdAt: new Date(),
      updatedAt: new Date(),
      objectStatus: EObjectStatus.CURRENT,
    });

    const createdReservation = await this.reservationModel.findById(reservation._id).lean();
    return new ReservationResponseDto(createdReservation);
  }
}
