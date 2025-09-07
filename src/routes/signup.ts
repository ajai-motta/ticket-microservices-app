import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import {validateRequest} from '../middlewares/validate-request'

import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please provide valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be in beetwen 4 and 20"),
  ],validateRequest,
  async (req: Request, res: Response) => {
    

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already Exists");
      throw new BadRequestError("Email already in use");
    }
    const user = User.build({ email, password });
    await user.save();
    
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJwt,
    };
    return res.status(201).send(user);
  }
);
export { router as signupUserRouter };
