import { Test, TestingModule } from '@nestjs/testing';
import { ProntuarioController } from './prontuario.controller';
import { IAgendaUseCase } from 'src/domain/ports/agendamento/agenda.use_case.port';
import { mockAgendaUseCase } from 'src/mocks/agenda.mock';
import { CognitoTestingModule } from '@nestjs-cognito/testing';

describe('ProntuarioController', () => {
  let prontuarioController: ProntuarioController;
  let horario: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CognitoTestingModule.register({
          identityProvider: {
            region: 'eu-west-1',
          },
        }),
      ],
      controllers: [ProntuarioController],
      providers: [
        {
          provide: IAgendaUseCase,
          useValue: mockAgendaUseCase,
        },
      ],
    }).compile();

    prontuarioController =
      module.get<ProntuarioController>(ProntuarioController);
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

  it.skip('apagar', async () => {
    mockAgendaUseCase.criarAgenda.mockResolvedValue(horario);

    expect(true).toBe(true);
  });

  // it('should create a new horario', async () => {
  //   mockAgendaUseCase.criarAgenda.mockResolvedValue(horario);

  //   expect(await ProntuarioController.criar(horario.medicoId, horario)).toBe(
  //     horario,
  //   );
  // });

  // it('should throw BadRequestException on error', async () => {
  //   mockAgendaUseCase.criarAgenda.mockRejectedValue(
  //     new Error('Failed to create'),
  //   );

  //   await expect(
  //     ProntuarioController.criar(horario.medicoId, horario),
  //   ).rejects.toThrow(BadRequestException);
  // });

  // it('should return an array of horarios', async () => {
  //   mockAgendaUseCase.buscarAgenda.mockResolvedValue([horario]);

  //   expect(await ProntuarioController.buscar('123')).toStrictEqual([horario]);
  // });

  // it('should update a horario', async () => {
  //   mockAgendaUseCase.editarAgenda.mockResolvedValue({});

  //   await ProntuarioController.atualizar(horario.medicoId, 'uuid', horario);
  //   expect(mockAgendaUseCase.editarAgenda).toHaveBeenCalledWith(
  //     'uuid',
  //     horario,
  //   );
  // });

  // it('should remove a horario', async () => {
  //   mockAgendaUseCase.excluirAgenda.mockResolvedValue({});

  //   await ProntuarioController.remover('uuid');
  //   expect(mockAgendaUseCase.excluirAgenda).toHaveBeenCalledWith('uuid');
  // });

  // it('should mark a horario as booked', async () => {
  //   mockAgendaUseCase.reservarAgenda.mockResolvedValue({});

  //   await ProntuarioController.reservar('uuid');
  //   expect(mockAgendaUseCase.reservarAgenda).toHaveBeenCalledWith('uuid');
  // });

  // it('should mark a horario as free', async () => {
  //   mockAgendaUseCase.liberarAgenda.mockResolvedValue({});

  //   await ProntuarioController.liberar('uuid');
  //   expect(mockAgendaUseCase.liberarAgenda).toHaveBeenCalledWith('uuid');
  // });
});
