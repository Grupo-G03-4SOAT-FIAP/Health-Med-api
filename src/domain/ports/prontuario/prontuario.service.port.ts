export interface IProntuarioService {
  listarArquivos(sub: string): Promise<any[]>;
  compartilharArquivo(key: string, sub: string): Promise<string>;
  enviarArquivo(
    sub: string,
    fileBuffer: Buffer,
    fileOriginalName: string,
  ): Promise<void>;
}

export const IProntuarioService = Symbol('IProntuarioService');
