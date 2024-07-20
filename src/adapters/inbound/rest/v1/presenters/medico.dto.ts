import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class MedicoDTO {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  avaliacao: number;
  distancia: number;
}

export class FiltrosMedicoDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  especialidade?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? value : parsed;
  })
  distancia?: number; // km

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? value : parsed;
  })
  avaliacao?: number;
}
