export interface ITravelPricelist {
  id: string;
  validUntil: string;
  legs: ITravelPricelistLeg[];
}

interface ITravelPricelistLeg {
  id: string;
  routeInfo: IRouteInfo;
  providers: IProvider[];
}

interface IDetailObject {
  id: string;
  name: string;
}

interface IRouteInfo {
  id: string;
  from: IDetailObject;
  to: IDetailObject;
  distance: number;
}
interface IProvider {
  id: string;
  company: IDetailObject;
  price: number;
  flightStart: string;
  flightEnd: string;
}
