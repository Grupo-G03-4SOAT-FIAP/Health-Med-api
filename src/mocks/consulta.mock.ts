import {
  AgendarConsultaDTO,
  ConsultaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';
import { ConsultaModel } from 'src/adapters/outbound/models/consulta.model';
import { StatusConsulta } from 'src/utils/stautsConsulta.enum';

export const consultaModelMock: ConsultaModel = {
  id: '12345678-1234-1234-1234-123456789012',
  agendaId: '11111111-1111-1111-1111-111111111111',
  nomePaciente: 'John Doe',
  cpfPaciente: '12345678901',
  emailPaciente: 'john.doe@example.com',
  statusConsulta: StatusConsulta.AGENDADA,
  criadoEm: new Date().toISOString(),
  atualizadoEm: new Date().toISOString(),
};

export const consultaDTOMock: ConsultaDTO = {
  id: '12345678-1234-1234-1234-123456789012',
  agendaId: '11111111-1111-1111-1111-111111111111',
  nomePaciente: 'John Doe',
  cpfPaciente: '12345678901',
  emailPaciente: 'john.doe@example.com',
  status: StatusConsulta.AGENDADA,
};

export const agendarConsultaDTOMock: AgendarConsultaDTO = {
  agendaId: '11111111-1111-1111-1111-111111111111',
  nomePaciente: 'John Doe',
  cpfPaciente: '12345678901',
  emailPaciente: 'john.doe@example.com',
};

export const consultaRepositoryMock = {
  criarConsulta: jest.fn(),
  cancelarConsulta: jest.fn(),
  buscarConsultaPorId: jest.fn(),
};

export const agendaRepositoryMock = {
  criarConsulta: jest.fn(),
  cancelarConsulta: jest.fn(),
  buscarConsultaPorId: jest.fn(),
};

export const consultaUseCaseMock = {
  agendarConsulta: jest.fn(),
  buscarConsultaPorId: jest.fn(),
  cancelarConsulta: jest.fn(),
};

export const consultaTypeORMMock = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
};

export const agendaTypeORMMock = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
};
