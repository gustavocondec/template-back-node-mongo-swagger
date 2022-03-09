export class CustomError extends Error {
  status: number;
  errors: Array<any>;
  constructor(status: number, message: string | undefined,errors?:Array<any>) {
    super(message);
    this.status = status || 500;
    this.errors = errors || []
    this.message = message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo';
  }
}
