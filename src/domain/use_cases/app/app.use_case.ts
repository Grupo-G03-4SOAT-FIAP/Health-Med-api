import { Injectable } from '@nestjs/common';

@Injectable()
export class AppUseCase {
  healthCheck(): string {
    return 'OK';
  }
}
