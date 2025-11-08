export class ApplicationError extends Error{
    constructor(message,code){
        super(message);

        this.message=message;
        this.code=code;
    }
     

        
    
}