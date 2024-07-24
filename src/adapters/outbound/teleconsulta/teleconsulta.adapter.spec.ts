import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TeleconsultaAdapter } from './teleconsulta.adapter';
import { mockStripe } from 'src/mocks/teleconsulta.mocks';

jest.mock('google-auth-library');
jest.mock('@google-apps/meet');

describe('TeleconsultaAdapter', () => {
  let teleconsultaAdapter: TeleconsultaAdapter;
  let linkTeleconsulta: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeleconsultaAdapter,
        {
          provide: ConfigService,
          useFactory: mockStripe,
        },
      ],
    }).compile();

    teleconsultaAdapter = module.get<TeleconsultaAdapter>(TeleconsultaAdapter);
    linkTeleconsulta = 'https://meet.google.com/xxx-yyyy-zzz';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve gerar um link de reunião do google meet', async () => {
    const result = await teleconsultaAdapter.gerarLinkGoogleMeet();

    expect(result).toBe(linkTeleconsulta);
  });
});
