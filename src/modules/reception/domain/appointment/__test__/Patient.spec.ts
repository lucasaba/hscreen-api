import { Patient } from '../Patient';

describe('Patient', () => {
  let testData: any = {};

  it('checks that a patient must have a name, a familyName and a mobile number', () => {
    const result = Patient.create(testData);
    expect(result.isFailure).toBeTruthy();
    expect(result.errorMessages).toContain('name should not be empty');
    expect(result.errorMessages).toContain('familyName should not be empty');
    expect(result.errorMessages).toContain('mobilePhone should not be empty');
  });

  it('checks that a patient have a name', () => {
    testData = {
      name: 'John',
      mobilePhone: '555-54322118',
    };
    const result = Patient.create(testData);
    expect(result.isFailure).toBeTruthy();
    expect(result.errorMessages).not.toContain('name should not be empty');
    expect(result.errorMessages).toContain('familyName should not be empty');
    expect(result.errorMessages).not.toContain('mobilePhone should not be empty');
  });

  it('let access to its data', () => {
    testData = {
      name: 'John',
      familyName: 'Doe',
      mobilePhone: '555-54322118',
    };
    const result = Patient.create(testData);
    expect(result.isSuccess).toBeTruthy();
    const patient = result.getValue();
    expect(patient.name).toEqual('John');
    expect(patient.familyName).toEqual('Doe');
    expect(patient.mobilePhone).toEqual('555-54322118');
  });
});
