import { ConsultaModel } from 'src/adapters/outbound/models/consulta.model';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';

export interface IConsultaRepository {
  criarConsulta(consulta: ConsultaEntity): Promise<ConsultaModel>;
}

export const IConsultaRepository = Symbol('IConsultaRepository');
