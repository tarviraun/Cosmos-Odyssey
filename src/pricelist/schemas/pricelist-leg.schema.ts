import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Provider, ProviderSchema } from './sub-schemas/provider.schema';
import { RouteSchema, Route } from './sub-schemas/route.schema';
import { Pricelist } from './pricelist.schema';

export type PricelistLegDocument = PricelistLeg & Document;

@Schema({ collection: 'pricelistLeg', timestamps: true, versionKey: false })
export class PricelistLeg {
  @ApiProperty()
  readonly _id?: string;

  @ApiProperty()
  @Prop({ required: true })
  legId: string;

  @ApiProperty({ description: 'pricelist ID' })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Pricelist.name,
    index: true,
  })
  priceListId: Pricelist;

  @ApiProperty({ type: Route })
  @Prop({ type: RouteSchema, required: true })
  route: Route;

  @ApiProperty({ type: Provider, isArray: true })
  @Prop({ type: [ProviderSchema], required: true })
  providers: Provider[];

  @ApiProperty()
  @Prop({ required: true })
  createdAt: Date;

  @ApiProperty()
  @Prop({ required: true })
  updatedAt: Date;
}

export const PricelistLegSchema = SchemaFactory.createForClass(PricelistLeg);
