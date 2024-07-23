export interface ITeleconsultaPort {
  gerarLinkGoogleMeet(): Promise<string>;
}

export const ITeleconsultaPort = Symbol('ITeleconsultaPort');
