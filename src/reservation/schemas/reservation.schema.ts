import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EObjectStatus } from 'src/shared/enums/status.enum';
import {
  ReservationRoute,
  ReservationRoutesSchema,
} from './sub-schemas/reservation-routes.schema';

export type ReservationDocument = Reservation & Document;

@Schema({ collection: 'reservation', timestamps: true, versionKey: false })
export class Reservation {
  @ApiProperty()
  readonly _id?: string;

  @ApiProperty({ description: 'pricelist ID' })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'pricelist',
    required: true,
  })
  pricelistId: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({
    description: 'price-list ID',
    type: ReservationRoute,
    isArray: true,
  })
  @Prop({ type: [ReservationRoutesSchema] })
  routes: ReservationRoute[];

  @ApiProperty({ required: true })
  @Prop({ required: true })
  totalPrice: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  totalTravelTime: number;

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

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
