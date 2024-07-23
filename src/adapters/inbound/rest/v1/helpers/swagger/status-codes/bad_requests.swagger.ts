import { ApiProperty } from '@nestjs/swagger';

export class BadRequestError {
  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
