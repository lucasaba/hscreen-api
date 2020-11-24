import { Appointment } from '../domain/appointment/Appointment';
import { AppointmentRepository } from '../domain/appointment/AppointmentRepository';

export class MongoAppointmentRepository implements AppointmentRepository {
  store(appointment: Appointment): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getAppointmentsInPeriod(startPeriod: Date, endPeriod: Date): Promise<Appointment[]> {
    throw new Error('Method not implemented.');
  }

  getAppointmentById(uuid: string): Promise<Appointment> {
    throw new Error('Method not implemented.');
  }
}
