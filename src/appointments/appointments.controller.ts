import {Controller, Get, Post, Body, Param, Delete, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../users/entities/user.entity";

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
      @Body() createAppointmentDto: CreateAppointmentDto,
      @GetUser() user: User
  ) {
    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
