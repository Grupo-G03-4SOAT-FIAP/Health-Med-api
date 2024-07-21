import { IsString } from 'class-validator';
import { StatusConsulta } from 'src/utils/stautsConsulta.enum';

export class AgendarConsultaDTO {
  @IsString()
  agendaId: string;

  @IsString()
  nomePaciente: string;

  @IsString()
  cpfPaciente: string;

  @IsString()
  emailPaciente: string;
}

export class ConsultaDTO {
  id: string;
  agendaId: string;
  nomePaciente: string;
  cpfPaciente: string;
  emailPaciente: string;
  status: StatusConsulta;
}
