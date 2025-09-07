import express from 'express'
import jwt from 'jsonwebtoken'
const router=express.Router();
router.get('/api/users/:currentUser',(req,res)=>{
    if (!req.session?.jwt){
        return res.send({currentUser: null})
    }
    
})

export {router as currentUserRouter}