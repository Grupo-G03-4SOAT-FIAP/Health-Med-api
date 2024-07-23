import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusConsulta } from '../../../../../utils/statusConsulta.enum';

export class AgendarConsultaDTO {
  @IsString()
  @ApiProperty({ description: 'ID da Agenda' })
  agendaId: string;

  @IsString()
  @ApiProperty({ description: 'CPF do paciente' })
  cpfPaciente: string;

  @IsString()
  @ApiProperty({ description: 'Nome do paciente' })
  nomePaciente: string;

  @IsString()
  @ApiProperty({ description: 'Email do paciente' })
  emailPaciente: string;
}

export class ConsultaDTO {
  @ApiProperty({ description: 'ID da Consulta' })
  id: string;

  @ApiProperty({ description: 'ID da agenda' })
  agendaId: string;

  @ApiProperty({ description: 'CPF do paciente' })
  cpfPaciente: string;

  @ApiProperty({ description: 'Nome do paciente' })
  nomePaciente: string;

  @ApiProperty({ description: 'Email do paciente' })
  emailPaciente: string;

  @ApiProperty({ description: 'Link para a teleconsulta' })
  linkTeleconsulta: string;

  @ApiProperty({ description: 'Status da consulta' })
  status: StatusConsulta;
}
