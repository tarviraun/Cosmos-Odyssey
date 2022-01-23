import { HttpException, HttpService, Injectable, Logger } from '@nestjs/common';
import * as process from 'process';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { map } from 'rxjs/operators';
import { ITravelPricelist } from './interfaces/travel-pricelist.interface';

@Injectable()
export class TralvelPricesApiService {
  private readonly cosmosApi = process.env.COSMOS_API;
  private logger: Logger;

  constructor(private httpService: HttpService) {
    this.logger = new Logger(TralvelPricesApiService.name);
  }

  async fetchTravelPrices(): Promise<ITravelPricelist> {
    const url = `${this.cosmosApi}/TravelPrices`;
    const config: AxiosRequestConfig = {};

    try {
      return await this.httpService
        .get(url, config)
        .pipe(map((response) => response.data))
        .toPromise();
    } catch (err) {
      const error: AxiosError = err;

      this.logger.error('Could not fetch travel prices');
      throw new HttpException(
        `Could not fetch travel prices: ${error}`,
        error.response?.status,
      );
    }
  }
}
