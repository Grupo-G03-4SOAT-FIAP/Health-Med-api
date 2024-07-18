import { Controller, Get } from '@nestjs/common';
import { AppUseCase } from '../../../../../../domain/use_cases/app/app.use_case';

@Controller()
export class AppController {
  constructor(private readonly appUseCase: AppUseCase) {}

  @Get()
  healthCheck(): string {
    return this.appUseCase.healthCheck();
  }
}
