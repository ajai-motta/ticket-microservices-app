import {ValidationError} from 'express-validator';
import { CustomError } from './custom-error';
export class RequestValidationError extends CustomError{
    statusCode=400;
    constructor(public errors: ValidationError[]){
        super('validation error');
        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }
    serializeErrors(){
       return this.errors.map((erro) => {
      if (erro.type === "field") {
        return { message: erro.msg, field: erro.path };
      }
      return { message: erro.msg}
    });
    }
}