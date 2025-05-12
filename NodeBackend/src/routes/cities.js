const express = require('express');
const citiesRouter = express.Router();
const db = require('../config/db');
const authAndAuthorize = require('../middleware/authAndAuthorize');


// /cities	Get all cities
citiesRouter.get("/cities",authAndAuthorize(1,2,3,4),(req,res)=>{
    try {
         const queryText = `SELECT CityID, City, DistrictID, StateID, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus 
        FROM cities`;
        db.pool.execute(queryText,(err,result)=>{
            if(err == null){
                res.json({cities:result});
            }
            else{
                res.status(500).json({error: err.message});
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// /cities/:districtId	Get cities by district ID
citiesRouter.get("/cities/:districtId",authAndAuthorize(1,2,3,4),(req,res)=>{
    try {
        const queryText = `SELECT CityID, City, DistrictID, StateID, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus 
        FROM cities 
        WHERE DistrictID = ?`;
        const DistrictID = req.params.districtId;
        db.pool.execute(queryText,[DistrictID],(err,result)=>{
            if(err == null){
                res.json({cities:result});
            }
            else{
                res.status(500).json({error: err.message});
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = citiesRouter;