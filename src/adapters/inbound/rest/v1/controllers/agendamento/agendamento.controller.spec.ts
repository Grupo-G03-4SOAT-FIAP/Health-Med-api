import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentoController } from './agendamento.controller';
import { IAgendamentoUseCase } from 'src/domain/ports/agendamento/agendamento.use_case.port';
import { BadRequestException } from '@nestjs/common';

const mockAgendamentoUseCase = {
  create: jest.fn(),
  findByDoctorId: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  markAsBooked: jest.fn(),
  markAsFree: jest.fn(),
};

describe('AgendamentoController', () => {
  let controller: AgendamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentoController],
      providers: [
        {
          provide: IAgendamentoUseCase,
          useValue: mockAgendamentoUseCase,
        },
      ],
    }).compile();

    controller = module.get<AgendamentoController>(AgendamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new horario', async () => {
      const horario = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };
      mockAgendamentoUseCase.create.mockResolvedValue(horario);

      expect(await controller.create(horario)).toBe(horario);
    });

    it('should throw BadRequestException on error', async () => {
      const horario = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };
      mockAgendamentoUseCase.create.mockRejectedValue(
        new Error('Failed to create'),
      );

      await expect(controller.create(horario)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findByDoctorId', () => {
    it('should return an array of horarios', async () => {
      const horarios = [
        {
          doctorId: '123',
          date: '2024-07-19',
          startTime: '09:00',
          endTime: '10:00',
        },
      ];
      mockAgendamentoUseCase.findByDoctorId.mockResolvedValue(horarios);

      expect(await controller.findByDoctorId('123')).toBe(horarios);
    });
  });

  describe('update', () => {
    it('should update a horario', async () => {
      const horario = {
        doctorId: '123',
        date: '2024-07-19',
        startTime: '09:00',
        endTime: '10:00',
      };
      mockAgendamentoUseCase.update.mockResolvedValue({});

      await controller.update('uuid', horario);
      expect(mockAgendamentoUseCase.update).toHaveBeenCalledWith(
        'uuid',
        horario,
      );
    });
  });

  describe('remove', () => {
    it('should remove a horario', async () => {
      mockAgendamentoUseCase.remove.mockResolvedValue({});

      await controller.remove('uuid');
      expect(mockAgendamentoUseCase.remove).toHaveBeenCalledWith('uuid');
    });
  });

  describe('markAsBooked', () => {
    it('should mark a horario as booked', async () => {
      mockAgendamentoUseCase.markAsBooked.mockResolvedValue({});

      await controller.markAsBooked('uuid');
      expect(mockAgendamentoUseCase.markAsBooked).toHaveBeenCalledWith('uuid');
    });
  });

  describe('markAsFree', () => {
    it('should mark a horario as free', async () => {
      mockAgendamentoUseCase.markAsFree.mockResolvedValue({});

      await controller.markAsFree('uuid');
      expect(mockAgendamentoUseCase.markAsFree).toHaveBeenCalledWith('uuid');
    });
  });
});
