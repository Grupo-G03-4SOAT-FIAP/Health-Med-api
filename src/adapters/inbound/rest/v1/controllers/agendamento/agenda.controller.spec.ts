import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { IAgendaUseCase } from 'src/domain/ports/agendamento/agenda.use_case.port';
import { BadRequestException } from '@nestjs/common';
import { mockAgendaUseCase } from 'src/mocks/agenda.mock';

describe('AgendaController', () => {
  let agendaController: AgendaController;
  let horario: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaController],
      providers: [
        {
          provide: IAgendaUseCase,
          useValue: mockAgendaUseCase,
        },
      ],
    }).compile();

    agendaController = module.get<AgendaController>(AgendaController);
    horario = {
      medicoId: '123',
      data: '2024-07-19',
      horaInicio: '09:00',
      horaFim: '10:00',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new horario', async () => {
    mockAgendaUseCase.criarAgenda.mockResolvedValue(horario);

    expect(await agendaController.criar(horario)).toBe(horario);
  });

  it('should throw BadRequestException on error', async () => {
    mockAgendaUseCase.criarAgenda.mockRejectedValue(
      new Error('Failed to create'),
    );

    await expect(agendaController.criar(horario)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return an array of horarios', async () => {
    mockAgendaUseCase.buscarAgenda.mockResolvedValue([horario]);

    expect(await agendaController.buscar('123')).toStrictEqual([horario]);
  });

  it('should update a horario', async () => {
    mockAgendaUseCase.editarAgenda.mockResolvedValue({});

    await agendaController.atualizar('uuid', horario);
    expect(mockAgendaUseCase.editarAgenda).toHaveBeenCalledWith(
      'uuid',
      horario,
    );
  });

  it('should remove a horario', async () => {
    mockAgendaUseCase.excluirAgenda.mockResolvedValue({});

    await agendaController.remover('uuid');
    expect(mockAgendaUseCase.excluirAgenda).toHaveBeenCalledWith('uuid');
  });

  it('should mark a horario as booked', async () => {
    mockAgendaUseCase.reservarAgenda.mockResolvedValue({});

    await agendaController.reservar('uuid');
    expect(mockAgendaUseCase.reservarAgenda).toHaveBeenCalledWith('uuid');
  });

  it('should mark a horario as free', async () => {
    mockAgendaUseCase.liberarAgenda.mockResolvedValue({});

    await agendaController.liberar('uuid');
    expect(mockAgendaUseCase.liberarAgenda).toHaveBeenCalledWith('uuid');
  });
});
