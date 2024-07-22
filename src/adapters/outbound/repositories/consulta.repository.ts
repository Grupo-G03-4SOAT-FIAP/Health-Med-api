import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConsultaRepository } from 'src/domain/ports/agendamento/consulta.repository.port';
import { ConsultaModel } from '../models/consulta.model';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';
import { StatusConsulta } from 'src/utils/statusConsulta.enum';
import { AgendaModel } from '../models/agenda.model';

@Injectable()
export class ConsultaRepository implements IConsultaRepository {
  constructor(
    @InjectRepository(ConsultaModel)
    private readonly repository: Repository<ConsultaModel>,
    @InjectRepository(AgendaModel)
    private readonly agendaRepository: Repository<AgendaModel>,
  ) {}

  async criarConsulta(consulta: ConsultaEntity): Promise<ConsultaModel> {
    const novaConsulta = this.repository.create(consulta);
    await this.repository.save(novaConsulta);
    return novaConsulta;
  }

  async buscarConsultaPorId(consultaId: string): Promise<ConsultaModel> {
    const consulta = await this.repository.findOne({
      where: { id: consultaId },
    });
    return consulta;
  }

  async statusConsulta(
    consultaId: string,
    status: StatusConsulta,
  ): Promise<ConsultaModel> {
    await this.repository.update(consultaId, { statusConsulta: status });
    const novaConsulta = await this.repository.findOne({
      where: { id: consultaId },
    });

    if (
      novaConsulta.statusConsulta === StatusConsulta.CANCELADA ||
      novaConsulta.statusConsulta === StatusConsulta.NAO_REALIZADA ||
      novaConsulta.statusConsulta === StatusConsulta.RECUSADA
    ) {
      await this.agendaRepository.update(novaConsulta.agendaId, {
        reservado: false,
      });
    } else {
      await this.agendaRepository.update(novaConsulta.agendaId, {
        reservado: true,
      });
    }
    return novaConsulta;
  }
}
