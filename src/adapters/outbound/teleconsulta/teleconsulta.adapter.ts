import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITeleconsultaPort } from 'src/domain/ports/teleconsulta/teleconsulta.port';

@Injectable()
export class TeleconsultaAdapter implements ITeleconsultaPort {
  private googleMeetApiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.googleMeetApiKey = this.configService.getOrThrow<string>(
      'GOOGLE_MEET_API_KEY',
    );
  }
  async gerarLinkGoogleMeet(): Promise<string> {
    //const googleMeetApiKey = this.googleMeetApiKey;
    const linkTeleconsulta = 'https://meet.google.com/xxx-yyyy-zzz';
    return linkTeleconsulta;
  }
}
