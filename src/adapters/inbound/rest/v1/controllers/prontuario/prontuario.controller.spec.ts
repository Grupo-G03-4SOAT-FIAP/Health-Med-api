import { Test, TestingModule } from '@nestjs/testing';
import { ProntuarioController } from './prontuario.controller';
import { CognitoTestingModule } from '@nestjs-cognito/testing';
import { IProntuarioUseCase } from 'src/domain/ports/prontuario/prontuario.use_case.port';
import { mockProntuarioUseCase } from 'src/mocks/prontuario.mocks';
import { Readable } from 'stream';

describe('ProntuarioController', () => {
  let prontuarioController: ProntuarioController;
  let sub: string;
  let key: string;

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
          provide: IProntuarioUseCase,
          useValue: mockProntuarioUseCase,
        },
      ],
    }).compile();

    prontuarioController =
      module.get<ProntuarioController>(ProntuarioController);
    sub = '6a5af77e-0c7d-446e-b9be-9ba53b3b1a13';
    key = 'hackathon-soat.pdf';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar arquivos', async () => {
    mockProntuarioUseCase.listarArquivos.mockResolvedValue({});

    await prontuarioController.listar(sub);

    expect(mockProntuarioUseCase.listarArquivos).toHaveBeenCalledWith(sub);
  });

  it('deve compartilhar um arquivo', async () => {
    mockProntuarioUseCase.compartilharArquivo.mockResolvedValue({});

    await prontuarioController.share(key, sub);

    expect(mockProntuarioUseCase.compartilharArquivo).toHaveBeenCalledWith(
      key,
      sub,
    );
  });

  it('deve fazer upload de um arquivo', async () => {
    // create Stream from string
    const stream = new Readable();
    stream.push('hello world');
    stream.push(null); // end of stream

    // alternatively: create Stream from file
    // const stream = createReadStream('./test/data.txt');

    mockProntuarioUseCase.enviarArquivo.mockResolvedValue({});

    const file: Express.Multer.File = {
      originalname: 'hackathon-soat.pdf',
      mimetype: 'application/pdf',
      path: 'something',
      buffer: Buffer.from('hello world'),
      fieldname: '',
      encoding: '',
      size: 0,
      stream: new Readable(),
      destination: '',
      filename: '',
    };

    await prontuarioController.uploadFile(sub, file);

    expect(mockProntuarioUseCase.enviarArquivo).toHaveBeenCalledWith(
      sub,
      file.buffer,
      key,
    );
  });
});
