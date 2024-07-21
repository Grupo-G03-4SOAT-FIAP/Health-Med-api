import { Inject, Injectable } from '@nestjs/common';
import {
  AgendarConsultaDTO,
  ConsultaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { ConsultaNaoLocalizada } from 'src/domain/exceptions/consulta.exception';
import { IConsultaRepository } from 'src/domain/ports/agendamento/consulta.repository.port';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';
import { StatusConsulta } from 'src/utils/stautsConsulta.enum';

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

  async buscarConsultaPorId(consultaId: string): Promise<ConsultaDTO> {
    const consultaModel =
      await this.consultaRepository.buscarConsultaPorId(consultaId);

    const consultaDTO = new ConsultaDTO();
    consultaDTO.id = consultaModel.id;
    consultaDTO.agendaId = consultaModel.agendaId;
    consultaDTO.nomePaciente = consultaModel.nomePaciente;
    consultaDTO.cpfPaciente = consultaModel.cpfPaciente;
    consultaDTO.emailPaciente = consultaModel.emailPaciente;
    consultaDTO.status = consultaModel.statusConsulta;

    return consultaDTO;
  }

  async stautsConsulta(
    consultaId: string,
    status: StatusConsulta,
  ): Promise<ConsultaDTO> {
    const consulta =
      await this.consultaRepository.buscarConsultaPorId(consultaId);
    if (!consulta) {
      throw new ConsultaNaoLocalizada('Consulta não localizado');
    }
    const consultaModel = await this.consultaRepository.statusConsulta(
      consultaId,
      status,
    );

    const consultaDTO = new ConsultaDTO();
    consultaDTO.id = consultaModel.id;
    consultaDTO.agendaId = consultaModel.agendaId;
    consultaDTO.nomePaciente = consultaModel.nomePaciente;
    consultaDTO.cpfPaciente = consultaModel.cpfPaciente;
    consultaDTO.emailPaciente = consultaModel.emailPaciente;
    consultaDTO.status = consultaModel.statusConsulta;

    return consultaDTO;
  }
}
