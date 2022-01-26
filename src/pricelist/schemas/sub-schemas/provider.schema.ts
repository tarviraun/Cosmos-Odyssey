import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { DetailName, DetailNameSchema } from './detail-name.schema';

@Schema({ _id: false })
export class Provider {
  @ApiProperty()
  @Prop({ required: true })
  providerId: string;

  @ApiProperty({ type: DetailName })
  @Prop({ type: DetailNameSchema, required: true })
  company: DetailName;

  @ApiProperty()
  @Prop({ required: true })
  price: number;

  @ApiProperty({ type: Date })
  @Prop({ type: Date, required: true })
  flightStart: Date;

  @ApiProperty({ type: Date })
  @Prop({ type: Date, required: true })
  flightEnd: Date;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
