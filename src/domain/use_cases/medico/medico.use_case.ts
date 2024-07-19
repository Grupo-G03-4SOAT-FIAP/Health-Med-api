import { Inject, Injectable } from '@nestjs/common';
import { Medico } from 'src/adapters/inbound/rest/v1/presenters/medico';
import { MedicoModel } from 'src/adapters/outbound/models/medico.model';
import { MedicoNaoLocalizado } from 'src/domain/exceptions/medico.exception';
import { IMedicoRepository } from 'src/domain/ports/medico/medico.repository.port';
import { IMedicoUseCase } from 'src/domain/ports/medico/medico.use_case.port';

@Injectable()
export class MedicoUseCase implements IMedicoUseCase {
  constructor(
    @Inject(IMedicoRepository)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async buscarMedico(medicoId: string): Promise<Medico> {
    const medicoModel = await this.medicoRepository.buscarMedicoPorId(medicoId);
    if (!medicoModel) {
      throw new MedicoNaoLocalizado('Médico não localizado');
    }

    const medico = new Medico();
    medico.id = medicoModel.id;
    medico.nome = medicoModel.nome;
    medico.crm = medicoModel.crm;
    medico.especialidade = medicoModel.especialidade;
    medico.avaliacao = medicoModel.avaliacao;
    medico.distancia = medicoModel.distancia;

    return medico;
  }

  async listarMedicos(): Promise<Medico[] | []> {
    const medicosModel = await this.medicoRepository.listarMedicosDisponiveis();
    const listamedicos = medicosModel.map((medicoModel: MedicoModel) => {
      const medico = new Medico();
      medico.id = medicoModel.id;
      medico.nome = medicoModel.nome;
      medico.crm = medicoModel.crm;
      medico.especialidade = medicoModel.especialidade;
      medico.avaliacao = medicoModel.avaliacao;
      medico.distancia = medicoModel.distancia;

      return medico;
    });

    return listamedicos;
  }
}
