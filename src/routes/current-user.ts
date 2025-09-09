import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
router.get("/api/users/currentuser", (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    //payload because it should be send
    //and its not a boolen
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
     res.send({payload})
  } catch (err) {
     res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
