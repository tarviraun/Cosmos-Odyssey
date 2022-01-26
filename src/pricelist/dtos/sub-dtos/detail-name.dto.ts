import { ApiProperty } from '@nestjs/swagger';

export class DetailNameDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
