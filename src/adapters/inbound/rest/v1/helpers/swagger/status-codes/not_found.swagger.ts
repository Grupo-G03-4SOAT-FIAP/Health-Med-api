import { ApiProperty } from '@nestjs/swagger';

export class NotFoundError {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
