// Mock do ConfigService
export const mockStripe = () => ({
  get: () => 'test',
  getOrThrow: () => 'test',
});

export const mockProntuarioUseCase = {
  listarArquivos: jest.fn(),
  compartilharArquivo: jest.fn(),
  enviarArquivo: jest.fn(),
};

// Mock jest das funções da service de Prontuário
export const prontuarioAdapterMock = {
  listarArquivos: jest.fn(),
  compartilharArquivo: jest.fn(),
  enviarArquivo: jest.fn(),
};
