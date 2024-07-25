import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgendarHorario, Horarios } from '../../presenters/agenda.dto';
import { IAgendaUseCase } from 'src/domain/ports/agendamento/agenda.use_case.port';
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';
import { BadRequestError } from '../../helpers/swagger/status-codes/bad_requests.swagger';
import { ConflictError } from '../../helpers/swagger/status-codes/conflict.swagger';
import { NotFoundError } from '../../helpers/swagger/status-codes/not_found.swagger';

@Controller('agenda')
@ApiTags('Agenda')
export class AgendaController {
  constructor(
    @Inject(IAgendaUseCase)
    private readonly agendaUseCase: IAgendaUseCase,
  ) {}

  @Post()
  @Authorization(['medicos'])
  @HttpCode(201)
  @ApiOperation({ summary: 'Adicionar uma nova agenda' })
  @ApiResponse({
    status: 201,
    description: 'Agenda criada com sucesso',
    type: Horarios,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestError,
  })
  @ApiResponse({
    status: 409,
    description: 'Horário já está ocupado no mesmo dia para este médico',
    type: ConflictError,
  })
  async criar(
    @CognitoUser('custom:id') customId: string,
    @Body() horario: AgendarHorario,
  ): Promise<any> {
    try {
      horario.medicoId = customId;
      return await this.agendaUseCase.criarAgenda(horario);
    } catch (error) {
      if (error) {
        throw error;
      }
    }
  }

  @Get('/medico/:id')
  @ApiOperation({ summary: 'Buscar a agenda de um Medico pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Agenda retornado com sucesso',
    type: Horarios,
  })
  @ApiResponse({
    status: 404,
    description: 'Medico informado não existe',
    type: NotFoundError,
  })
  buscar(@Param('id') id: string): Promise<Horarios[]> {
    return this.agendaUseCase.buscarAgenda(id);
  }

  @Put(':id')
  @Authorization(['medicos'])
  @ApiOperation({ summary: 'Atualizar uma Agenda' })
  @ApiResponse({
    status: 200,
    description: 'Agenda atualizada com sucesso',
    type: Horarios,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestError,
  })
  @ApiResponse({
    status: 404,
    description: 'Agenda informada não existe',
    type: NotFoundError,
  })
  @ApiResponse({
    status: 409,
    description: 'Existe uma Agenda com esse dado',
    type: ConflictError,
  })
  atualizar(
    @CognitoUser('custom:id') customId: string,
    @Param('id') id: string,
    @Body() horario: any,
  ): Promise<void> {
    horario.medicoId = customId;
    return this.agendaUseCase.editarAgenda(id, horario);
  }

  @Delete(':id')
  @Authorization(['medicos'])
  @ApiOperation({ summary: 'Remover uma Agenda' })
  @ApiResponse({
    status: 200,
    description: 'Agenda excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Agenda informada não existe',
    type: NotFoundError,
  })
  remover(@Param('id') id: string): Promise<void> {
    return this.agendaUseCase.excluirAgenda(id);
  }

  @Patch('/book/:id')
  @ApiOperation({ summary: 'Reservar horário na agenda de um Medico pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Reserva realizada com sucesso',
    type: Horarios,
  })
  @ApiResponse({
    status: 404,
    description: 'Id informado não existe',
    type: NotFoundError,
  })
  reservar(@Param('id') id: string): Promise<void> {
    return this.agendaUseCase.reservarAgenda(id);
  }

  @Patch('/free/:id')
  @ApiOperation({ summary: 'Liberar horário na agenda de um Medico pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Liberação do horário realizada com sucesso',
    type: Horarios,
  })
  @ApiResponse({
    status: 404,
    description: 'Id informado não existe',
    type: NotFoundError,
  })
  liberar(@Param('id') id: string): Promise<void> {
    return this.agendaUseCase.liberarAgenda(id);
  }
}
