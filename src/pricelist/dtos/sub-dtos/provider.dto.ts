import { ApiProperty } from '@nestjs/swagger';
import { DetailNameDto } from './detail-name.dto';

export class ProviderDto {
  @ApiProperty()
  providerId: string;

  @ApiProperty({ type: DetailNameDto })
  company: DetailNameDto;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: Date })
  flightStart: Date;

  @ApiProperty({ type: Date })
  flightEnd: Date;
}
