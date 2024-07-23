import { Test, TestingModule } from '@nestjs/testing';
import { ProntuarioAdapter } from './prontuario.adapter';
import { ConfigService } from '@nestjs/config';
import { mockStripe } from 'src/mocks/prontuario.mocks';
import { mockClient } from 'aws-sdk-client-mock';
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { sdkStreamMixin } from '@smithy/util-stream';
import 'aws-sdk-client-mock-jest';
import { buffer } from 'node:stream/consumers';

jest.mock('@aws-sdk/s3-request-presigner');
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

describe('ProntuarioAdapter', () => {
  let prontuarioService: ProntuarioAdapter;
  let sub: string;
  let key: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProntuarioAdapter,
        {
          provide: ConfigService,
          useFactory: mockStripe,
        },
      ],
    }).compile();

    prontuarioService = module.get<ProntuarioAdapter>(ProntuarioAdapter);
    sub = '6a5af77e-0c7d-446e-b9be-9ba53b3b1a13';
    key = 'hackathon-soat.pdf';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve listar arquivos', async () => {
    const s3Mock = mockClient(S3Client);
    s3Mock.on(ListObjectsCommand).resolves({ Contents: [{ ETag: '1' }] });

    await prontuarioService.listarArquivos(sub);

    expect(s3Mock).toHaveReceivedCommand(ListObjectsCommand);
  });

  it('deve compartilhar um arquivo', async () => {
    const s3Mock = mockClient(S3Client);

    // create Stream from string
    const stream = new Readable();
    stream.push('hello world');
    stream.push(null); // end of stream

    // alternatively: create Stream from file
    // const stream = createReadStream('./test/data.txt');

    // wrap the Stream with SDK mixin
    const sdkStream = sdkStreamMixin(stream);

    s3Mock.on(GetObjectCommand).resolves({ Body: sdkStream });

    await prontuarioService.compartilharArquivo(key, sub);

    expect(s3Mock).toHaveReceivedCommand(GetObjectCommand);
    expect(getSignedUrl).toHaveBeenCalled();
  });

  it('deve fazer upload de um arquivo', async () => {
    const s3Mock = mockClient(S3Client);

    // create Stream from string
    const stream = new Readable();
    stream.push('hello world');
    stream.push(null); // end of stream

    // alternatively: create Stream from file
    // const stream = createReadStream('./test/data.txt');

    s3Mock.on(PutObjectCommand).resolves({ ETag: '1' });

    await prontuarioService.enviarArquivo(sub, await buffer(stream), key);

    expect(s3Mock).toHaveReceivedCommand(PutObjectCommand);
  });
});
