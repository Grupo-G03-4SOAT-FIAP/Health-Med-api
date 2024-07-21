import { Repository } from 'typeorm';
import { MedicoDTO } from 'src/adapters/inbound/rest/v1/presenters/medico.dto';
import { MedicoModel } from 'src/adapters/outbound/models/medico.model';

// Mock jest das funções do use case medico
export const medicoUseCaseMock = {
  buscarMedico: jest.fn(),
  listarMedicos: jest.fn(),
};

// Mock jest das funções do repository medico
export const medicoRepositoryMock = {
  buscarMedicoPorId: jest.fn(),
  listarMedicosDisponiveis: jest.fn(),
};

// Mock jest das funções do typeORM interagindo com a tabela medicos
export const medicoTypeORMMock: jest.Mocked<Repository<MedicoModel>> = {
  findOne: jest.fn(),
  find: jest.fn(),
} as Partial<jest.Mocked<Repository<MedicoModel>>> as jest.Mocked<
  Repository<MedicoModel>
>;

// Mock do DTO do medico
export const medicoDTOMock = new MedicoDTO();
medicoDTOMock.id = '87299678-a39f-46ff-a849-79c35f561945';
medicoDTOMock.nome = 'BRUNO LOPES DOS SANTOS';
medicoDTOMock.crm = '127670-SP';
medicoDTOMock.especialidade = 'NEUROLOGIA';
medicoDTOMock.avaliacao = 4.5;
medicoDTOMock.distancia = 10;
medicoDTOMock.valorConsulta = 200;

export const medicoModelMock = new MedicoModel();
medicoModelMock.id = '87299678-a39f-46ff-a849-79c35f561945';
medicoModelMock.nome = 'BRUNO LOPES DOS SANTOS';
medicoModelMock.crm = '127670-SP';
medicoModelMock.especialidade = 'NEUROLOGIA';
medicoModelMock.avaliacao = 4.5;
medicoModelMock.distancia = 10;
medicoModelMock.valorConsulta = 200;
medicoModelMock.disponivel = true;
