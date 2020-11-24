import { ValidationError } from 'class-validator';

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public errors: ValidationError[];
  public errorMessages: string[];
  private _value: T;

  public constructor(isSuccess: boolean, errors: ValidationError[], value?: T) {
    if (isSuccess && errors) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !errors) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.errors = errors;
    this.errorMessages = this.errors ? Result.flattenValidationErrors(this.errors) : [];
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.errorMessages);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
    }

    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  private static flattenValidationErrors(validationErrors: ValidationError[], prepend = ''): string[] {
    const messages: string[] = [];
    validationErrors.forEach((validationError) => {
      if (!(validationError.children && validationError.children.length)) {
        // eslint-disable-next-line guard-for-in
        for (const key in validationError.constraints) {
          messages.push(`${prepend}${validationError.constraints[key]}`);
        }
      } else {
        messages.push(
          ...this.flattenValidationErrors(validationError.children, `${prepend}${validationError.property}.`),
        );
      }
    });
    return messages;
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
