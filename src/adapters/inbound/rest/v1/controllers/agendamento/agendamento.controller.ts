import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Horarios } from '../../presenters/agendamento';
import { IAgendamentoUseCase } from 'src/domain/ports/agendamento/agendamento.use_case.port';
import { Authentication, CognitoUser } from '@nestjs-cognito/auth';

@Controller('agendamento')
export class AgendamentoController {
  constructor(
    @Inject(IAgendamentoUseCase)
    private readonly agendamentoUseCase: IAgendamentoUseCase,
  ) {}

  @Authentication()
  @Post()
  async create(
    @CognitoUser('medicoID') medicoID: string,
    @Body() horario: any,
  ): Promise<any> {
    console.log(horario);
    try {
      const novoHorario = await this.agendamentoUseCase.create(horario);
      return novoHorario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/doctor/:doctorId')
  findByDoctorId(@Param('doctorId') doctorId: string): Promise<Horarios[]> {
    return this.agendamentoUseCase.findByDoctorId(doctorId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() horario: Horarios): Promise<void> {
    return this.agendamentoUseCase.update(id, horario);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.agendamentoUseCase.remove(id);
  }

  @Patch(':id/book')
  markAsBooked(@Param('id') id: string): Promise<void> {
    return this.agendamentoUseCase.markAsBooked(id);
  }

  @Patch(':id/free')
  markAsFree(@Param('id') id: string): Promise<void> {
    return this.agendamentoUseCase.markAsFree(id);
  }
}
