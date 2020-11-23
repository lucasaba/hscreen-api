import { InMemoryAppointmentRepository } from "../../doubles/InMemoryAppointmentRepository";
import { Appointment } from "../Appointment";
import { AppointmentRepository } from "../AppointmentRepository";
import { InvalidAppointmentException } from "../exception/InvalidAppointmentException";
import { Patient } from "../Patient";
import { SlotConfirmationService } from "../SlotConfirmationService";
import { TimeSchedule } from "../TimeSchedule";

describe('Slot Confirmation Service', () => {
  let slotConfirmationService: SlotConfirmationService;
  let patient = Patient.create({
    familyName: 'Smith',
    name: 'John',
    mobileNumber: '555-5467897',
  }).getValue();

  beforeEach(async () => {
    slotConfirmationService = new SlotConfirmationService(new InMemoryAppointmentRepository());
    // Add an appointment of 15 minutes in 15 minutes from now
    const appointmentOne = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() + 15*60000),
        endDate: new Date(Date.now() + 30*60000),
      }).getValue(),
    }).getValue();
    await slotConfirmationService.confirmAppointment(appointmentOne);

    // Add an appointment of 15 minutes in 45 minutes from now
    const appointmentTwo = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() + 45*60000),
        endDate: new Date(Date.now() + 60*60000),
      }).getValue(),
    }).getValue();
    await slotConfirmationService.confirmAppointment(appointmentTwo);
  });

  it('block appointment if it is in the past', async () => {
    const appointmentInThePast = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() - 30*60000),
        endDate: new Date(),
      }).getValue(),
    }).getValue();
    
    await expect(slotConfirmationService.confirmAppointment(appointmentInThePast)).rejects.toThrowError(InvalidAppointmentException);
  });

  it('block appointment if overlaps other appointments', async () => {
    let appointmentTest = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() + 10*60000),
        endDate: new Date(Date.now() + 20*60000),
      }).getValue(),
    }).getValue();
    await expect(slotConfirmationService.confirmAppointment(appointmentTest)).rejects.toThrowError(InvalidAppointmentException);

    appointmentTest = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() + 18*60000),
        endDate: new Date(Date.now() + 20*60000),
      }).getValue(),
    }).getValue();
    await expect(slotConfirmationService.confirmAppointment(appointmentTest)).rejects.toThrowError(InvalidAppointmentException);

    appointmentTest = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() + 18*60000),
        endDate: new Date(Date.now() + 46*60000),
      }).getValue(),
    }).getValue();
    await expect(slotConfirmationService.confirmAppointment(appointmentTest)).rejects.toThrowError(InvalidAppointmentException);

    appointmentTest = Appointment.create({
      patient: patient,
      timeSchedule: TimeSchedule.create({
        startDate: new Date(Date.now() + 1*60000),
        endDate: new Date(Date.now() + 65*60000),
      }).getValue(),
    }).getValue();
    await expect(slotConfirmationService.confirmAppointment(appointmentTest)).rejects.toThrowError(InvalidAppointmentException);
  });

  it.skip('block appointment if overlaps other appointments', async () => {
  });
});