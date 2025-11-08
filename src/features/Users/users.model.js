import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }

    static async SignUp(name,email,password,type){
        try{  
        const newUser=new UserModel(
            name,
            email,
            password,
            type
        );
       
        return newUser;
    }
    catch(err){
        throw new ApplicationError("Something went Wrong.Please try again later");
    }
        
        
        
    }

   
    static getAll(){
        return users;
    }
}

let  users=[{
    'id':1,
    'name':'Seller',
    'email':'seller@ecom.com',
    'password':'password1',
    'type':'seller'
},
{
    'id':2,
    'name':'Customer',
    'email':'customer@ecom.com',
    'password':'password2',
    'type':'customer'
}

];