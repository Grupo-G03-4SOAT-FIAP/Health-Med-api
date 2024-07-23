import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FiltrosMedicoDTO, MedicoDTO } from '../../presenters/medico.dto';
import { IMedicoUseCase } from 'src/domain/ports/medico/medico.use_case.port';
import { MedicoNaoLocalizado } from 'src/domain/exceptions/medico.exception';
import { NotFoundError } from '../../helpers/swagger/status-codes/not_found.swagger';

@Controller('medico')
@ApiTags('Medico')
export class MedicoController {
  constructor(
    @Inject(IMedicoUseCase)
    private readonly medicoUseCase: IMedicoUseCase,
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar um Medico pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Medico retornado com sucesso',
    type: MedicoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Medico informado não existe',
    type: NotFoundError,
  })
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
  @ApiOperation({ summary: 'Listar todos os Medicos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Medicos retornada com sucesso',
    type: MedicoDTO,
    isArray: true,
  })
  async listar(@Query() filtros: FiltrosMedicoDTO): Promise<MedicoDTO[] | []> {
    try {
      return await this.medicoUseCase.listarMedicos(filtros);
    } catch (error) {
      throw new Error(`Erro ao filtrar médicos: ${error}`);
    }
  }
}
