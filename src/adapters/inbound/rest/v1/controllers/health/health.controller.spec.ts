import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService } from '@nestjs/terminus';

const mockResult = {
  status: 'ok',
  info: {},
  error: {},
  details: {},
};

const healthCheckServiceMock = {
  check: jest.fn(() => mockResult),
};

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthCheckService,
        {
          provide: HealthCheckService,
          useValue: healthCheckServiceMock,
        },
      ],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  it('root', async () => {
    const result = await healthController.check();

    expect(result).toEqual({
      status: 'ok',
      info: {},
      error: {},
      details: {},
    });
  });
});
