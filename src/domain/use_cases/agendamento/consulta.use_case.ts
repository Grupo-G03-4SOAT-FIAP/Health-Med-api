import { Inject, Injectable } from '@nestjs/common';
import {
  AgendarConsultaDTO,
  ConsultaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { ConsultaNaoLocalizada } from 'src/domain/exceptions/consulta.exception';
import { IConsultaRepository } from 'src/domain/ports/agendamento/consulta.repository.port';
import { IConsultaUseCase } from 'src/domain/ports/agendamento/consulta.use_case.port';
import { StatusConsulta } from '../../../utils/statusConsulta.enum';

@Injectable()
export class ConsultaUseCase implements IConsultaUseCase {
  constructor(
    @Inject(IConsultaRepository)
    private readonly consultaRepository: IConsultaRepository,
  ) {}

  async agendarConsulta(
    agendarConsultaDTO: AgendarConsultaDTO,
  ): Promise<ConsultaDTO> {
    const { agendaId, nomePaciente, cpfPaciente, emailPaciente } =
      agendarConsultaDTO;

    // TODO: Gerar link do Google Meet
    const linkTeleconsulta = 'https://meet.google.com/xxx-yyyy-zzz';

    const entidadeConsulta = new ConsultaEntity(
      agendaId,
      nomePaciente,
      cpfPaciente,
      emailPaciente,
      linkTeleconsulta,
    );
    entidadeConsulta.statusConsultaAgendada();

    const consultaModel =
      await this.consultaRepository.criarConsulta(entidadeConsulta);

    const consultaDTO = new ConsultaDTO();
    consultaDTO.id = consultaModel.id;
    consultaDTO.agendaId = consultaModel.agendaId;
    consultaDTO.cpfPaciente = consultaModel.cpfPaciente;
    consultaDTO.nomePaciente = consultaModel.nomePaciente;
    consultaDTO.emailPaciente = consultaModel.emailPaciente;
    consultaDTO.linkTeleconsulta = consultaModel.linkTeleconsulta;
    consultaDTO.status = consultaModel.statusConsulta;

    return consultaDTO;
  }

  async buscarConsultaPorId(consultaId: string): Promise<ConsultaDTO> {
    const consultaModel =
      await this.consultaRepository.buscarConsultaPorId(consultaId);

    const consultaDTO = new ConsultaDTO();
    consultaDTO.id = consultaModel.id;
    consultaDTO.agendaId = consultaModel.agendaId;
    consultaDTO.cpfPaciente = consultaModel.cpfPaciente;
    consultaDTO.nomePaciente = consultaModel.nomePaciente;
    consultaDTO.emailPaciente = consultaModel.emailPaciente;
    consultaDTO.linkTeleconsulta = consultaModel.linkTeleconsulta;
    consultaDTO.status = consultaModel.statusConsulta;

    return consultaDTO;
  }

  async statusConsulta(
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
    consultaDTO.cpfPaciente = consultaModel.cpfPaciente;
    consultaDTO.nomePaciente = consultaModel.nomePaciente;
    consultaDTO.emailPaciente = consultaModel.emailPaciente;
    consultaDTO.linkTeleconsulta = consultaModel.linkTeleconsulta;
    consultaDTO.status = consultaModel.statusConsulta;

    return consultaDTO;
  }
}
