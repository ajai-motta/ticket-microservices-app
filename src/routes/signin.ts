import express, { Request, Response } from "express";
import {validateRequest} from '../middlewares/validate-request';
import { body } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import {BadRequestError} from '../errors/bad-request-error';
import { PasswordHashing} from '../generalPurpose/password';

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Invaild email"),
    body("password").trim().notEmpty().withMessage("empty password"),
  ],validateRequest,
  async (req: Request, res: Response) => {
    const {email,password}=req.body;
    const existingUser=await User.findOne({email})
    if(!existingUser){
      throw new BadRequestError("Invalid Credentials")
    }
    const comparedPassword=await PasswordHashing.compare(existingUser.get('password'),password)
    if(!comparedPassword){
      throw new BadRequestError("Invalid Credentials")
    }
 const userJwt = jwt.sign(
       {
         id: existingUser.id,
         email: existingUser.email,
       },
       process.env.JWT_KEY!
     );
     req.session = {
       jwt: userJwt,
     };
     res.status(200).send(existingUser)
  }
);
export { router as signinUserRouter };
