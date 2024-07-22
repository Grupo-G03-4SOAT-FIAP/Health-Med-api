import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaRepository } from './consulta.repository';
import { ConsultaModel } from '../models/consulta.model';
import {
  consultaModelMock,
  consultaTypeORMMock,
} from 'src/mocks/consulta.mock';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { StatusConsulta } from 'src/utils/statusConsulta.enum';

describe('ConsultaRepository', () => {
  let consultaRepository: ConsultaRepository;
  let consultaId: string;
  let novaConsultaEntity: ConsultaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultaRepository,
        {
          provide: getRepositoryToken(ConsultaModel),
          useValue: consultaTypeORMMock,
        },
      ],
    }).compile();

    consultaRepository = module.get<ConsultaRepository>(ConsultaRepository);
    consultaId = '12345678-1234-1234-1234-123456789012';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova consulta', async () => {
    consultaTypeORMMock.create.mockReturnValue(consultaModelMock);
    consultaTypeORMMock.save.mockResolvedValue(consultaModelMock);

    const result = await consultaRepository.criarConsulta(novaConsultaEntity);

    expect(consultaTypeORMMock.create).toHaveBeenCalledWith(novaConsultaEntity);
    expect(consultaTypeORMMock.save).toHaveBeenCalledWith(consultaModelMock);
    expect(result).toBe(consultaModelMock);
  });

  it('deve buscar consulta por ID', async () => {
    consultaTypeORMMock.findOne.mockResolvedValue(consultaModelMock);

    const result = await consultaRepository.buscarConsultaPorId(consultaId);

    expect(consultaTypeORMMock.findOne).toHaveBeenCalledWith({
      where: { id: consultaId },
    });
    expect(result).toBe(consultaModelMock);
  });

  it('deve cancelar consulta por ID', async () => {
    const consultaCanceladaMock = {
      ...consultaModelMock,
      statusConsulta: StatusConsulta.CANCELADA,
    };
    consultaTypeORMMock.update.mockResolvedValue(Promise.resolve());
    consultaTypeORMMock.findOne.mockResolvedValue(consultaCanceladaMock);

    const result = await consultaRepository.statusConsulta(
      consultaId,
      StatusConsulta.CANCELADA,
    );

    expect(consultaTypeORMMock.update).toHaveBeenCalledWith(consultaId, {
      statusConsulta: StatusConsulta.CANCELADA,
    });
    expect(consultaTypeORMMock.findOne).toHaveBeenCalledWith({
      where: { id: consultaId },
    });
    expect(result).toBe(consultaCanceladaMock);
  });
});
