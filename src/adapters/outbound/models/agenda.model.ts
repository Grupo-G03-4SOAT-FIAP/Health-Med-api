import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('agendas')
export class AgendaModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'medico_id', nullable: false })
  medicoId: string;

  @Column({ name: 'data', nullable: false })
  data: string;

  @Column({ name: 'hora_inicio', nullable: false })
  horaInicio: string;

  @Column({ name: 'hora_fim', nullable: false })
  horaFim: string;

  @Column({ name: 'reservado', nullable: false, default: false })
  reservado: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;

  @DeleteDateColumn({ name: 'excluido_em' })
  excluidoEm: string;
}
