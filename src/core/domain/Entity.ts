import { UniqueEntityID } from "./UniqueEntityID";

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
  };
  
  export abstract class Entity<T> {
    protected readonly _id: UniqueEntityID;
    public readonly properties: T;
  
    constructor (properties: T, id?: UniqueEntityID) {
      this._id = id ? id : new UniqueEntityID();
      this.properties = properties;
    }
  
    public equals (object?: Entity<T>) : boolean {
  
      if (object == null || object == undefined) {
        return false;
      }
  
      if (this === object) {
        return true;
      }
  
      if (!isEntity(object)) {
        return false;
      }
  
      return this._id.equals(object._id);
    }
  }
  