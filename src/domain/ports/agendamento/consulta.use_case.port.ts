import {
  ConsultaDTO,
  AgendarConsultaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';
import { StatusConsulta } from '../../../utils/statusConsulta.enum';

export interface IConsultaUseCase {
  agendarConsulta(consulta: AgendarConsultaDTO): Promise<ConsultaDTO>;
  buscarConsultaPorId(consultaId: string): Promise<ConsultaDTO>;
  statusConsulta(
    consultaId: string,
    status: StatusConsulta,
  ): Promise<ConsultaDTO>;
}

export const IConsultaUseCase = Symbol('IConsultaUseCase');
