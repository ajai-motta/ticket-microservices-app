import {ValidationError} from 'express-validator';
export class RequestValidationError extends Error{
    statusCode=400;
    constructor(public errors: ValidationError[]){
        super();
        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }
    serilizeErrors(){
       return this.errors.map((erro) => {
      if (erro.type === "field") {
        return { message: erro.msg, field: erro.path };
      }
    });
    }
}