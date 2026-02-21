const authAndAuthorize = require("../middleware/authAndAuthorize");
const express = require('express');
const pingRouter = express.Router();
pingRouter.get("/ping/pingWithAuth",authAndAuthorize(1,2,3,4),(req,res)=>{
     res.send("Tokens are valid");
});

module.exports = pingRouter;