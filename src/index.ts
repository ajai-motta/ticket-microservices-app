import express, { Request, Response } from "express";
import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from 'mongoose'
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());


app.use(currentUserRouter)
app.use(signinUserRouter)
app.use(signoutUserRouter)
app.use(signupUserRouter)
app.all('/{*splat}', async() => {
  throw new NotFoundError()
});
app.use(errorHandler)

const startUp=async()=>{
  try{

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log("Connnected to db")
  }catch(err){
    console.log(err)
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running `);
  });
}
startUp()