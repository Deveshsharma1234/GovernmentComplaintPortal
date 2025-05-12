const express = require('express');
const complaintRouter = express.Router();
const db = require('../config/db');
const authAndAuthorize = require('../middleware/authAndAuthorize');



// /complaints	                    Get all complaints
complaintRouter.get("/complaints", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const queryText = `SELECT ComplaintID, WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus FROM complaints`;
        db.pool.execute(queryText, (err, result) => {
            if (err == null) {
                res.send(result);
            }
            else {
                console.log("SQL Error\n", err);
                res.status(500).json({ message: err });
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// /complaints/{id}	                Get complaint by ID
complaintRouter.get("/complaints/:id", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from request parameters
        const queryText = `SELECT ComplaintID, WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus FROM complaints WHERE ComplaintID = ?`;
        db.pool.execute(queryText, [id], (err, result) => {
            if (err == null) {
                res.send(result);
            }
            else {
                console.log("SQL Error\n", err);
                res.status(500).json({ message: err });

            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});

// /complaints	                    Register a new complaint
complaintRouter.post("/complaints", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const { ComplaintID, WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus } = req.body;
        const queryText = `INSERT INTO complaints(ComplaintID, WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        db.pool.execute(queryText, [ComplaintID, WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus], (err, result) => {
            if (error == null) {
                console.log(result);
                res.status(201).json({ message: "complaint registered sucessfully" });
            }
            else {
                console.log("SQL Error\n", err);
                res.status(500).json({ message: err });

            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});

// /complaints/{id}	                Update a complaint (e.g., status)
complaintRouter.put("/complaints/:id", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from request parameters
        const { Status } = req.body;
        const queryText = `UPDATE complaints SET Status= ? WHERE ComplaintID = ?`;
        db.pool.execute(queryText, [Status, id], (err, result) => {
            if (err == null) {
                console.log(result);
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: "Updated Successfully" });
                } else {
                    res.status(404).json({ message: "No matching record found" });
                }
            }
            else {
                res.status(500).json({ message: "Database Error" });
            }
        });
    } catch (error) {
        res.send(400).json({ message: error.message });
    }
});


// // /complaints/{id}	            Soft-delete (mark inactive)
complaintRouter.delete("/complaints/:id", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from request parameters
        const queryText = `DELETE FROM complaints WHERE ComplaintID = ?`;
        db.pool.execute(queryText, [id], (err, result) => {
            if (error == null) {
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: "Deleted Successfully" });
                } else {
                    res.status(404).json({ message: "No matching record found" });
                }
            }
            else {
                res.status(500).json({ message: "Database Error" });
            }
        });
    } catch (error) {
        res.send(400).json({ message: error.message });
    }
});

// /complaints/user/{userId}	    Get complaints by user
complaintRouter.get("/complaints/user/:userId", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const userId = req.params.userId;
        const queryText = `SELECT 
    complaints.ComplaintID, complaints.WardID, complaints.GeoLat, complaints.GeoLong,
    complaints.Description, complaints.Image1, complaints.Image2, complaints.Image3,
    complaints.ComplaintTypeID, complaints.UserID, complaints.Status, complaints.CreatedBy,
    complaints.CreatedDate, complaints.ModifiedBy, complaints.ModifiedDate, complaints.ActiveStatus
    FROM complaints
    WHERE complaints.UserID = ?`;
    db.pool.execute(queryText,[userId],(err,result)=>{
        if(err == null){
            res.send(result);
        }
        else {
                res.status(500).json({ message: "Database Error" });
            }
        });
    } catch (error) {
        res.send(400).json({ message: error.message });
    }
});

// /complaints/status/{statusId}	Filter by status
complaintRouter.get("/complaints/status/:statusId", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const statusId = req.params.statusId;
        const queryText = `SELECT 
    complaints.ComplaintID, complaints.WardID, complaints.GeoLat, complaints.GeoLong,
    complaints.Description, complaints.Image1, complaints.Image2, complaints.Image3,
    complaints.ComplaintTypeID, complaints.UserID, complaints.Status, complaints.CreatedBy,
    complaints.CreatedDate, complaints.ModifiedBy, complaints.ModifiedDate, complaints.ActiveStatus
    FROM complaints
    WHERE complaints.Status = ?`;
    db.pool.execute(queryText,[statusId],(err,result)=>{
        if(err == null){
            res.send(result);
        }
        else {
                res.status(500).json({ message: "Database Error" });
            }
        });
    } catch (error) {
        res.send(400).json({ message: error.message });
    }
});

///api/complaint-types	                Get all complaint types
complaintRouter.get("/api/complaint-types", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const queryText = `SELECT ComplaintTypeID,ComplaintType,Description FROM complainttype`;

        db.pool.execute(queryText, (err, result) => {
            if (err == null) {
                res.send(result);
            }
            else {
                console.log("SQL Error", err);
                response.status(500).json({ message: "Databasse Error" });
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

///api/statuses	                        Get all status options
complaintRouter.get("/api/statuses", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const queryText = `SELECT StatusID,Status FROM complaintstatus`;

        db.pool.execute(queryText, (err, result) => {
            if (err == null) {
                res.send(result);
            }
            else {
                console.log("SQL Error", err);
                response.status(500).json({ message: "Databasse Error" });
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = complaintRouter;

