import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medicos')
export class MedicoModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'crm', length: 20, nullable: false, unique: true })
  crm: string;

  @Column({ name: 'especialidade', length: 100, nullable: false })
  especialidade: string;

  @Column({ name: 'avaliacao', nullable: false })
  avaliacao: number;

  @Column({ name: 'distancia', nullable: false })
  distancia: number;

  @Column({ name: 'disponibilidade', nullable: false, default: true })
  disponibilidade: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;

  @DeleteDateColumn({ name: 'excluido_em' })
  excluidoEm: string;
}
