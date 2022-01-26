import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PriceListRoutesResponseDto } from '../dtos/pricelist-routes-response.dto';
import { SearchRoutesRequestDTO } from '../dtos/search-routes-request.dto';
import { PricelistService } from '../services/pricelist.service';

@Controller('pricelist')
@ApiTags('Travel pricelist (public)')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
  }),
)
@UseInterceptors(ClassSerializerInterceptor)
export class PricelistController {
  constructor(private pricelistService: PricelistService) {}

  @Get()
  @ApiOperation({ summary: 'Public travel pricelist' })
  @ApiOkResponse({ type: PriceListRoutesResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'INVALID TOKEN' })
  async searchRoutes(
    @Query() query: SearchRoutesRequestDTO,
  ): Promise<PriceListRoutesResponseDto[]> {
    return await this.pricelistService.searchRoutes(query);
  }
}
