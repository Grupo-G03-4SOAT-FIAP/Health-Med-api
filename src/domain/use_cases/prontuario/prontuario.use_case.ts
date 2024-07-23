import { Inject, Injectable } from '@nestjs/common';
import { IProntuarioPort } from 'src/domain/ports/prontuario/prontuario.port';
import { IProntuarioUseCase } from 'src/domain/ports/prontuario/prontuario.use_case.port';

@Injectable()
export class ProntuarioUseCase implements IProntuarioUseCase {
  constructor(
    @Inject(IProntuarioPort)
    private readonly prontuarioAdapter: IProntuarioPort,
  ) {}
  async listarArquivos(sub: string): Promise<any[]> {
    return await this.prontuarioAdapter.listarArquivos(sub);
  }

  async compartilharArquivo(key: string, sub: string): Promise<string> {
    return await this.prontuarioAdapter.compartilharArquivo(key, sub);
  }

  async enviarArquivo(
    sub: string,
    fileBuffer: Buffer,
    fileOriginalName: string,
  ): Promise<void> {
    return await this.prontuarioAdapter.enviarArquivo(
      sub,
      fileBuffer,
      fileOriginalName,
    );
  }
}
