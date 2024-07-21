import { Test, TestingModule } from '@nestjs/testing';
import { AgendaUseCase } from './agenda.use_case';
import { IAgendaRepository } from 'src/domain/ports/agendamento/agenda.repository.port';
import {
  mockAgendaModel,
  mockAgendaRepository,
  mockHorario,
} from 'src/mocks/agenda.mock';

describe('AgendaUseCase', () => {
  let agendaUseCase: AgendaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaUseCase,
        {
          provide: IAgendaRepository,
          useValue: mockAgendaRepository,
        },
      ],
    }).compile();

    agendaUseCase = module.get<AgendaUseCase>(AgendaUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma agenda', async () => {
    mockAgendaRepository.criarAgenda.mockResolvedValue(mockAgendaModel);

    const result = await agendaUseCase.criarAgenda(mockHorario);
    expect(result).toEqual(mockAgendaModel);
  });

  it('deve buscar uma agenda por id do medico', async () => {
    const mockHorariosArray = [mockAgendaModel];
    mockAgendaRepository.buscarAgendaPorMedicoId.mockResolvedValue(
      mockHorariosArray,
    );

    const result = await agendaUseCase.buscarAgenda('123');
    expect(result).toEqual(mockHorariosArray);
    expect(mockAgendaRepository.buscarAgendaPorMedicoId).toHaveBeenCalledWith(
      '123',
    );
  });

  it('deve editar uma agenda', async () => {
    mockAgendaRepository.editarAgenda.mockResolvedValue(undefined);

    await agendaUseCase.editarAgenda('uuid', mockHorario);
    expect(mockAgendaRepository.editarAgenda).toHaveBeenCalledWith('uuid', {
      ...mockHorario,
    });
  });

  it('deve excluir uma agenda', async () => {
    mockAgendaRepository.excluirAgenda.mockResolvedValue(undefined);

    await agendaUseCase.excluirAgenda('uuid');
    expect(mockAgendaRepository.excluirAgenda).toHaveBeenCalledWith('uuid');
  });

  it('deve reservar uma agenda', async () => {
    mockAgendaRepository.reservarAgenda.mockResolvedValue(undefined);

    await agendaUseCase.reservarAgenda('uuid');
    expect(mockAgendaRepository.reservarAgenda).toHaveBeenCalledWith('uuid');
  });

  it('should call repository.markAsFree with the correct parameters', async () => {
    mockAgendaRepository.liberarAgenda.mockResolvedValue(undefined);

    await agendaUseCase.liberarAgenda('uuid');
    expect(mockAgendaRepository.liberarAgenda).toHaveBeenCalledWith('uuid');
  });
});
