import { Appointment } from './Appointment';

export interface AppointmentRepository {
  store(appointment: Appointment): Promise<boolean>;
  getAppointmentsInPeriod(
    startPeriod: Date,
    endPeriod: Date,
  ): Promise<Appointment[]>;
  getAppointmentById(uuid: string): Promise<Appointment>;
}
