import { Test, TestingModule } from '@nestjs/testing';
import { IMedicoUseCase } from 'src/domain/ports/medico/medico.use_case.port';
import { MedicoController } from './medico.controller';
import { medicoDTOMock, medicoUseCaseMock } from 'src/mocks/medico.mock';
import { MedicoNaoLocalizado } from 'src/domain/exceptions/medico.exception';
import { NotFoundException } from '@nestjs/common';

describe('MedicoController', () => {
  let medicoController: MedicoController;
  let medicoId: string;
  let filtros: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoController],
      providers: [
        {
          provide: IMedicoUseCase,
          useValue: medicoUseCaseMock,
        },
      ],
    }).compile();

    medicoController = module.get<MedicoController>(MedicoController);
    medicoId = '87299678-a39f-46ff-a849-79c35f561945';
    filtros = {
      especialidade: 'Cardiologista',
      avaliacao: 4,
      distancia: 10,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar medicos', async () => {
    medicoUseCaseMock.listarMedicos.mockReturnValue([medicoDTOMock]);

    const result = await medicoController.listar(filtros);

    expect(medicoUseCaseMock.listarMedicos).toHaveBeenCalledWith(filtros);
    expect(result).toStrictEqual([medicoDTOMock]);
  });

  it('deve listar medicos vazio', async () => {
    medicoUseCaseMock.listarMedicos.mockReturnValue([]);

    const result = await medicoController.listar(filtros);

    expect(medicoUseCaseMock.listarMedicos).toHaveBeenCalledWith(filtros);
    expect(result).toStrictEqual([]);
  });

  it('deve buscar medico por id', async () => {
    medicoUseCaseMock.buscarMedico.mockReturnValue(medicoDTOMock);

    const result = await medicoController.buscar(medicoId);

    expect(medicoUseCaseMock.buscarMedico).toHaveBeenCalledWith(medicoId);
    expect(result).toStrictEqual(medicoDTOMock);
  });

  it('deve buscar medico por id e retornar NotFoundError', async () => {
    medicoUseCaseMock.buscarMedico.mockRejectedValue(
      new MedicoNaoLocalizado('Médico não localizado'),
    );

    await expect(medicoController.buscar(medicoId)).rejects.toThrow(
      new NotFoundException('Médico não localizado'),
    );
    expect(medicoUseCaseMock.buscarMedico).toHaveBeenCalledWith(medicoId);
  });
});
