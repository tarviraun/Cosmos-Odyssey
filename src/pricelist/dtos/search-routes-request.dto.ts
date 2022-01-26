import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Eplanet } from 'src/shared/enums/planet.enum';

export class SearchRoutesRequestDTO {
  @ApiProperty({ enum: Eplanet })
  @IsOptional()
  @IsEnum(Eplanet)
  from?: Eplanet;

  @ApiProperty({ enum: Eplanet })
  @IsOptional()
  @IsEnum(Eplanet)
  to?: Eplanet;
}
