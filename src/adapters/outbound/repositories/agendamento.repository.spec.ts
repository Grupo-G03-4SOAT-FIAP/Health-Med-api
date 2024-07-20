import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgendamentoRepository } from './agendamento.repository';
import { AgendamentoModel } from '../models/agendamento.model';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agendamento';

// Defina o mock do AgendamentoModel para ser consistente com a interface
const mockAgendamentoModel: Partial<AgendamentoModel> = {
  id: 'uuid',
  doctorId: '123',
  date: '2024-07-19',
  startTime: '09:00',
  endTime: '10:00',
  isBooked: false,
};

describe('AgendamentoRepository', () => {
  let repository: AgendamentoRepository;
  let repo: Repository<AgendamentoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamentoRepository,
        {
          provide: getRepositoryToken(AgendamentoModel),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<AgendamentoRepository>(AgendamentoRepository);
    repo = module.get<Repository<AgendamentoModel>>(
      getRepositoryToken(AgendamentoModel),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new horario if not already exists', async () => {
      const horario: Horarios = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };

      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(repo, 'save')
        .mockResolvedValue(mockAgendamentoModel as AgendamentoModel);

      const result = await repository.create(horario);
      expect(result).toEqual(mockAgendamentoModel);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: {
          doctorId: horario.doctorId,
          date: horario.date,
          startTime: horario.startTime,
          endTime: horario.endTime,
        },
      });
      expect(repo.save).toHaveBeenCalledWith(horario);
    });

    it('should throw an error if horario already exists', async () => {
      const horario: Horarios = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };

      jest
        .spyOn(repo, 'findOne')
        .mockResolvedValue(mockAgendamentoModel as AgendamentoModel);

      await expect(repository.create(horario)).rejects.toThrow(
        'Horário já está ocupado no mesmo dia para este médico.',
      );
    });
  });

  describe('findByDoctorId', () => {
    it('should return an array of horarios for a given doctorId', async () => {
      const horarios = [mockAgendamentoModel as AgendamentoModel];

      jest.spyOn(repo, 'find').mockResolvedValue(horarios);

      const result = await repository.findByDoctorId('123');
      expect(result).toEqual(horarios);
      expect(repo.find).toHaveBeenCalledWith({ where: { doctorId: '123' } });
    });
  });

  describe('update', () => {
    it('should update the horario with the given id', async () => {
      const horario: Horarios = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };

      jest.spyOn(repo, 'update').mockResolvedValue(undefined);

      await repository.update('uuid', horario);
      expect(repo.update).toHaveBeenCalledWith('uuid', horario);
    });
  });

  describe('remove', () => {
    it('should remove the horario with the given id', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue(undefined);

      await repository.remove('uuid');
      expect(repo.delete).toHaveBeenCalledWith('uuid');
    });
  });

  describe('markAsBooked', () => {
    it('should mark the horario as booked', async () => {
      jest.spyOn(repo, 'update').mockResolvedValue(undefined);

      await repository.markAsBooked('uuid');
      expect(repo.update).toHaveBeenCalledWith('uuid', { isBooked: true });
    });
  });

  describe('markAsFree', () => {
    it('should mark the horario as free', async () => {
      jest.spyOn(repo, 'update').mockResolvedValue(undefined);

      await repository.markAsFree('uuid');
      expect(repo.update).toHaveBeenCalledWith('uuid', { isBooked: false });
    });
  });
});
