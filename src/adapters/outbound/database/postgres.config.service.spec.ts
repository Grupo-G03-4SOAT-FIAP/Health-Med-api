import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PostgresConfigService } from './postgres.config.service';

jest.mock('dotenv');
jest.mock('fs');
const mockStripe = () => ({ get: () => 'test' });

describe('PostgresConfigService', () => {
  let postgresConfigService: PostgresConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresConfigService,
        {
          provide: ConfigService,
          useFactory: mockStripe,
        },
      ],
    }).compile();

    postgresConfigService = app.get<PostgresConfigService>(
      PostgresConfigService,
    );
  });

  it('should be defined', () => {
    expect(postgresConfigService.createTypeOrmOptions()).toBeDefined();
  });
});
