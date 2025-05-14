const express = require('express');
const stateRouter = express.Router();
const db = require('../config/db');
const authAndAuthorize = require('../middleware/authAndAuthorize')

stateRouter.get("/getAllStates",(req,res)=>{
    try {
        const statement = 'select * from states';
        db.pool.query(statement,(err,result)=>{
            if(err) res.status(400).json({error: err.message });
            res.json({
                states: result
            })


        })
        
    } catch (error) {
        res.status(400).json({error: error.message})       
    }

})

module.exports = stateRouter;