import { IAgendamentoRepository } from 'src/domain/ports/agendamento/agendamento.repository.port';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUseCase } from './domain/use_cases/app/app.use_case';
import { AppController } from './adapters/inbound/rest/v1/controllers/app/app.controller';
import { MedicoController } from './adapters/inbound/rest/v1/controllers/medico/medico.controller';
import { MedicoUseCase } from './domain/use_cases/medico/medico.use_case';
import { MedicoModel } from './adapters/outbound/models/medico.model';
import { PostgresConfigService } from './adapters/outbound/database/postgres.config.service';
import { IMedicoUseCase } from './domain/ports/medico/medico.use_case.port';
import { IMedicoRepository } from './domain/ports/medico/medico.repository.port';
import { MedicoRepository } from './adapters/outbound/repositories/medico.repository';
import { AgendamentoUseCase } from './domain/use_cases/agendamento/agendamento.use_case';
import { IAgendamentoUseCase } from './domain/ports/agendamento/agendamento.use_case.port';
import { AgendamentoRepository } from './adapters/outbound/repositories/agendamento.repository';
import { AgendamentoController } from './adapters/inbound/rest/v1/controllers/agendamento/agendamento.controller';
import { AgendamentoModel } from './adapters/outbound/models/agendamento.model';
import { CognitoAuthModule } from '@nestjs-cognito/auth';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MedicoModel, AgendamentoModel]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const pacientePoolID = configService.get<string>(
          'COGNITO_USER_POOL_ID_1',
        );
        const pacienteID = configService.get<string>('COGNITO_CLIENT_ID_1');
        const medicoPoolID = configService.get<string>(
          'COGNITO_USER_POOL_ID_2',
        );
        const medicoID = configService.get<string>('COGNITO_CLIENT_ID_2');

        return {
          jwtVerifier: [
            {
              userPoolId: pacientePoolID,
              clientId: pacienteID,
              tokenUse: 'id',
            },
            {
              userPoolId: medicoPoolID,
              clientId: medicoID,
              tokenUse: 'id',
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, MedicoController, AgendamentoController],
  providers: [
    AppUseCase,
    MedicoUseCase,
    AgendamentoUseCase,
    {
      provide: IMedicoUseCase,
      useClass: MedicoUseCase,
    },
    {
      provide: IMedicoRepository,
      useClass: MedicoRepository,
    },
    {
      provide: IAgendamentoUseCase,
      useClass: AgendamentoUseCase,
    },
    {
      provide: IAgendamentoRepository,
      useClass: AgendamentoRepository,
    },
  ],
})
export class AppModule {}
