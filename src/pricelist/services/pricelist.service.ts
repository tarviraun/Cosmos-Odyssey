import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EObjectStatus } from 'src/shared/enums/status.enum';
import { TravelPricesApiService } from 'src/shared/services/travel-prices-api/travel-prices-api.service';
import { pricelistLegProjection } from '../constants/projections.constants';
import { PriceListRoutesResponseDto } from '../dtos/pricelist-routes-response.dto';
import { SearchRoutesRequestDTO } from '../dtos/search-routes-request.dto';
import { ISearchRoutes } from '../interfaces/search-routes.interface';
import {
  PricelistLeg,
  PricelistLegDocument,
} from '../schemas/pricelist-leg.schema';
import { Pricelist, PricelistDocument } from '../schemas/pricelist.schema';
import { Provider } from '../schemas/sub-schemas/provider.schema';
import { Route } from '../schemas/sub-schemas/route.schema';

@Injectable()
export class PricelistService {
  private logger: Logger;

  constructor(
    @InjectModel(Pricelist.name)
    private readonly pricelistModel: Model<PricelistDocument>,
    @InjectModel(PricelistLeg.name)
    private readonly pricelistLegModel: Model<PricelistLegDocument>,
    private readonly travelPricesApiService: TravelPricesApiService,
  ) {
    this.logger = new Logger(PricelistService.name);
  }

  public async searchRoutes(
    query: SearchRoutesRequestDTO,
  ): Promise<PriceListRoutesResponseDto[]> {
    const { from, to } = query;
    let activePricelist: Pricelist;

    try {
      activePricelist = await this.pricelistModel
        .findOne({ validUntil: { $gt: new Date() } })
        .sort({ validUntil: 'descending' })
        .lean();

      if (!activePricelist?._id) {
        activePricelist = await this.fetchAndSavePricelist();
      }

      const filter: ISearchRoutes = {
        priceListId: activePricelist._id,
      };

      if (from) filter['route.from.name'] = from;
      if (to) filter['route.to.name'] = to;

      const routes = await this.pricelistLegModel
        .find(filter, pricelistLegProjection)
        .lean();

      console.log(routes);

      return routes.map((route) => new PriceListRoutesResponseDto(route));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async fetchAndSavePricelist(): Promise<Pricelist> {
    try {
      const pricelist = await this.travelPricesApiService.fetchTravelPrices();

      if (!pricelist) {
        this.logger.error(`Could not find travel price-list`);
        throw new BadRequestException(`Could not find travel price-list`);
      }

      const newPricelist = await this.pricelistModel.create({
        travelPriceListId: pricelist.id,
        validUntil: new Date(pricelist.validUntil),
        createdAt: new Date(),
        updatedAt: new Date(),
        objectStatus: EObjectStatus.CURRENT,
      });

      const insertLegs: PricelistLeg[] = [];
      for (const leg of pricelist.legs) {
        const {
          routeInfo,
          routeInfo: { to, from },
        } = leg;

        const pricelistLeg = new PricelistLeg();
        pricelistLeg.legId = leg.id;
        pricelistLeg.priceListId = newPricelist;
        pricelistLeg.createdAt = new Date();
        pricelistLeg.updatedAt = new Date();

        const route = new Route();
        route.routeId = routeInfo.id;
        route.distance = routeInfo.distance;
        route.from = { id: from.id, name: from.name };
        route.to = { id: to.id, name: to.name };
        pricelistLeg.route = route;

        const providers: Provider[] = [];
        for (const provider of leg.providers) {
          const { company } = provider;
          const newProvider = new Provider();
          newProvider.providerId = provider.id;
          newProvider.company = { id: company.id, name: company.name };
          newProvider.price = provider.price;
          newProvider.flightStart = new Date(provider.flightStart);
          newProvider.flightEnd = new Date(provider.flightEnd);

          providers.push(newProvider);
        }

        pricelistLeg.providers = providers;
        insertLegs.push(await this.pricelistLegModel.create(pricelistLeg));
      }

      await Promise.all(insertLegs);

      return await this.pricelistModel.findById(newPricelist._id).lean();
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  public async getPriceListById(id: string): Promise<Pricelist> {
    const pricelist = await this.pricelistModel
      .findOne({ validUntil: { $gt: new Date() } })
      .sort({ validUntil: 'descending' })
      .lean();

    if (!pricelist?._id) {
      this.logger.error(`Could not find pricelist ${id}`);
      throw new NotFoundException(`Could not find pricelist ${id}`);
    }

    return pricelist;
  }
}
