import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';
import { ConsultaDTO, AgendarConsultaDTO } from '../../presenters/consulta.dto';

@Controller('consulta')
export class ConsultaController {
  constructor(
    @Inject(IConsultaUseCase)
    private readonly consultaUseCase: IConsultaUseCase,
  ) {}

  @Post()
  async criar(@Body() consulta: AgendarConsultaDTO): Promise<ConsultaDTO> {
    return await this.consultaUseCase.agendarConsulta(consulta);
  }
}
