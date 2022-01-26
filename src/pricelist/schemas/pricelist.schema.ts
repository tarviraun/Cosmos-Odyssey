import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EObjectStatus } from 'src/shared/enums/status.enum';
import { Leg, LegSchema } from './sub-schemas/leg.schema';

export type PricelistDocument = Pricelist & Document;

@Schema({ collection: 'pricelist', timestamps: true, versionKey: false })
export class Pricelist {
  @ApiProperty()
  readonly _id?: string;

  @ApiProperty({ description: 'pricelist ID' })
  priceListId: string;

  @ApiProperty()
  @Prop({ required: true })
  validUntil: Date;

  @ApiProperty({ type: Leg })
  @Prop({ type: LegSchema, required: true, array: true })
  legs: Leg[];

  @ApiProperty()
  @Prop({ required: true })
  createdBy: string;

  @ApiProperty()
  @Prop({ required: true })
  updatedBy: string;

  @ApiPropertyOptional()
  @Prop({ required: true })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ required: true, index: true })
  objectStatus: EObjectStatus;
}

export const PricelistSchema = SchemaFactory.createForClass(Pricelist);
