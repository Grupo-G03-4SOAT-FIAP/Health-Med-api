import { MedicoModel } from 'src/adapters/outbound/models/medico.model';

export interface IMedicoRepository {
  buscarMedicoPorId(medicoId: string): Promise<MedicoModel | null>;
  listarMedicos(): Promise<MedicoModel[] | []>;
}

export const IMedicoRepository = Symbol('IMedicoRepository');
