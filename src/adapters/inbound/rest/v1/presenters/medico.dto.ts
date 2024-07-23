import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class MedicoDTO {
  @ApiProperty({ description: 'Médico ID' })
  id: string;

  @ApiProperty({ description: 'Nome do médico' })
  nome: string;

  @ApiProperty({ description: 'CRM do Médico' })
  crm: string;

  @ApiProperty({ description: 'Especialidade Médica' })
  especialidade: string;

  @ApiProperty({ description: 'Numero Avaliação' })
  avaliacao: number;

  @ApiProperty({ description: 'Distancia' })
  distancia: number;

  @ApiProperty({ description: 'Valor da Consulta' })
  valorConsulta: number;
}

export class FiltrosMedicoDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  @ApiProperty({ description: 'Especialidade médica', required: false })
  especialidade?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    const parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  })
  @ApiProperty({ description: 'Distancia', required: false })
  distancia?: number; // km

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  })
  @ApiProperty({ description: 'Numero Avaliação', required: false })
  avaliacao?: number;
}
