import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agendamento';
import { IAgendamentoRepository } from 'src/domain/ports/agendamento/agendamento.repository.port';
import { AgendamentoModel } from '../models/agendamento.model';

@Injectable()
export class AgendamentoRepository implements IAgendamentoRepository {
  constructor(
    @InjectRepository(AgendamentoModel)
    private readonly agendamentoRepository: Repository<AgendamentoModel>,
  ) {}

  async create(horario: Horarios): Promise<AgendamentoModel> {
    const { doctorId, date, startTime, endTime } = horario;

    const horarioExistente = await this.agendamentoRepository.findOne({
      where: {
        doctorId,
        date,
        startTime,
        endTime,
      },
    });

    if (horarioExistente) {
      console.log(horarioExistente);
      throw new Error('Horário já está ocupado no mesmo dia para este médico.');
    }
    return this.agendamentoRepository.save(horario);
  }
  findByDoctorId(doctorId: string): Promise<AgendamentoModel[]> {
    return this.agendamentoRepository.find({ where: { doctorId } });
  }

  async update(id: string, horario: Horarios): Promise<void> {
    await this.agendamentoRepository.update(id, horario);
  }

  async remove(id: string): Promise<void> {
    await this.agendamentoRepository.delete(id);
  }

  async markAsBooked(id: string): Promise<void> {
    await this.agendamentoRepository.update(id, { isBooked: true });
  }

  async markAsFree(id: string): Promise<void> {
    await this.agendamentoRepository.update(id, { isBooked: false });
  }
}
