import mongoose from "mongoose";
import {PasswordHashing} from '../generalPurpose/password'
interface userattr{
email: string;
password: string;
}
interface userModel extends mongoose.Model<userDoc>{
build(attr: userattr):userDoc;
}
interface userDoc extends mongoose.Document{
    email: string;
    password: string;
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
userSchema.pre('save',async function(done){
    if(this.isModified('password')){
      const hashed=await PasswordHashing.toHash(this.get('password'))
      this.set('password',hashed)
    }
    done()
})
userSchema.statics.build=(attr: userattr)=>{
    return new User(attr)
}
const User= mongoose.model<userDoc,userModel>('User',userSchema)

export {User}