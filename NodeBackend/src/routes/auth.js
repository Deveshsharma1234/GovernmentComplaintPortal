const express = require('express');
const authRouter = express.Router();
const { validateRegister } = require('../utils/validateRegister');
const CryptoJS = require('crypto-js'); // Import crypto-js

const db = require('../config/db');

//dont req authorization
authRouter.post("/citizen-register",  (req, res) => {
    try {
        const { FirstName, LastName, Email, Phone, Address, Pincode, State, District, City, Password } = req.body;
        console.log(req.body);
        validateRegister(req)
      // Use CryptoJS to hash the password
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);

        const query = `insert into users (FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId,Password) values(?,?,?,?,?,?,?,?,?,?,?)`;
         db.pool.execute(query, [FirstName, LastName, Email, Phone, Address, Pincode, State, District, City, 4, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            } else {
                const savedUser = {
                    id: result.insertId,
                    FirstName,
                    LastName,
                    Email,
                    Phone,
                    Address,
                    Pincode,
                    State,
                    District,
                    City,
                    role: "Citizen"
                };
                res.json({
                    message: "User Created Succesfull",
                    savedUser: savedUser
                })
            }
        })



    } catch (error) {
        res.status(400).json({ message: error.message });

    }
})


module.exports = authRouter;