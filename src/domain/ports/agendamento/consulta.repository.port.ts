import { ConsultaModel } from 'src/adapters/outbound/models/consulta.model';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { StatusConsulta } from '../../../utils/statusConsulta.enum';

export interface IConsultaRepository {
  criarConsulta(consulta: ConsultaEntity): Promise<ConsultaModel>;
  buscarConsultaPorId(consultaId: string): Promise<ConsultaModel>;
  statusConsulta(
    consultaId: string,
    status: StatusConsulta,
  ): Promise<ConsultaModel>;
}

export const IConsultaRepository = Symbol('IConsultaRepository');
