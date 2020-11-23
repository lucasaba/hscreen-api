import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, validateSync } from 'class-validator';
import { ValueObject } from '../../../../core/domain/ValueObject';
import { Result } from '../../../../core/logic/Result';

class PatientProperties {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  familyName: string;

  @IsOptional()
  @IsString()
  fiscalId?: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class Patient extends ValueObject<PatientProperties> {
  private constructor(properties: PatientProperties) {
    super(properties);
  }

  public static create(properties: PatientProperties): Result<Patient> {
    const propertiesClass = plainToClass(PatientProperties, properties);
    const result = validateSync(propertiesClass);
    if (result.length > 0) {
      return Result.fail<Patient>(result);
    }

    return Result.ok<Patient>(new Patient(properties));
  }

  get name(): string {
    return this.properties.name;
  }

  get familyName(): string {
    return this.properties.familyName;
  }

  get mobileNumber(): string {
    return this.properties.mobileNumber;
  }

  get fiscalId(): string {
    return this.properties.fiscalId;
  }

  get phoneNumber(): string {
    return this.properties.phoneNumber;
  }
}
