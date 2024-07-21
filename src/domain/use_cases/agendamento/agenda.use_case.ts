import { Inject, Injectable } from '@nestjs/common';
import { Horarios } from 'src/adapters/inbound/rest/v1/presenters/agenda.dto';
import { IAgendaRepository } from 'src/domain/ports/agendamento/agenda.repository.port';
import { IAgendaUseCase } from 'src/domain/ports/agendamento/agenda.use_case.port';

@Injectable()
export class AgendaUseCase implements IAgendaUseCase {
  constructor(
    @Inject(IAgendaRepository)
    private readonly AgendaRepository: IAgendaRepository,
  ) {}

  async criarAgenda(horario: Horarios): Promise<Horarios> {
    return this.AgendaRepository.criarAgenda(horario);
  }

  async buscarAgenda(medicoId: string): Promise<Horarios[] | []> {
    return this.AgendaRepository.buscarAgendaPorMedicoId(medicoId);
  }

  async editarAgenda(id: string, horario: Horarios): Promise<void> {
    await this.AgendaRepository.editarAgenda(id, horario);
  }

  async excluirAgenda(id: string): Promise<void> {
    await this.AgendaRepository.excluirAgenda(id);
  }

  async reservarAgenda(id: string): Promise<void> {
    await this.AgendaRepository.reservarAgenda(id);
  }

  async liberarAgenda(id: string): Promise<void> {
    await this.AgendaRepository.liberarAgenda(id);
  }
}
