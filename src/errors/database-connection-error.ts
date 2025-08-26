export class DatabaseConnectionError extends Error{
    statusCode=500;
    reason='Error connecting to database';
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serilizeErrors(){
        return [{
           message: this.reason

        }]
    }
}