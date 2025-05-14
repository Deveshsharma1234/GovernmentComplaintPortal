const express = require('express');
const wardsRouter = express.Router();
const db = require('../config/db');
const authAndAuthorize = require('../middleware/authAndAuthorize');



// /wards	                    Get all wards
wardsRouter.get("/wards",authAndAuthorize(1,2,3,4),(req,res)=>{
    try {
         const queryText = `SELECT WardID, City, CityID, AreaCovered, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus
        FROM wards`;
        db.pool.execute(queryText,(err,result)=>{
            if(err == null){
                res.json({wards:result});
            }
            else{
                res.status(500).json({error: err.message});
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// /wards/cityId={}	            Get wards by city ID
wardsRouter.get("/wards/:cityId",(req,res)=>{
    try {
        const queryText = `SELECT WardID, City, CityID, AreaCovered, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus
        FROM wards
        WHERE CityID = ?`;
        const CityID = req.params.districtId;
        db.pool.execute(queryText,[CityID],(err,result)=>{
            if(err == null){
                res.json({wards:result});
            }
            else{
                res.status(500).json({error: err.message});
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = wardsRouter;