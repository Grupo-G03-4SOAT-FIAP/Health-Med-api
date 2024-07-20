import { MedicoDTO } from 'src/adapters/inbound/rest/v1/presenters/medico.dto';

export interface IMedicoUseCase {
  buscarMedico(medicoId: string): Promise<MedicoDTO>;
  listarMedicos(): Promise<MedicoDTO[] | []>;
}

export const IMedicoUseCase = Symbol('IMedicoUseCase');
