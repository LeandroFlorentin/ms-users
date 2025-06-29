export class APIError extends Error {
  public code: number;
  constructor(code: number = 500, message: string = 'Error interno de servidor.') {
    super(message);
    this.name = 'APIError';
    this.code = code;
  }
}
