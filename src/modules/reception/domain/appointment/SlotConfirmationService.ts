import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from './AppointmentRepository';
import { Appointment } from './Appointment';
import { InvalidAppointmentException } from './exception/InvalidAppointmentException';

@Injectable()
export class SlotConfirmationService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async confirmAppointment(appointment: Appointment) {
    this.checkNotInThePast(appointment);
    await this.checkSlotIsNotTaken(appointment);

    return this.appointmentRepository.store(appointment);
  }

  private async checkSlotIsNotTaken(appointment: Appointment) {
    const appointments = await this.appointmentRepository.getAppointmentsInPeriod(
      appointment.timeSchedule.startDate,
      appointment.timeSchedule.endDate,
    );

    if (appointments.length > 0) {
      throw new InvalidAppointmentException(
        'Appointment is overlapping with other appointments',
      );
    }
  }

  private checkNotInThePast(appointment: Appointment) {
    if (Date.now() > appointment.timeSchedule.startDate.getTime()) {
      throw new InvalidAppointmentException(
        'Appointments cannot start in the past',
      );
    }
  }
}
