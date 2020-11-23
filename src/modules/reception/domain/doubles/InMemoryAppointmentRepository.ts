import { Appointment } from "../appointment/Appointment";
import { AppointmentRepository } from "../appointment/AppointmentRepository";

export class InMemoryAppointmentRepository implements AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  store(appointment: Appointment): Promise<boolean> {
    this.appointments.push(appointment);
    return Promise.resolve(true);
  }

  getAppointmentsInPeriod(startPeriod: Date, endPeriod: Date): Promise<Appointment[]> {
    const results = [];
    this.appointments.forEach(appointment => {
      const startTime = appointment.timeSchedule.startDate.getTime();
      const endTime = appointment.timeSchedule.endDate.getTime();
      if (
        endTime >= startPeriod.getTime() && endTime <= endPeriod.getTime() ||
        startTime >= startPeriod.getTime() && startTime <= endPeriod.getTime() ||
        startTime <= startPeriod.getTime() && endTime >= startPeriod.getTime()
      ) {
        results.push(appointment);
      }
    })
    return Promise.resolve(results);
  }

  getAppointmentById(uuid: string): Promise<Appointment> {
    let result = null;
    this.appointments.forEach(element => {
      if (element.uuid === uuid) {
        result = element;
      }
    })

    return Promise.resolve(result);
  }

}