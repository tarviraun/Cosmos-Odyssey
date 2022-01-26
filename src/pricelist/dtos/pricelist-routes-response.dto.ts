import { ApiProperty } from '@nestjs/swagger';
import { ProviderDto } from './sub-dtos/provider.dto';
import { RouteInfoDto } from './sub-dtos/route-info.dto';

export class PriceListRoutesResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty({ type: RouteInfoDto })
  route: RouteInfoDto;

  @ApiProperty({ type: ProviderDto, isArray: true })
  providers: ProviderDto[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
