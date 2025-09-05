import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from 'mongoose'
const app = express();
const PORT = 3000;

// trust traffic even though its comming from proxy  
app.set('trust proxy',true)//trust ingress-nginx
//parse content
app.use(express.json());
//cookie, remember content is a jwt so no encryption on cookie
app.use(cookieSession({
  signed: false,
  secure: true,// From https
}))

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