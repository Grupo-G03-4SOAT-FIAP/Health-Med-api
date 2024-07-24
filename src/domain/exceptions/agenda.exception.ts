import { HttpException, HttpStatus } from '@nestjs/common';

export class AgendaOcupada extends HttpException {
  constructor(message: string) {
    const errorResponse = {
      message: message,
      error: 'Conflict',
      statusCode: HttpStatus.CONFLICT,
    };
    super(errorResponse, HttpStatus.CONFLICT);
  }
}
