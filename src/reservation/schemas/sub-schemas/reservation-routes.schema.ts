import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  Provider,
  ProviderSchema,
} from '../../../pricelist/schemas/sub-schemas/provider.schema';
import {
  Route,
  RouteSchema,
} from '../../../pricelist/schemas/sub-schemas/route.schema';

@Schema({ _id: false })
export class ReservationRoute {
  @ApiProperty({ type: Provider })
  @Prop({ required: true, type: ProviderSchema })
  provider: Provider;

  @ApiProperty({ type: Route, isArray: true })
  @Prop({ type: RouteSchema, required: true })
  route: Route;
}

export const ReservationRoutesSchema =
  SchemaFactory.createForClass(ReservationRoute);
