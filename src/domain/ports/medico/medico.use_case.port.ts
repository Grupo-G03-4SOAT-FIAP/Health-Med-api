import { Medico } from 'src/adapters/inbound/rest/v1/presenters/medico';

export interface IMedicoUseCase {
  buscarMedico(medicoId: string): Promise<Medico>;
  listarMedicos(): Promise<Medico[] | []>;
}

export const IMedicoUseCase = Symbol('IMedicoUseCase');
