import { TimeSchedule } from '../TimeSchedule';

describe('Time Schedule', () => {
  it('should not start after its end', () => {
    const schedule = TimeSchedule.create({
      startDate: new Date(Date.now() + 16 * 60000),
      endDate: new Date(),
    });

    expect(schedule.isFailure).toBeTruthy();
    expect(schedule.errorMessages).toContain('Time schedule cannot start after its end');
  });

  it('should be in the same day', () => {
    const endDate = new Date(Date.now() + 16 * 60000);
    endDate.setDate(endDate.getDate() + 1);
    const schedule = TimeSchedule.create({
      startDate: new Date(),
      endDate: endDate,
    });

    expect(schedule.isFailure).toBeTruthy();
    expect(schedule.errorMessages).toContain('Time schedule should end in the same day of its start');
  });

  it('should be at least 15 minutes long', () => {
    const schedule = TimeSchedule.create({
      startDate: new Date(),
      endDate: new Date(Date.now() + 10 * 60000),
    });

    expect(schedule.isFailure).toBeTruthy();
    expect(schedule.errorMessages).toContain('Time schedule should last, at least, 15 minutes');
  });

  it('should be valid if all rules are observed', () => {
    const schedule = TimeSchedule.create({
      startDate: new Date(),
      endDate: new Date(Date.now() + 16 * 60000),
    });

    expect(schedule.isSuccess).toBeTruthy();
    expect(schedule.getValue() instanceof TimeSchedule).toBeTruthy();
  });

  it('should have a start and an end date', () => {
    const properties: any = {};
    const result = TimeSchedule.create(properties);

    expect(result.isFailure).toBeTruthy();
    expect(result.errorMessages).toContain('startDate should not be empty');
    expect(result.errorMessages).toContain('endDate should not be empty');
  });
});
