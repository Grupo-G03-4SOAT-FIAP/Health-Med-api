import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgendaRepository } from './agenda.repository';
import { AgendaModel } from '../models/agenda.model';
import {
  agendaTypeORMMock,
  mockAgendaModel,
  mockHorario,
} from 'src/mocks/agenda.mock';
import { AgendaOcupada } from 'src/domain/exceptions/agenda.exception';

describe('AgendaRepository', () => {
  let agendaRepository: AgendaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaRepository,
        {
          provide: getRepositoryToken(AgendaModel),
          useValue: agendaTypeORMMock,
        },
      ],
    }).compile();

    agendaRepository = module.get<AgendaRepository>(AgendaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar agenda', async () => {
    agendaTypeORMMock.save.mockResolvedValue(Promise.resolve(mockAgendaModel));

    const result = await agendaRepository.criarAgenda(mockHorario);

    expect(agendaTypeORMMock.save).toHaveBeenCalledWith(mockHorario);
    expect(result).toBe(mockAgendaModel);
  });

  it('deve retornar um conflito ao tentar criar uma agenda com uma data já registrada', async () => {
    agendaTypeORMMock.findOne.mockReturnValue(Promise.resolve(mockAgendaModel));
    expect(agendaRepository.criarAgenda(mockHorario)).rejects.toThrow(
      new AgendaOcupada(
        'Horário já está ocupado no mesmo dia para este médico',
      ),
    );
  });

  it('deve atualizar agenda', async () => {
    agendaTypeORMMock.update.mockResolvedValue(
      Promise.resolve({
        raw: [],
        generatedMaps: [],
      }),
    );

    const result = await agendaRepository.editarAgenda('123', mockHorario);

    expect(agendaTypeORMMock.update).toHaveBeenCalledWith('123', mockHorario);
    expect(result).toBe(undefined);
  });

  it('deve deletar agenda', async () => {
    agendaTypeORMMock.delete.mockResolvedValue(
      Promise.resolve({
        raw: [],
        generatedMaps: [],
      }),
    );

    const result = await agendaRepository.excluirAgenda('123');

    expect(agendaTypeORMMock.delete).toHaveBeenCalledWith('123');
    expect(result).toBe(undefined);
  });

  it('deve buscar agenda por medicoId', async () => {
    const listaAgendas = [mockAgendaModel, mockAgendaModel, mockAgendaModel];
    agendaTypeORMMock.find.mockResolvedValue(Promise.resolve(listaAgendas));

    const result = await agendaRepository.buscarAgendaPorMedicoId('123');

    expect(agendaTypeORMMock.find).toHaveBeenCalledWith({
      where: { medicoId: '123' },
    });
    expect(result).toBe(listaAgendas);
  });

  it('deve reservar agenda', async () => {
    agendaTypeORMMock.update.mockResolvedValue(
      Promise.resolve({
        raw: [],
        generatedMaps: [],
      }),
    );

    const result = await agendaRepository.reservarAgenda('123');

    expect(agendaTypeORMMock.update).toHaveBeenCalledWith('123', {
      reservado: true,
    });
    expect(result).toBe(undefined);
  });

  it('deve liberar agenda', async () => {
    agendaTypeORMMock.update.mockResolvedValue(
      Promise.resolve({
        raw: [],
        generatedMaps: [],
      }),
    );

    const result = await agendaRepository.liberarAgenda('123');

    expect(agendaTypeORMMock.update).toHaveBeenCalledWith('123', {
      reservado: false,
    });
    expect(result).toBe(undefined);
  });
});
