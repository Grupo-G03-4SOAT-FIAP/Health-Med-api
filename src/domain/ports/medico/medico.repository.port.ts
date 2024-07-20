import { FiltrosMedicoDTO } from 'src/adapters/inbound/rest/v1/presenters/medico.dto';
import { MedicoModel } from 'src/adapters/outbound/models/medico.model';

export interface IMedicoRepository {
  buscarMedicoPorId(medicoId: string): Promise<MedicoModel | null>;
  listarMedicosDisponiveis(
    filtros: FiltrosMedicoDTO,
  ): Promise<MedicoModel[] | []>;
}

export const IMedicoRepository = Symbol('IMedicoRepository');
