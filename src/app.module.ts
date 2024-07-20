import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MedicoModel]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [AppController, MedicoController],
  providers: [
    AppUseCase,
    MedicoUseCase,
    {
      provide: IMedicoUseCase,
      useClass: MedicoUseCase,
    },
    {
      provide: IMedicoRepository,
      useClass: MedicoRepository,
    },
  ],
})
export class AppModule {}
