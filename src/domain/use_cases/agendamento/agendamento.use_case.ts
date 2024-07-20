import { Inject, Injectable } from '@nestjs/common';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agendamento';
import { IAgendamentoRepository } from 'src/domain/ports/agendamento/agendamento.repository.port';
import { IAgendamentoUseCase } from 'src/domain/ports/agendamento/agendamento.use_case.port';

@Injectable()
export class AgendamentoUseCase implements IAgendamentoUseCase {
  constructor(
    @Inject(IAgendamentoRepository)
    private readonly agendamentoRepository: IAgendamentoRepository,
  ) {}

  create(horario: Horarios): Promise<Horarios> {
    return this.agendamentoRepository.create(horario);
  }

  findByDoctorId(doctorId: string): Promise<Horarios[]> {
    return this.agendamentoRepository.findByDoctorId(doctorId);
  }

  async update(id: string, horario: Horarios): Promise<void> {
    await this.agendamentoRepository.update(id, horario);
  }

  async remove(id: string): Promise<void> {
    await this.agendamentoRepository.remove(id);
  }

  async markAsBooked(id: string): Promise<void> {
    await this.agendamentoRepository.markAsBooked(id, { isBooked: true });
  }

  async markAsFree(id: string): Promise<void> {
    await this.agendamentoRepository.markAsFree(id, { isBooked: false });
  }
}
