const express = require('express');
const db = require('../config/db');

const authAndAuthorize = require('../middleware/authAndAuthorize');

const districtRouter = express.Router();

districtRouter.get("/getAllDistricts",(req,res)=>{
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

districtRouter.get("/district/:stateId",(req,res)=>{
    try {
        const {stateId} = req.params;
        const statement = `select * from districts where stateID =?`;
        db.pool.query(statement,[stateId],(error,result)=>{
            if(error) res.status(400).json({error: error.message});
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