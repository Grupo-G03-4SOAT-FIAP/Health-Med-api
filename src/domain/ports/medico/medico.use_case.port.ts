import {
  FiltrosMedicoDTO,
  MedicoDTO,
} from 'src/adapters/inbound/rest/v1/presenters/medico.dto';

export interface IMedicoUseCase {
  buscarMedico(medicoId: string): Promise<MedicoDTO>;
  listarMedicos(filtros: FiltrosMedicoDTO): Promise<MedicoDTO[] | []>;
}

export const IMedicoUseCase = Symbol('IMedicoUseCase');
