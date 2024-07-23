import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Horarios {
  @IsString()
  @ApiProperty({ description: 'Horario ID' })
  id?: string;

  @IsString()
  @ApiProperty({ description: 'Medico ID' })
  medicoId?: string;

  @IsString()
  @ApiProperty({ description: 'Data' })
  data?: string;

  @IsString()
  @ApiProperty({ description: 'Horario Inicial' })
  horaInicio?: string;

  @IsString()
  @ApiProperty({ description: 'Horario final' })
  horaFim?: string;

  @ApiProperty({ description: 'Status do horario' })
  reservado?: boolean;
}

export class AgendarHorario {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Medico ID' })
  medicoId?: string;

  @IsString()
  @ApiProperty({ description: 'Data' })
  data?: string;

  @IsString()
  @ApiProperty({ description: 'Horario Inicial' })
  horaInicio?: string;

  @IsString()
  @ApiProperty({ description: 'Horario final' })
  horaFim?: string;
}
