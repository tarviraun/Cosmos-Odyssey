import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../schemas/reservation.schema';
import { ReservationRequestDto } from '../dtos/reservation-request.dto';
import {ReservationResponseDto} from "../dtos/reservation-response.dto";

@Controller('reservation')
@ApiTags('Travel reservation (public)')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
  }),
)
@UseInterceptors(ClassSerializerInterceptor)
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Make reservation' })
  @ApiCreatedResponse({ type: ReservationResponseDto })
  @ApiUnauthorizedResponse({ description: 'INVALID TOKEN' })
  async makeReservation(
    @Body() body: ReservationRequestDto,
  ): Promise<ReservationResponseDto> {
    return await this.reservationService.makeReservation(body);
  }
}
