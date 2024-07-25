import { SpacesServiceClient } from '@google-apps/meet';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'google-auth-library';
import { ITeleconsultaPort } from 'src/domain/ports/teleconsulta/teleconsulta.port';

@Injectable()
export class TeleconsultaAdapter implements ITeleconsultaPort {
  private creds: string;

  constructor(private readonly configService: ConfigService) {
    this.creds = this.configService.get<string>(
      'GOOGLE_AUTHORIZED_USER_CREDS',
    );
  }
  async gerarLinkGoogleMeet(): Promise<string> {
    let linkTeleconsulta = 'https://meet.google.com/xxx-yyyy-zzz';

    try {
      const credentials = JSON.parse(this.creds);
      const client = auth.fromJSON(credentials);

      const meetClient = new SpacesServiceClient({
        authClient: client as any,
      });

      const request = {
        space: {
          config: {
            accessType: 1,
          },
        },
      };

      const response = await meetClient.createSpace(request);

      if (response) {
        linkTeleconsulta = response[0].meetingUri;
      }
    } catch (error) {
      console.error(error);
    }

    return linkTeleconsulta;
  }
}
