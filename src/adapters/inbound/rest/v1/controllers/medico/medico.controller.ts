import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FiltrosMedicoDTO, MedicoDTO } from '../../presenters/medico.dto';
import { IMedicoUseCase } from 'src/domain/ports/medico/medico.use_case.port';
import { MedicoNaoLocalizado } from 'src/domain/exceptions/medico.exception';

@Controller('medico')
export class MedicoController {
  constructor(
    @Inject(IMedicoUseCase)
    private readonly medicoUseCase: IMedicoUseCase,
  ) {}

  @Get('/:id')
  async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<MedicoDTO> {
    try {
      return await this.medicoUseCase.buscarMedico(id);
    } catch (error) {
      if (error instanceof MedicoNaoLocalizado) {
        throw new NotFoundException(error.message);
      }
      throw new Error(`Erro ao buscar médico: ${error}`);
    }
  }

  @Get()
  async listar(@Query() filtros: FiltrosMedicoDTO): Promise<MedicoDTO[] | []> {
    try {
      return await this.medicoUseCase.listarMedicos(filtros);
    } catch (error) {
      throw new Error(`Erro ao filtrar médicos: ${error}`);
    }
  }
}
