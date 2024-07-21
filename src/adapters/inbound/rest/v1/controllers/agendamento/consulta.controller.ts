import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';
import { ConsultaDTO, AgendarConsultaDTO } from '../../presenters/consulta.dto';
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';

@Controller('consulta')
export class ConsultaController {
  constructor(
    @Inject(IConsultaUseCase)
    private readonly consultaUseCase: IConsultaUseCase,
  ) { }

  @Post()
  @Authorization(["pacientes"])
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
}
