import { MedicoModel } from 'src/adapters/outbound/models/medico.model';

export interface IMedicoRepository {
  buscarMedicoPorId(medicoId: string): Promise<MedicoModel | null>;
  listarMedicosDisponiveis(): Promise<MedicoModel[] | []>;
}

export const IMedicoRepository = Symbol('IMedicoRepository');
