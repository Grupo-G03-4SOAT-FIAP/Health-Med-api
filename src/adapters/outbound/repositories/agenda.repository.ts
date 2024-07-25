import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agenda.dto';
import { IAgendaRepository } from 'src/domain/ports/agendamento/agenda.repository.port';
import { AgendaModel } from '../models/agenda.model';
import { AgendaOcupada } from 'src/domain/exceptions/agenda.exception';

@Injectable()
export class AgendaRepository implements IAgendaRepository {
  constructor(
    @InjectRepository(AgendaModel)
    private readonly repository: Repository<AgendaModel>,
  ) {}

  async criarAgenda(horario: Horarios): Promise<AgendaModel> {
    const { medicoId, data, horaInicio, horaFim } = horario;

    const horarioExistente = await this.repository.findOne({
      where: {
        medicoId,
        data,
        horaInicio,
        horaFim,
      },
    });

    if (horarioExistente) {
      throw new AgendaOcupada(
        'Horário já está ocupado no mesmo dia para este médico',
      );
    }
    return await this.repository.save(horario);
  }

  async buscarAgendaPorMedicoId(medicoId: string): Promise<AgendaModel[]> {
    return await this.repository.find({ where: { medicoId } });
  }

  async editarAgenda(id: string, horario: Horarios): Promise<void> {
    await this.repository.update(id, horario);
  }

  async excluirAgenda(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async reservarAgenda(id: string): Promise<void> {
    await this.repository.update(id, { reservado: true });
  }

  async liberarAgenda(id: string): Promise<void> {
    await this.repository.update(id, { reservado: false });
  }
}
