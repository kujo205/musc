export class NetworkError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'NetworkError';
    this.code = code;
  }
}
