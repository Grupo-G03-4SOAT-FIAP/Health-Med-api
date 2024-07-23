export interface IProntuarioPort {
  listarArquivos(sub: string): Promise<any[]>;
  compartilharArquivo(key: string, sub: string): Promise<string>;
  enviarArquivo(
    sub: string,
    fileBuffer: Buffer,
    fileOriginalName: string,
  ): Promise<void>;
}

export const IProntuarioPort = Symbol('IProntuarioPort');
