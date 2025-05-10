const express = require('express');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const db = require('../config/db');

const userRouter = express.Router();


userRouter.get("/getAllUsers", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const statement = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users order by RoleId`;
        db.pool.query(statement, (error, users) => {
            if (error) res.status(400).json({ error: error.message })
            res.json({
                users: users
            })

        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


})

// to get other users profile by admin , gov officer and rep only
userRouter.get("/user/:UserId", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const { UserId } = req.params;
        const statement = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where UserId = ?`;
        db.pool.query(statement,[UserId],(error,users)=>{
            if(error) res.status(400).json({error:error.message})
                const user = users[0];
                res.json({
                    user:user
            })

        })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

})

// get users  profile
userRouter.get("/user/profile", authAndAuthorize(1, 2, 3, 4),(req,res)=>{
    try {
        const UserId = req.user.UserId;
        console.log(UserId);
        console.log("req.user:", req.user);

        
        
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }

})


module.exports = userRouter;