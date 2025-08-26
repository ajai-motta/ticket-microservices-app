import express from 'express'
const router=express.Router();
router.get('/api/users/:currentUser',(req,res)=>{
    res.send("Say My name")
})

export {router as currentUserRouter}