import { Test, TestingModule } from '@nestjs/testing';
import {
  medicoDTOMock,
  medicoModelMock,
  medicoRepositoryMock,
} from 'src/mocks/medico.mock';
import { MedicoNaoLocalizado } from 'src/domain/exceptions/medico.exception';
import { MedicoUseCase } from './medico.use_case';
import { IMedicoRepository } from 'src/domain/ports/medico/medico.repository.port';

describe('MedicoUseCase', () => {
  let medicoUseCase: MedicoUseCase;
  let medicoId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoUseCase,
        {
          provide: IMedicoRepository,
          useValue: medicoRepositoryMock,
        },
      ],
    }).compile();

    medicoUseCase = module.get<MedicoUseCase>(MedicoUseCase);
    medicoId = '87299678-a39f-46ff-a849-79c35f561945';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar medicos com sucesso', async () => {
    medicoRepositoryMock.listarMedicosDisponiveis.mockReturnValue([
      medicoModelMock,
    ]);

    const result = await medicoUseCase.listarMedicos();

    expect(medicoRepositoryMock.listarMedicosDisponiveis).toHaveBeenCalled();
    expect(result).toStrictEqual([medicoDTOMock]);
  });

  it('deve listar medicos vazio', async () => {
    medicoRepositoryMock.listarMedicosDisponiveis.mockReturnValue([]);

    const result = await medicoUseCase.listarMedicos();

    expect(medicoRepositoryMock.listarMedicosDisponiveis).toHaveBeenCalled();
    expect(result).toStrictEqual([]);
  });

  it('deve buscar medico por id com sucesso', async () => {
    medicoRepositoryMock.buscarMedicoPorId.mockReturnValue(medicoModelMock);

    const result = await medicoUseCase.buscarMedico(medicoId);

    expect(medicoRepositoryMock.buscarMedicoPorId).toHaveBeenCalledWith(
      medicoId,
    );
    expect(result).toStrictEqual(medicoDTOMock);
  });

  it('deve buscar medico por id e retornar NotFoundError', async () => {
    medicoRepositoryMock.buscarMedicoPorId.mockReturnValue(null);

    await expect(medicoUseCase.buscarMedico(medicoId)).rejects.toThrow(
      new MedicoNaoLocalizado('Médico não localizado'),
    );
    expect(medicoRepositoryMock.buscarMedicoPorId).toHaveBeenCalledWith(
      medicoId,
    );
  });
});
