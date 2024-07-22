import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaUseCase } from './consulta.use_case';
import { IConsultaRepository } from 'src/domain/ports/agendamento/consulta.repository.port';
import { ConsultaDTO } from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { ConsultaNaoLocalizada } from 'src/domain/exceptions/consulta.exception';
import { StatusConsulta } from '../../../utils/statusConsulta.enum';
import {
  agendarConsultaDTOMock,
  consultaRepositoryMock,
} from 'src/mocks/consulta.mock';
import { consultaModelMock, consultaDTOMock } from 'src/mocks/consulta.mock';

describe('ConsultaUseCase', () => {
  let consultaUseCase: ConsultaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultaUseCase,
        { provide: IConsultaRepository, useValue: consultaRepositoryMock },
      ],
    }).compile();

    consultaUseCase = module.get<ConsultaUseCase>(ConsultaUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  //Validar teste
  it('deve agendar uma consulta com sucesso', async () => {
    consultaRepositoryMock.criarConsulta.mockReturnValue(consultaModelMock);
    const consultaDTO: ConsultaDTO = await consultaUseCase.agendarConsulta(
      agendarConsultaDTOMock,
    );

    const entidadeConsulta = new ConsultaEntity(
      agendarConsultaDTOMock.agendaId,
      agendarConsultaDTOMock.nomePaciente,
      agendarConsultaDTOMock.cpfPaciente,
      agendarConsultaDTOMock.emailPaciente,
    );
    entidadeConsulta.statusConsultaAgendada();

    expect(consultaRepositoryMock.criarConsulta).toHaveBeenCalledWith(
      entidadeConsulta,
    );
    expect(consultaDTO).toEqual(consultaDTOMock);
  });

  it('deve buscar uma consulta por ID com sucesso', async () => {
    const consultaId = '12345678-1234-1234-1234-123456789012';
    consultaRepositoryMock.buscarConsultaPorId.mockReturnValue(
      consultaModelMock,
    );
    const consultaDTO: ConsultaDTO =
      await consultaUseCase.buscarConsultaPorId(consultaId);

    expect(consultaRepositoryMock.buscarConsultaPorId).toHaveBeenCalledWith(
      consultaId,
    );
    expect(consultaDTO).toEqual(consultaDTOMock);
  });

  it('deve cancelar uma consulta com sucesso', async () => {
    const consultaId = '12345678-1234-1234-1234-123456789012';
    consultaRepositoryMock.buscarConsultaPorId.mockReturnValue(
      consultaModelMock,
    );
    consultaModelMock.statusConsulta = StatusConsulta.CANCELADA;
    consultaRepositoryMock.statusConsulta.mockReturnValue(consultaModelMock);

    const consultaDTO: ConsultaDTO = await consultaUseCase.statusConsulta(
      consultaId,
      StatusConsulta.CANCELADA,
    );

    expect(consultaRepositoryMock.buscarConsultaPorId).toHaveBeenCalledWith(
      consultaId,
    );

    consultaDTOMock.status = StatusConsulta.CANCELADA;
    expect(consultaDTO).toEqual(consultaDTOMock);
  });

  it('deve lançar uma exceção ao cancelar uma consulta que não existe', async () => {
    const consultaId = '12345678-1234-1234-1234-123456789012';
    consultaRepositoryMock.buscarConsultaPorId = jest
      .fn()
      .mockResolvedValue(null);

    await expect(
      consultaUseCase.statusConsulta(consultaId, StatusConsulta.CANCELADA),
    ).rejects.toThrow(ConsultaNaoLocalizada);
  });
});
