const authAndAuthorize = require("../middleware/authAndAuthorize");
const express = require('express');
const pingRouter = express.Router();
pingRouter.get("/ping/pingWithAuth",(req,res)=>{
      const token = req.cookies?.token;
     //    console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }
        else{
          res.send("Token is Valid");
        }
});

module.exports = pingRouter;