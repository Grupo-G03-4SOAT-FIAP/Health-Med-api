import { Repository } from 'typeorm';
import { AgendaModel } from 'src/adapters/outbound/models/agenda.model';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agenda.dto';

export const mockAgendaUseCase = {
  criarAgenda: jest.fn(),
  buscarAgenda: jest.fn(),
  editarAgenda: jest.fn(),
  excluirAgenda: jest.fn(),
  reservarAgenda: jest.fn(),
  liberarAgenda: jest.fn(),
};

export const mockAgendaRepository = {
  criarAgenda: jest.fn(),
  buscarAgendaPorMedicoId: jest.fn(),
  editarAgenda: jest.fn(),
  excluirAgenda: jest.fn(),
  reservarAgenda: jest.fn(),
  liberarAgenda: jest.fn(),
};

// Mock jest das funções do typeORM interagindo com a tabela agenda
export const agendaTypeORMMock: jest.Mocked<Repository<AgendaModel>> = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as Partial<jest.Mocked<Repository<AgendaModel>>> as jest.Mocked<
  Repository<AgendaModel>
>;

// Defina o mock do AgendaModel
export const mockAgendaModel: AgendaModel = {
  id: 'uuid',
  medicoId: '123',
  data: '2024-07-19',
  horaInicio: '09:00',
  horaFim: '10:00',
  reservado: false,
  criadoEm: '2024-07-19T00:00:00',
  atualizadoEm: '2024-07-19T00:00:00',
  excluidoEm: '2024-07-19T00:00:00',
};

export const mockHorario = new Horarios();
mockHorario.medicoId = '123';
mockHorario.data = '2024-07-19';
mockHorario.horaInicio = '09:00';
mockHorario.horaFim = '10:00';
