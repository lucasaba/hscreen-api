import { shallowEqual } from 'shallow-equal-object';

interface ValueObjectProperties {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProperties> {
  public readonly properties: T;

  constructor(properties: T) {
    this.properties = Object.freeze(properties);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.properties === undefined) {
      return false;
    }
    return shallowEqual(this.properties, vo.properties);
  }
}
