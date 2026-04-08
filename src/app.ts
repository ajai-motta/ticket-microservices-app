import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "@ajaisgtickets/common";
import { NotFoundError } from "@ajaisgtickets/common";
const app = express();


// trust traffic even though its comming from proxy  
app.set('trust proxy',true)//trust ingress-nginx
//parse content
app.use(express.json());
//cookie, remember content is a jwt so no encryption on cookie
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV!=='test',// From https or not based on test env
}))

app.use(currentUserRouter)
app.use(signinUserRouter)
app.use(signoutUserRouter)
app.use(signupUserRouter)
app.all('/{*splat}', async() => {
   console.log('route not found in /spat')
  throw new NotFoundError()
});
app.use(errorHandler)

export {app}
//aditional space
