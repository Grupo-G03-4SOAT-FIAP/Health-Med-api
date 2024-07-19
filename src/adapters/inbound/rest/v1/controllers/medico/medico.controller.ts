import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { Medico } from '../../presenters/medico';
import { IMedicoUseCase } from 'src/domain/ports/medico/medico.use_case.port';
import { MedicoNaoLocalizado } from 'src/domain/exceptions/medico.exception';

@Controller('medico')
export class MedicoController {
  constructor(
    @Inject(IMedicoUseCase)
    private readonly medicoUseCase: IMedicoUseCase,
  ) {}

  @Get('/:id')
  async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<Medico> {
    try {
      return await this.medicoUseCase.buscarMedico(id);
    } catch (error) {
      if (error instanceof MedicoNaoLocalizado) {
        throw new MedicoNaoLocalizado(error.message);
      }
      throw new Error(`Erro ao buscar médico: ${error}`);
    }
  }

  @Get()
  async listar(): Promise<Medico[] | []> {
    try {
      return await this.medicoUseCase.listarMedicos();
    } catch (error) {
      throw new Error(`Erro ao listar médicos: ${error}`);
    }
  }
}
