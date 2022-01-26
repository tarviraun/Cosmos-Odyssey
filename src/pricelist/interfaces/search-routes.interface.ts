import { Eplanet } from 'src/shared/enums/planet.enum';

export interface ISearchRoutes {
  priceListId: string;
  from?: Eplanet;
  to?: Eplanet;
}
