import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { RouteSchema, Route } from './route.schema';

@Schema({ _id: false })
export class Leg {
  @ApiProperty()
  @Prop({ required: true })
  id: string;

  @ApiProperty({ type: Route })
  @Prop({ type: RouteSchema, required: true })
  route: Route;
}

export const LegSchema = SchemaFactory.createForClass(Leg);
