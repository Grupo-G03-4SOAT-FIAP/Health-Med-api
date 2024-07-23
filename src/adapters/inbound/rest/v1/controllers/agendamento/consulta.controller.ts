import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  HttpCode,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';
import { ConsultaDTO, AgendarConsultaDTO } from '../../presenters/consulta.dto';
import { StatusConsulta } from 'src/utils/statusConsulta.enum';
import { ConsultaStatusInvalido } from 'src/domain/exceptions/consulta.exception';
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';
import { BadRequestError } from '../../helpers/swagger/status-codes/bad_requests.swagger';
import { ConflictError } from '../../helpers/swagger/status-codes/conflict.swagger';
import { NotFoundError } from '../../helpers/swagger/status-codes/not_found.swagger';

@Controller('consulta')
@ApiTags('Consulta')
export class ConsultaController {
  constructor(
    @Inject(IConsultaUseCase)
    private readonly consultaUseCase: IConsultaUseCase,
  ) {}

  @Post()
  @Authorization(['pacientes'])
  @HttpCode(201)
  @ApiOperation({ summary: 'Adicionar uma nova Consulta' })
  @ApiResponse({
    status: 201,
    description: 'Consulta criada com sucesso',
    type: ConsultaDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestError,
  })
  @ApiResponse({
    status: 409,
    description: 'Existe uma Consulta com esse dado',
    type: ConflictError,
  })
  async criar(
    @CognitoUser('username') username: string,
    @CognitoUser('name') name: string,
    @CognitoUser('email') email: string,
    @Body() agendaId: string,
  ): Promise<ConsultaDTO> {
    const agendarConsultaDTO = new AgendarConsultaDTO();
    agendarConsultaDTO.agendaId = agendaId;
    agendarConsultaDTO.cpfPaciente = username;
    agendarConsultaDTO.nomePaciente = name;
    agendarConsultaDTO.emailPaciente = email;
    return await this.consultaUseCase.agendarConsulta(agendarConsultaDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar a consulta pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Consulta retornada com sucesso',
    type: ConsultaDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta informado não existe',
    type: NotFoundError,
  })
  buscar(@Param('id') id: string): Promise<ConsultaDTO> {
    return this.consultaUseCase.buscarConsultaPorId(id);
  }

  @Put('/status/:id')
  @ApiOperation({ summary: 'Cancelar uma Consulta' })
  @ApiResponse({
    status: 200,
    description: 'Consulta cancelada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta informada não existe',
    type: NotFoundError,
  })
  async cancelar(
    @Param('id') id: string,
    @Query('status') status: StatusConsulta,
  ): Promise<ConsultaDTO> {
    if (!Object.values(StatusConsulta).includes(status as StatusConsulta)) {
      throw new ConsultaStatusInvalido('Status inválido');
    }
    return await this.consultaUseCase.statusConsulta(id, status);
  }
}
