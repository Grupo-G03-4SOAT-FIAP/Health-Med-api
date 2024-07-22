import { AgendaModel } from '../../../adapters/outbound/models/agenda.model';
import { Horarios } from '../../../adapters/inbound/rest/v1/presenters/agenda.dto';

export interface IAgendaRepository {
  criarAgenda(horario: Horarios): Promise<AgendaModel>;
  buscarAgendaPorMedicoId(medicoId: string): Promise<AgendaModel[] | []>;
  editarAgenda(id: string, horario: Horarios): Promise<void>;
  excluirAgenda(id: string): Promise<void>;
  reservarAgenda(id: string): Promise<void>;
  liberarAgenda(id: string): Promise<void>;
}

export const IAgendaRepository = Symbol('IAgendaRepository');
