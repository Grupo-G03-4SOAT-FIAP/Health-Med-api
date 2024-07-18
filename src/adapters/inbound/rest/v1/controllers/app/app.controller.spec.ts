import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppUseCase } from '../../../../../../domain/use_cases/app/app.use_case';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppUseCase],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('deve retornar "OK"', () => {
    expect(appController.healthCheck()).toBe('OK');
  });
});
