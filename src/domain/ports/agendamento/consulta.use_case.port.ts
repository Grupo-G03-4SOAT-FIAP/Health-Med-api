import {
  ConsultaDTO,
  AgendarConsultaDTO,
} from 'src/adapters/inbound/rest/v1/presenters/consulta.dto';

export interface IConsultaUseCase {
  agendarConsulta(consulta: AgendarConsultaDTO): Promise<ConsultaDTO>;
}

export const IConsultaUseCase = Symbol('IConsultaUseCase');
