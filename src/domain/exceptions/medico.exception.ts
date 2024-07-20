import { HttpException, HttpStatus } from '@nestjs/common';

export class MedicoNaoLocalizado extends HttpException {
  constructor(message: string) {
    const errorResponse = {
      message: message,
      error: 'Not found',
      statusCode: HttpStatus.NOT_FOUND,
    };
    super(errorResponse, HttpStatus.NOT_FOUND);
  }
}
