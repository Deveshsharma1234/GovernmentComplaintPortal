const express = require('express');
const healthRouter = express.Router();

healthRouter.get("/health",(req,res)=>{
    res.send("NODE Server is Running");    
});

module.exports = healthRouter;