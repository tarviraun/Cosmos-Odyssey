import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { DetailName, DetailNameSchema } from './detail-name.schema';

@Schema({ _id: false })
export class Route {
  @ApiProperty()
  @Prop({ required: true })
  routeId: string;

  @ApiProperty({ type: DetailName })
  @Prop({ type: DetailNameSchema, required: true })
  from: DetailName;

  @ApiProperty({ type: DetailName })
  @Prop({ type: DetailNameSchema, required: true })
  to: DetailName;

  @ApiProperty()
  @Prop({ required: true })
  distance: number;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
