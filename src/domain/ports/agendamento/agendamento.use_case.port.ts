import { Horarios } from '../../../adapters/inbound/rest/v1/presenters/agendamento';

export interface IAgendamentoUseCase {
  create(horario: Horarios): Promise<Horarios>;
  findByDoctorId(doctorId: string): Promise<Horarios[]>;
  update(id: string, horario: Horarios): Promise<void>;
  remove(id: string): Promise<void>;
  markAsBooked(id: string): Promise<void>;
  markAsFree(id: string): Promise<void>;
}

export const IAgendamentoUseCase = Symbol('IAgendamentoUseCase');
