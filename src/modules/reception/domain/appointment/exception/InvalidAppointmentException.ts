export class InvalidAppointmentException extends Error {
  constructor(message: string) {
    super(message);
  }
}