import { plainToClass } from 'class-transformer';
import { IsDate, IsNotEmpty, validateSync } from 'class-validator';
import { ValueObject } from '../../../../core/domain/ValueObject';
import { Result } from '../../../../core/logic/Result';

class TimeScheduleProperties {
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}

export class TimeSchedule extends ValueObject<TimeScheduleProperties> {
  private constructor(properties: TimeScheduleProperties) {
    super(properties);
  }

  public static create(properties: TimeScheduleProperties): Result<TimeSchedule> {
    const propertiesClass = plainToClass(TimeScheduleProperties, properties);
    const result = validateSync(propertiesClass);
    if (result.length > 0) {
      return Result.fail<TimeSchedule>(result);
    }

    if (properties.startDate > properties.endDate) {
      return Result.fail<TimeSchedule>('Time schedule cannot start after its end');
    }

    if (!this.datesAreOnTheSameDay(properties.startDate, properties.endDate)) {
      return Result.fail<TimeSchedule>('Time schedule should end in the same day of its start');
    }

    if ((properties.endDate.getTime() - properties.startDate.getTime()) / 1000 < 15 * 60) {
      return Result.fail<TimeSchedule>('Time schedule should last, at least, 15 minutes');
    }

    return Result.ok<TimeSchedule>(new TimeSchedule(properties));
  }

  get startDate(): Date {
    return this.properties.startDate;
  }

  get endDate(): Date {
    return this.properties.endDate;
  }

  private static datesAreOnTheSameDay(start: Date, end: Date) {
    return (
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate()
    );
  }
}
