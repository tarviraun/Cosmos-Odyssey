import { ApiProperty } from '@nestjs/swagger';
import { DetailNameDto } from './detail-name.dto';

export class ProviderDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: DetailNameDto })
  company: DetailNameDto;

  @ApiProperty()
  price: number;

  @ApiProperty()
  flightStart: string;

  @ApiProperty()
  flightEnd: string;
}
