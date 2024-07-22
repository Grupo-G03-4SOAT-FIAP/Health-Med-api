import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { IProntuarioUseCase } from 'src/domain/ports/prontuario/prontuario.use_case.port';

@Controller('prontuario')
@Authorization(['pacientes'])
export class ProntuarioController {
  constructor(
    @Inject(IProntuarioUseCase)
    private readonly prontuarioUseCase: IProntuarioUseCase,
  ) {}

  @Get()
  async listar(@CognitoUser('sub') sub: string): Promise<any> {
    try {
      return await this.prontuarioUseCase.listarArquivos(sub);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/share/:key')
  async share(
    @Param('key') key: string,
    @CognitoUser('sub') sub: string,
  ): Promise<any> {
    try {
      return await this.prontuarioUseCase.compartilharArquivo(key, sub);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @CognitoUser('sub') sub: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log(file);
      return await this.prontuarioUseCase.enviarArquivo(
        sub,
        file.buffer,
        file.originalname,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
