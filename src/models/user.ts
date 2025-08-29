import mongoose from "mongoose";

interface userattr{
email: string;
password: string;
}
interface userModel extends mongoose.Model<any>{
build(attr: userattr):any;
}
const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
const User= mongoose.model<any,userModel>('User',userSchema)
userSchema.statics.build=(attr: userattr)=>{
    return new User(attr)
}

export {User}