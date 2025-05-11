const express = require('express');
const db = require('../config/db');

const authAndAuthorize = require('../middleware/authAndAuthorize');

const districtRouter = express.Router();

districtRouter.get("/getAllDistricts",authAndAuthorize(1,2,3,4),(req,res)=>{
    try {
        const statement = `SELECT * FROM districts`
        db.pool.query(statement,(err,result)=>{
            if(err) res.status(400).json({error: err.message});
            res.json({
                districts: result
            })
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
        
    }
})


module.exports =  districtRouter ;