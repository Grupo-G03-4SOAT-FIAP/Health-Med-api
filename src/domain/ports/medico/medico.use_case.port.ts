import { Medico } from 'src/adapters/inbound/rest/v1/presenters/medico';

export interface IMedicoUseCase {
  buscaMedico(medicoId: string): Promise<Medico>;
  listaMedicos(): Promise<Medico[] | []>;
}

export const IMedicoUseCase = Symbol('IMedicoUseCase');
