import { StatusConsulta } from 'src/utils/stautsConsulta.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('consultas')
export class ConsultaModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agenda_id', nullable: false })
  agendaId: string;

  @Column({ name: 'nome_paciente', length: 100, nullable: false })
  nomePaciente: string;

  @Column({ name: 'cpf_paciente', nullable: false })
  cpfPaciente: string;

  @Column({ name: 'email_paciente', nullable: false })
  emailPaciente: string;

  @Column({ name: 'status_consulta', nullable: false })
  statusConsulta: StatusConsulta;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;
}
