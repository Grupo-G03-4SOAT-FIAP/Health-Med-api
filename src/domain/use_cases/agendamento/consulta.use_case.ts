import { Inject, Injectable } from '@nestjs/common';
import {
  AgendarConsultaDTO,
  ConsultaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { IConsultaRepository } from 'src/domain/ports/agendamento/consulta.repository.port';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';

@Injectable()
export class ConsultaUseCase implements IConsultaUseCase {
  constructor(
    @Inject(IConsultaRepository)
    private readonly consultaRepository: IConsultaRepository,
  ) {}

  async agendarConsulta(consulta: AgendarConsultaDTO): Promise<ConsultaDTO> {
    const { agendaId, nomePaciente, cpfPaciente, emailPaciente } = consulta;
    const entidadeConsulta = new ConsultaEntity(
      agendaId,
      nomePaciente,
      cpfPaciente,
      emailPaciente,
    );
    entidadeConsulta.statusConsultaAgendada();

    const consultaModel =
      await this.consultaRepository.criarConsulta(entidadeConsulta);

    const consultaDTO = new ConsultaDTO();
    consultaDTO.id = consultaModel.id;
    consultaDTO.agendaId = consultaModel.agendaId;
    consultaDTO.nomePaciente = consultaModel.nomePaciente;
    consultaDTO.cpfPaciente = consultaModel.cpfPaciente;
    consultaDTO.emailPaciente = consultaModel.emailPaciente;

    return consultaDTO;
  }
}
