import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConsultaRepository } from 'src/domain/ports/agendamento/consulta.repository.port';
import { ConsultaModel } from '../models/consulta.model';
import { ConsultaEntity } from 'src/domain/entities/consulta.entity';

@Injectable()
export class ConsultaRepository implements IConsultaRepository {
  constructor(
    @InjectRepository(ConsultaModel)
    private readonly repository: Repository<ConsultaModel>,
  ) {}

  async criarConsulta(consulta: ConsultaEntity): Promise<ConsultaModel> {
    const novaConsulta = this.repository.create(consulta);
    await this.repository.save(novaConsulta);
    return novaConsulta;
  }
}
