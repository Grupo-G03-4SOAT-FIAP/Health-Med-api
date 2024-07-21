import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { medicoModelMock, medicoTypeORMMock } from 'src/mocks/medico.mock';
import { MedicoRepository } from './medico.repository';
import { MedicoModel } from '../models/medico.model';

describe('MedicoRepository', () => {
  let medicoRepository: MedicoRepository;
  let medicoId: string;
  let filtros: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoRepository,
        {
          provide: getRepositoryToken(MedicoModel),
          useValue: medicoTypeORMMock,
        },
      ],
    }).compile();

    medicoRepository = module.get<MedicoRepository>(MedicoRepository);
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
    const listaMedicos = [medicoModelMock, medicoModelMock, medicoModelMock];
    medicoTypeORMMock.find.mockResolvedValue(Promise.resolve(listaMedicos));

    const result = await medicoRepository.listarMedicosDisponiveis(filtros);

    expect(medicoTypeORMMock.find).toHaveBeenCalledWith({
      where: { disponivel: true, ...filtros },
    });
    expect(result).toBe(listaMedicos);
  });

  it('deve listar medicos vazio', async () => {
    const listaMedicos = [];
    medicoTypeORMMock.find.mockResolvedValue(Promise.resolve(listaMedicos));

    const result = await medicoRepository.listarMedicosDisponiveis(filtros);

    expect(medicoTypeORMMock.find).toHaveBeenCalledWith({
      where: { disponivel: true, ...filtros },
    });
    expect(result).toBe(listaMedicos);
  });

  it('deve buscar medico por id com sucesso', async () => {
    medicoTypeORMMock.findOne.mockResolvedValue(
      Promise.resolve(medicoModelMock),
    );

    const result = await medicoRepository.buscarMedicoPorId(medicoId);

    expect(medicoTypeORMMock.findOne).toHaveBeenCalledWith({
      where: { id: medicoId },
    });
    expect(result).toBe(medicoModelMock);
  });

  it('deve buscar medico por id e retornar NotFoundError', async () => {
    medicoTypeORMMock.findOne.mockResolvedValue(null);

    const result = await medicoRepository.buscarMedicoPorId(medicoId);

    expect(medicoTypeORMMock.findOne).toHaveBeenCalledWith({
      where: { id: medicoId },
    });
    expect(result).toBe(null);
  });
});
