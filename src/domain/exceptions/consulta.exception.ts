import { HttpException, HttpStatus } from '@nestjs/common';

export class ConsultaNaoLocalizada extends HttpException {
  constructor(message: string) {
    const errorResponse = {
      message: message,
      error: 'Not found',
      statusCode: HttpStatus.NOT_FOUND,
    };
    super(errorResponse, HttpStatus.NOT_FOUND);
  }
}

export class ConsultaStatusInvalido extends HttpException {
    constructor(message: string) {
      const errorResponse = {
        message: message,
        error: 'Not found',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      super(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }
