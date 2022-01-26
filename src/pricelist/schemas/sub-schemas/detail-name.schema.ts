import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class DetailName {
  @ApiProperty()
  @Prop({ required: true })
  id: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;
}

export const DetailNameSchema = SchemaFactory.createForClass(DetailName);
