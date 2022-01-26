import { ApiProperty } from '@nestjs/swagger';
import { ProviderDto } from './sub-dtos/provider.dto';
import { RouteInfoDto } from './sub-dtos/route-info.dto';

export class PriceListRoutesResponseDto {
  @ApiProperty()
  legId: string;

  @ApiProperty({ type: RouteInfoDto })
  route: RouteInfoDto;

  @ApiProperty({ type: ProviderDto, isArray: true })
  providers: ProviderDto[];

  constructor(partial: Partial<PriceListRoutesResponseDto>) {
    Object.assign(this, partial);
  }
}
