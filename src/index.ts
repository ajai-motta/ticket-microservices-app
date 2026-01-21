import mongoose from 'mongoose'
import { app } from './app'

const startUp=async()=>{
  if(!process.env.JWT_KEY){
    throw new Error('No env variable')
  }
   if(!process.env.MONGO_URI){
    throw new Error('No mongo env avariable')
  }
  try{

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connnected to db")
  }catch(err){
    console.log(err)
  }

  app.listen(3000, () => {
    console.log(`🚀 Server is running `);
  });
}
startUp()