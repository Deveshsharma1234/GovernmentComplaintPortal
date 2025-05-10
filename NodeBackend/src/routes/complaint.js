const express = require('express');
const complaintRouter = express.Router();
const db = require('../config/db');
const authAndAuthorize = require('../middleware/authAndAuthorize');

complaintRouter.get("/api/complaint-types",(req,res)=>{
    try{
        const queryText = `SELECT ComplaintTypeID,ComplaintType,Description FROM complainttype`;

        db.pool.execute(queryText,authAndAuthorize(1, 2, 3, 4),(err, result) => {
            if(err == null){
                res.send(result);
            }
            else{
                console.log("SQL Error",err);
                response.status(500).json({message:"Databasse Error"});
            }
        });
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
});

complaintRouter.get("/api/statuses",authAndAuthorize(1, 2, 3, 4),(req,res)=>{
    try{
        const queryText = `SELECT StatusID,Status FROM complaintstatus`;

        db.pool.execute(queryText, (err, result) => {
            if(err == null){
                res.send(result);
            }
            else{
                console.log("SQL Error",err);
                response.status(500).json({message:"Databasse Error"});
            }
        });
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
});

module.exports = complaintRouter;

