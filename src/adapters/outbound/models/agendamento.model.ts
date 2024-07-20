import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('horario')
export class AgendamentoModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctorId: string;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ default: false })
  isBooked: boolean;
}
