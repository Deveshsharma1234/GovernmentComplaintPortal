const express = require('express');
const complaintRouter = express.Router();
const db = require('../config/db');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const upload = require('../middleware/uploadConfig')



// /complaints	                    Get all complaints
complaintRouter.get("/complaints", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {


        
        const queryText = `SELECT
         c.WardID, c.GeoLat, c.GeoLong, c.Image1, c.Image2, c.Image3, 
         c.ComplaintTypeID, c.UserID, c.Status, c.CreatedBy, c.CreatedDate, c.ModifiedBy, c.ModifiedDate, 
         c.ActiveStatus, 
                        c.ComplaintID,
                        c.Description,
                        s.Status as StatusName,
                        ci.City,
                        d.District,
                        st.State
                        FROM complaints c
                        INNER JOIN complaintstatus s ON c.Status = s.StatusID
                        INNER JOIN wards w ON c.WardID = w.WardID
                        INNER JOIN cities ci ON w.CityID = ci.CityID
                        INNER JOIN districts d ON ci.DistrictID = d.DistrictID
                        INNER JOIN states st ON d.StateID = st.StateID
                        `;
        db.pool.execute(queryText, (err, result) => {
            if (err == null) {
                res.json({
                    complaints: result
                });
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

// /myComplaintsdmi             Get All my complaint
complaintRouter.get("/myComplaints", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const id = req.user.UserId; // Extract the ID from request parameters
        const queryText = `SELECT ComplaintID, WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus FROM complaints WHERE UserId = ?`;
        db.pool.execute(queryText, [id], (err, result) => {
            if (err == null) {
                res.json({
                    complaints: result
                });
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
complaintRouter.post("/complaints", upload.fields([
    { name: 'Image1', maxCount: 1 },
    { name: 'Image2', maxCount: 1 },
    { name: 'Image3', maxCount: 1 }
]), authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const {
            WardID,
            GeoLat,
            GeoLong,
            Description,
            ComplaintTypeID
        } = req.body;


        // Assume req.user contains user info set by auth middleware
        const UserID = req.user?.UserId;
        const Status = 1; // default status (e.g., 1 = Pending)
        const CreatedBy = req.user?.FirstName || "system";
        const CreatedDate = new Date();
        const ModifiedBy = null;
        const ModifiedDate = null;
        const ActiveStatus = 1;

        // Get file paths or null if no file uploaded
        const Image1 = req.files?.Image1 ? '/uploads/' + req.files.Image1[0].filename : null;

        const Image2 = req.files?.Image2 ? '/uploads/' + req.files.Image2[0].filename : null;
        const Image3 = req.files?.Image3 ? '/uploads/' + req.files.Image3[0].filename : null;

        const queryText = `
            INSERT INTO complaints
            (WardID, GeoLat, GeoLong, Description, Image1, Image2, Image3, ComplaintTypeID, UserID, Status, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, ActiveStatus)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.pool.execute(
            queryText,
            [
                WardID,
                GeoLat,
                GeoLong,
                Description,
                Image1,
                Image2,
                Image3,
                ComplaintTypeID,
                UserID,
                Status,
                CreatedBy,
                CreatedDate,
                ModifiedBy,
                ModifiedDate,
                ActiveStatus
            ],
            (err, result) => {
                if (!err) {
                    console.log(result);
                    res.status(201).json({ message: "Complaint registered successfully" });
                } else {
                    console.error("SQL Error:", err);  // log full error to console
                    res.status(500).json({ message: "Database error", error: err.message || err });
                }
            }
        );
    } catch (error) {
        console.error("Server Error:", error);
        res.status(400).json({ message: error.message });
    }
});


// /update complaint status not by citizen               Update a complaint (e.g., status)
complaintRouter.patch("/complaints", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        // const id = req.params.id; // Extract the ID from request parameters
        const { Status, id } = req.body;
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


// // /complaints	            Soft-delete (mark inactive)
complaintRouter.delete("/complaints/", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        // const id = req.params.id; // Extract the ID from request parameters
        // const queryText = `DELETE FROM complaints WHERE ComplaintID = ?`;


        const ComplaintID = req.body.ComplaintID;
        // updating complaint status to 4 i.e Invalid for particular user id 
        const queryText = `UPDATE complaints SET Status = 4, ActiveStatus = false WHERE ComplaintID = ?`;
        db.pool.execute(queryText, [ComplaintID], (err, result) => {
            if (err == null) {
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: "Deleted Successfully" });
                } else {
                    res.status(404).json({ message: "No matching record found" });
                }
            }
            else {
                 console.log(ComplaintID);
                console.log(err);
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
        db.pool.execute(queryText, [userId], (err, result) => {
            if (err == null) {
                res.json({ complaints: result });
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
        db.pool.execute(queryText, [statusId], (err, result) => {
            if (err == null) {
                res.json({ complaints: result });
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
complaintRouter.get("/complaint-types", authAndAuthorize(1, 2, 3, 4), (req, res) => {
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
complaintRouter.get("/statuses", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const queryText = `SELECT StatusID,Status FROM complaintstatus`;

        db.pool.execute(queryText, (err, result) => {
            if (err == null) {
                res.json({
                    status: result
                });
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

// for stats api
complaintRouter.get("/statuses/stats", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const statusQuery = `
            SELECT cs.Status AS StatusName, COUNT(c.Status) AS ComplaintCount
            FROM complaintstatus cs
            LEFT JOIN complaints c ON c.Status = cs.StatusID
            GROUP BY cs.Status;
        `;

        const totalCountQuery = `SELECT COUNT(*) AS TotalComplaints FROM complaints;`;

        db.pool.execute(statusQuery, (err1, statusResult) => {
            if (err1) {
                console.error("SQL Error (statusQuery):", err1);
                return res.status(500).json({ message: "Database Error in status query" });
            }

            db.pool.execute(totalCountQuery, (err2, totalResult) => {
                if (err2) {
                    console.error("SQL Error (totalCountQuery):", err2);
                    return res.status(500).json({ message: "Database Error in total count query" });
                }

                const totalComplaints = totalResult[0].TotalComplaints;

                res.json({
                    totalComplaints: totalComplaints,
                    statuses: statusResult
                });
            });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


complaintRouter.get("/complaint-types/stats", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const queryText = `SELECT ct.ComplaintType, COUNT(c.ComplaintID) AS ComplaintCount
                            FROM complainttype ct
                            LEFT JOIN complaints c ON ct.ComplaintTypeID = c.ComplaintTypeID
                            GROUP BY ct.ComplaintType;`;

        db.pool.execute(queryText, (err, result) => {
            if (err == null) {
                res.json({
                    status: result
                });
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

complaintRouter.get("/complaints/types", authAndAuthorize(1, 2, 3, 4), (req, res) => {
  try {
    const queryText = `SELECT ComplaintTypeID, ComplaintType, Description FROM complainttype`;

    db.pool.execute(queryText, (err, result) => {
      if (!err) {
        // result[0] contains the rows when using mysql2
        res.json({ types: result }); 
      } else {
        console.error("SQL Error", err);
        res.status(500).json({ message: "Database Error" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = complaintRouter;

