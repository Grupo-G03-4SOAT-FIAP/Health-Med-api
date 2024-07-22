import { Inject, Injectable } from '@nestjs/common';
import { IProntuarioService } from 'src/domain/ports/prontuario/prontuario.service.port';
import { IProntuarioUseCase } from 'src/domain/ports/prontuario/prontuario.use_case.port';

@Injectable()
export class ProntuarioUseCase implements IProntuarioUseCase {
  constructor(
    @Inject(IProntuarioService)
    private readonly prontuarioService: IProntuarioService,
  ) {}
  async listarArquivos(sub: string): Promise<any[]> {
    return await this.prontuarioService.listarArquivos(sub);
  }

  async compartilharArquivo(key: string, sub: string): Promise<string> {
    return await this.prontuarioService.compartilharArquivo(key, sub);
  }

  async enviarArquivo(
    sub: string,
    fileBuffer: Buffer,
    fileOriginalName: string,
  ): Promise<void> {
    return await this.prontuarioService.enviarArquivo(
      sub,
      fileBuffer,
      fileOriginalName,
    );
  }
}
