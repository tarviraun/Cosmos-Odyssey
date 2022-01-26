import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EObjectStatus } from 'src/shared/enums/status.enum';
import { PricelistLeg } from './pricelist-leg.schema';

export type PricelistDocument = Pricelist & Document;

@Schema({ collection: 'pricelist', timestamps: true, versionKey: false })
export class Pricelist {
  @ApiProperty()
  readonly _id?: string;

  @ApiProperty({ description: 'Origin travel pricelist ID' })
  travelPriceListId: string;

  @ApiProperty({ description: 'pricelist ID' })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'pricelistLeg',
  })
  legs: PricelistLeg[];

  @ApiProperty()
  @Prop({ type: Date, required: true })
  validUntil: Date;

  @ApiPropertyOptional()
  @Prop({ required: true })
  createdAt: Date;

  @ApiPropertyOptional()
  @Prop({ required: true })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ required: true, index: true })
  objectStatus: EObjectStatus;
}

export const PricelistSchema = SchemaFactory.createForClass(Pricelist);
