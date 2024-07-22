import { IAgendaRepository } from 'src/domain/ports/agendamento/agenda.repository.port';
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
import { AgendaUseCase } from './domain/use_cases/agendamento/agenda.use_case';
import { IAgendaUseCase } from './domain/ports/agendamento/agenda.use_case.port';
import { AgendaRepository } from './adapters/outbound/repositories/agenda.repository';
import { AgendaModel } from './adapters/outbound/models/agenda.model';
import { AgendaController } from './adapters/inbound/rest/v1/controllers/agendamento/agenda.controller';
import { ConsultaController } from './adapters/inbound/rest/v1/controllers/agendamento/consulta.controller';
import { ConsultaUseCase } from './domain/use_cases/agendamento/consulta.use_case';
import { IConsultaRepository } from './domain/ports/agendamento/consulta.repository.port';
import { ConsultaRepository } from './adapters/outbound/repositories/consulta.repository';
import { ConsultaModel } from './adapters/outbound/models/consulta.model';
import { IConsultaUseCase } from './domain/ports/agendamento/consulta.use_case.port';
import { AuthenticationGuard, CognitoAuthModule } from '@nestjs-cognito/auth';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MedicoModel, AgendaModel, ConsultaModel]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: configService.getOrThrow(
            'COGNITO_USER_POOL_ID',
          ) as string,
          clientId: configService.getOrThrow('COGNITO_CLIENT_ID'),
          tokenUse: 'id',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AppController,
    AuthenticationGuard,
    MedicoController,
    AgendaController,
    ConsultaController,
  ],
  providers: [
    AppUseCase,
    MedicoUseCase,
    AgendaUseCase,
    ConsultaUseCase,
    {
      provide: IMedicoUseCase,
      useClass: MedicoUseCase,
    },
    {
      provide: IMedicoRepository,
      useClass: MedicoRepository,
    },
    {
      provide: IAgendaUseCase,
      useClass: AgendaUseCase,
    },
    {
      provide: IAgendaRepository,
      useClass: AgendaRepository,
    },
    {
      provide: IConsultaUseCase,
      useClass: ConsultaUseCase,
    },
    {
      provide: IConsultaRepository,
      useClass: ConsultaRepository,
    },
  ],
})
export class AppModule {}
