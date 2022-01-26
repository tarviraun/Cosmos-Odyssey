import { ApiProperty } from '@nestjs/swagger';
import { DetailNameDto } from './detail-name.dto';

export class RouteInfoDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: DetailNameDto })
  from: DetailNameDto;

  @ApiProperty({ type: DetailNameDto })
  to: DetailNameDto;

  @ApiProperty()
  distance: number;
}
