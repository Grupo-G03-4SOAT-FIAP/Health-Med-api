import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusConsulta } from '../../../../../utils/statusConsulta.enum';

export class AgendarConsultaDTO {
  @IsString()
  @ApiProperty({ description: 'Agenda ID' })
  agendaId: string;

  @IsString()
  @ApiProperty({ description: 'Nome do paciente' })
  nomePaciente: string;

  @IsString()
  @ApiProperty({ description: 'CPF do paciente' })
  cpfPaciente: string;

  @IsString()
  @ApiProperty({ description: 'Email do paciente' })
  emailPaciente: string;
}

export class ConsultaDTO {
  @ApiProperty({ description: 'Consulta ID' })
  id: string;

  @ApiProperty({ description: 'Agenda ID' })
  agendaId: string;

  @ApiProperty({ description: 'Nome do paciente' })
  nomePaciente: string;

  @ApiProperty({ description: 'CPF do paciente' })
  cpfPaciente: string;

  @ApiProperty({ description: 'Email do paciente' })
  emailPaciente: string;

  @ApiProperty({ description: 'Status consulta' })
  status: StatusConsulta;
}
