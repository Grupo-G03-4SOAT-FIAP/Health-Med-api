import { AgendamentoModel } from 'src/adapters/outbound/models/agendamento.model';
import { Horarios } from './../../../adapters/inbound/rest/v1/presenters/agendamento';

export interface IAgendamentoRepository {
  create(horario: Horarios): Promise<AgendamentoModel>;
  findByDoctorId(doctorId: string): Promise<AgendamentoModel[]>;
  update(id: string, horario: Horarios): Promise<void>;
  remove(id: string): Promise<void>;
  markAsBooked(id: string, {}): Promise<void>;
  markAsFree(id: string, {}): Promise<void>;
}

export const IAgendamentoRepository = Symbol('IAgendamentoRepository');
