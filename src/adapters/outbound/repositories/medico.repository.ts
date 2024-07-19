import { Injectable } from '@nestjs/common';
import { IMedicoRepository } from 'src/domain/ports/medico/medico.repository.port';
import { MedicoModel } from '../models/medico.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MedicoRepository implements IMedicoRepository {
  constructor(
    @InjectRepository(MedicoModel)
    private readonly repository: Repository<MedicoModel>,
  ) {}

  async buscarMedicoPorId(medicoId: string): Promise<MedicoModel | null> {
    return await this.repository.findOne({
      where: { id: medicoId },
    });
  }
  async listarMedicosDisponiveis(): Promise<MedicoModel[] | []> {
    return await this.repository.find({
      where: { disponibilidade: true },
    });
  }
}
