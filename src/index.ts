import mongoose from 'mongoose'
import { app } from './app'

const startUp=async()=>{
  if(!process.env.JWT_KEY){
    throw new Error('No env variable')
  }
  try{

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log("Connnected to db")
  }catch(err){
    console.log(err)
  }

  app.listen(3000, () => {
    console.log(`🚀 Server is running `);
  });
}
startUp()