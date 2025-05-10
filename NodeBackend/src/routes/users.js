const express = require('express');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const db = require('../config/db');

const userRouter = express.Router();


userRouter.get("/getAllUsers",authAndAuthorize(1),(req,res)=>{
    try {
        const statement = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users`;
        db.pool.query(statement,(error,users)=>{
            if(error) res.status(400).json({error:error.message})
                res.json({
            users:users
        })

        })
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }


})



module.exports = userRouter;