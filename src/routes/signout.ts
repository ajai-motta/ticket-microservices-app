import express from 'express';

const router=express.Router()

router.post('api/users/signout',(req,res)=>{
res.send("you can write my name")
})
export {router as signoutUserRouter}