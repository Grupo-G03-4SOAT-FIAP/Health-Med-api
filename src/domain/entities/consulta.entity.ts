import { StatusConsulta } from '../../utils/statusConsulta.enum';

export class ConsultaEntity {
  id?: string;
  agendaId: string;
  nomePaciente: string;
  cpfPaciente: string;
  emailPaciente: string;
  statusConsulta?: StatusConsulta;

  constructor(
    agendaId: string,
    nomePaciente: string,
    cpfPaciente: string,
    emailPaciente: string,
    statusConsulta?: StatusConsulta,
    id?: string,
  ) {
    this.id = id;
    this.agendaId = agendaId;
    this.nomePaciente = nomePaciente;
    this.cpfPaciente = cpfPaciente;
    this.emailPaciente = emailPaciente;
    this.statusConsulta = statusConsulta;
  }

  statusConsultaAgendada(): void {
    if (!this.statusConsulta) {
      this.statusConsulta = StatusConsulta.AGENDADA;
    }
  }
}
