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
import { Horarios } from '../../presenters/agenda.dto';
import { IAgendaUseCase } from 'src/domain/ports/agendamento/agenda.use_case.port';

@Controller('agenda')
export class AgendaController {
  constructor(
    @Inject(IAgendaUseCase)
    private readonly agendaUseCase: IAgendaUseCase,
  ) {}

  @Post()
  async criar(@Body() horario: any): Promise<any> {
    try {
      return await this.agendaUseCase.criarAgenda(horario);;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/medico/:id')
  buscar(@Param('id') id: string): Promise<Horarios[]> {
    return this.agendaUseCase.buscarAgenda(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() horario: Horarios): Promise<void> {
    return this.agendaUseCase.editarAgenda(id, horario);
  }

  @Delete(':id')
  remover(@Param('id') id: string): Promise<void> {
    return this.agendaUseCase.excluirAgenda(id);
  }

  @Patch('/book/:id')
  reservar(@Param('id') id: string): Promise<void> {
    return this.agendaUseCase.reservarAgenda(id);
  }

  @Patch('/free/:id')
  liberar(@Param('id') id: string): Promise<void> {
    return this.agendaUseCase.liberarAgenda(id);
  }
}
