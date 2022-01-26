import { ApiProperty } from '@nestjs/swagger';
import { ProviderDto } from './sub-dtos/provider.dto';
import { RouteInfoDto } from './sub-dtos/route-info.dto';

export class PriceListRoutesResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: RouteInfoDto })
  routeInfo: RouteInfoDto;

  @ApiProperty({ type: ProviderDto, isArray: true })
  providers: ProviderDto[];
}
