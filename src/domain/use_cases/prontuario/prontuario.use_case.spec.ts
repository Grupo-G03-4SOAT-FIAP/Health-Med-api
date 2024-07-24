import { Test, TestingModule } from '@nestjs/testing';
import { ProntuarioUseCase } from './prontuario.use_case';
import { IProntuarioPort } from 'src/domain/ports/prontuario/prontuario.port';
import { prontuarioAdapterMock } from 'src/mocks/prontuario.mocks';

describe('ProntuarioUseCase', () => {
  let prontuarioUseCase: ProntuarioUseCase;
  let sub: string;
  let key: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProntuarioUseCase,
        {
          provide: IProntuarioPort,
          useValue: prontuarioAdapterMock,
        },
      ],
    }).compile();

    prontuarioUseCase = module.get<ProntuarioUseCase>(ProntuarioUseCase);
    sub = '6a5af77e-0c7d-446e-b9be-9ba53b3b1a13';
    key = 'hackathon-soat.pdf';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar arquivos', async () => {
    prontuarioAdapterMock.listarArquivos.mockResolvedValue({});

    await prontuarioUseCase.listarArquivos(sub);

    expect(prontuarioAdapterMock.listarArquivos).toHaveBeenCalledWith(sub);
  });

  it('deve compartilhar um arquivo', async () => {
    prontuarioAdapterMock.compartilharArquivo.mockResolvedValue({});

    await prontuarioUseCase.compartilharArquivo(key, sub);

    expect(prontuarioAdapterMock.compartilharArquivo).toHaveBeenCalledWith(
      key,
      sub,
    );
  });

  it('deve fazer upload de um arquivo', async () => {
    prontuarioAdapterMock.enviarArquivo.mockResolvedValue({});

    await prontuarioUseCase.enviarArquivo(sub, Buffer.from('hello world'), key);

    expect(prontuarioAdapterMock.enviarArquivo).toHaveBeenCalledWith(
      sub,
      Buffer.from('hello world'),
      key,
    );
  });
});
