import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';
import { ConsultaDTO, AgendarConsultaDTO } from '../../presenters/consulta.dto';
<<<<<<< HEAD
import { StatusConsulta } from 'src/utils/stautsConsulta.enum';
import { ConsultaStatusInvalido } from 'src/domain/exceptions/consulta.exception';
=======
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';
>>>>>>> origin/main

@Controller('consulta')
export class ConsultaController {
  constructor(
    @Inject(IConsultaUseCase)
    private readonly consultaUseCase: IConsultaUseCase,
  ) {}

  @Post()
  @Authorization(['pacientes'])
  async criar(
    @CognitoUser('username') username: string,
    @CognitoUser('name') name: string,
    @CognitoUser('email') email: string,
    @Body() agendaId,
  ): Promise<ConsultaDTO> {
    const consulta = new AgendarConsultaDTO();
    consulta.agendaId = agendaId;
    consulta.cpfPaciente = username;
    consulta.nomePaciente = name;
    consulta.emailPaciente = email;
    return await this.consultaUseCase.agendarConsulta(consulta);
  }

  @Get(':id')
  buscar(@Param('id') id: string): Promise<ConsultaDTO> {
    return this.consultaUseCase.buscarConsultaPorId(id);
  }

  @Put('/status/:id')
  async cancelar(
    @Param('id') id: string,
    @Query('status') status: StatusConsulta,
  ): Promise<ConsultaDTO> {
    if (!Object.values(StatusConsulta).includes(status as StatusConsulta)) {
      throw new ConsultaStatusInvalido('Status inválido');
    }
    return await this.consultaUseCase.stautsConsulta(id, status);
  }
}
