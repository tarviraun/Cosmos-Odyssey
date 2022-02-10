import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ReservationRoutesRequestDto } from './sub-dtos/reservation-routes-request.dto';
import { Type } from 'class-transformer';

export class ReservationRequestDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  pricelistId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: ReservationRoutesRequestDto })
  @ValidateNested({ each: true })
  @Type(() => ReservationRoutesRequestDto)
  @IsArray()
  routes: ReservationRoutesRequestDto[];
}
