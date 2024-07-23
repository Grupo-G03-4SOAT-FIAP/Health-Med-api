import { ApiProperty } from '@nestjs/swagger';

export class ConflictError {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
