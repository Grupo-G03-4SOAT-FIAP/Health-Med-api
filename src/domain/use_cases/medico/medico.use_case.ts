import { Inject, Injectable } from '@nestjs/common';
import {
  FiltrosMedicoDTO,
  MedicoDTO,
} from 'src/adapters/inbound/rest/v1/presenters/medico.dto';
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

  async buscarMedico(medicoId: string): Promise<MedicoDTO> {
    const medicoModel = await this.medicoRepository.buscarMedicoPorId(medicoId);
    if (!medicoModel) {
      throw new MedicoNaoLocalizado('Médico não localizado');
    }

    const medico = new MedicoDTO();
    medico.id = medicoModel.id;
    medico.nome = medicoModel.nome;
    medico.crm = medicoModel.crm;
    medico.especialidade = medicoModel.especialidade;
    medico.valorConsulta = medicoModel.valorConsulta;
    medico.avaliacao = medicoModel.avaliacao;
    medico.distancia = medicoModel.distancia;

    return medico;
  }

  async listarMedicos(filtros: FiltrosMedicoDTO): Promise<MedicoDTO[] | []> {
    const medicosModel =
      await this.medicoRepository.listarMedicosDisponiveis(filtros);
    const listamedicos = medicosModel.map((medicoModel: MedicoModel) => {
      const medico = new MedicoDTO();
      medico.id = medicoModel.id;
      medico.nome = medicoModel.nome;
      medico.crm = medicoModel.crm;
      medico.especialidade = medicoModel.especialidade;
      medico.valorConsulta = medicoModel.valorConsulta;
      medico.avaliacao = medicoModel.avaliacao;
      medico.distancia = medicoModel.distancia;

      return medico;
    });

    return listamedicos;
  }
}
