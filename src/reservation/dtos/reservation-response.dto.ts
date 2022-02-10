import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Reservation } from '../schemas/reservation.schema';

export class ReservationResponseDto extends Reservation {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Transform(({ value }) => value.toString())
  pricelistId: string;

  constructor(partial: Partial<ReservationResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
