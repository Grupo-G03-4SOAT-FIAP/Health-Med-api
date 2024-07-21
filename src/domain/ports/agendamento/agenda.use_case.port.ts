import { Horarios } from '../../../adapters/inbound/rest/v1/presenters/agenda.dto';

export interface IAgendaUseCase {
  criarAgenda(horario: Horarios): Promise<Horarios>;
  buscarAgenda(medicoId: string): Promise<Horarios[]>;
  editarAgenda(id: string, horario: Horarios): Promise<void>;
  excluirAgenda(id: string): Promise<void>;
  reservarAgenda(id: string): Promise<void>;
  liberarAgenda(id: string): Promise<void>;
}

export const IAgendaUseCase = Symbol('IAgendaUseCase');
