import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReservationRoutesRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  legId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  providerId: string;
}
