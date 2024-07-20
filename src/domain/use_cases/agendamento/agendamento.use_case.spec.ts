import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentoUseCase } from './agendamento.use_case';
import { IAgendamentoRepository } from 'src/domain/ports/agendamento/agendamento.repository.port';
import { AgendamentoModel } from '../../../adapters/outbound/models/agendamento.model';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agendamento';

const mockAgendamentoModel: AgendamentoModel = {
  id: 'uuid',
  doctorId: '123',
  date: '2024-07-19',
  startTime: '09:00',
  endTime: '10:00',
  isBooked: false,
};

const mockAgendamentoRepository = {
  create: jest.fn(),
  findByDoctorId: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  markAsBooked: jest.fn(),
  markAsFree: jest.fn(),
};

describe('AgendamentoUseCase', () => {
  let useCase: AgendamentoUseCase;
  let repository: IAgendamentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamentoUseCase,
        {
          provide: IAgendamentoRepository,
          useValue: mockAgendamentoRepository,
        },
      ],
    }).compile();

    useCase = module.get<AgendamentoUseCase>(AgendamentoUseCase);
    repository = module.get<IAgendamentoRepository>(IAgendamentoRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create with the correct parameters', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(mockAgendamentoModel);

      const horario: Horarios = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };

      const result = await useCase.create(horario);
      expect(result).toEqual(mockAgendamentoModel);
    });
  });

  describe('findByDoctorId', () => {
    it('should call repository.findByDoctorId and return the result', async () => {
      const mockHorariosArray = [mockAgendamentoModel];
      jest
        .spyOn(repository, 'findByDoctorId')
        .mockResolvedValue(mockHorariosArray);

      const result = await useCase.findByDoctorId('123');
      expect(result).toEqual(mockHorariosArray);
      expect(repository.findByDoctorId).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('should call repository.update with the correct parameters', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      const horario: Horarios = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };

      await useCase.update('uuid', horario);
      expect(repository.update).toHaveBeenCalledWith('uuid', {
        ...horario,
      });
    });
  });

  describe('remove', () => {
    it('should call repository.remove with the correct parameters', async () => {
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await useCase.remove('uuid');
      expect(repository.remove).toHaveBeenCalledWith('uuid');
    });
  });

  describe('markAsBooked', () => {
    it('should call repository.markAsBooked with the correct parameters', async () => {
      jest.spyOn(repository, 'markAsBooked').mockResolvedValue(undefined);

      await useCase.markAsBooked('uuid');
      expect(repository.markAsBooked).toHaveBeenCalledWith('uuid', {
        isBooked: true,
      });
    });
  });

  describe('markAsFree', () => {
    it('should call repository.markAsFree with the correct parameters', async () => {
      jest.spyOn(repository, 'markAsFree').mockResolvedValue(undefined);

      await useCase.markAsFree('uuid');
      expect(repository.markAsFree).toHaveBeenCalledWith('uuid', {
        isBooked: false,
      });
    });
  });
});
