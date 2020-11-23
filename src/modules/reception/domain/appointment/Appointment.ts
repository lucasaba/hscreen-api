import { Entity } from '../../../../core/domain/Entity';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { Result } from '../../../../core/logic/Result';
import { Patient } from './Patient';
import { TimeSchedule } from './TimeSchedule';

interface AppointmentProperties {
  patient: Patient;
  timeSchedule: TimeSchedule;
}

export class Appointment extends Entity<AppointmentProperties> {
  private constructor(properties: AppointmentProperties, id?: UniqueEntityID) {
    super(properties, id);
  }

  public static create(properties: AppointmentProperties, id?: UniqueEntityID) {
    return Result.ok(new Appointment(properties, id));
  }

  get patient(): Patient {
    return this.properties.patient;
  }

  get timeSchedule(): TimeSchedule {
    return this.properties.timeSchedule;
  }
}
