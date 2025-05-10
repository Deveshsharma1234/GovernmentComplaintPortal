const express = require('express');
const authRouter = express.Router();
const { validateRegister } = require('../utils/validateRegister');
const CryptoJS = require('crypto-js'); // Import crypto-js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

//dont req authorization
//simple citize register 
authRouter.post("/citizen-register", (req, res) => {
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


// Registeration of Gov. Employe, Gove Representative only by admin,

authRouter.post("/admin/register", (req, res) => {
    try {
        const { FirstName, LastName, Email, Phone, Address, Pincode, State, District, City, RoleId, Password } = req.body;
        validateRegister(req);
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);
        const query = `insert into users (FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId,Password) values(?,?,?,?,?,?,?,?,?,?,?)`;
        db.pool.execute(query, [FirstName, LastName, Email, Phone, Address, Pincode, State, District, City, RoleId, hashedPassword], (err, result) => {
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
                    Role: RoleId == 3 ? "Government Employee" : "Government Representative",
                    roleId: RoleId
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


authRouter.post("/login", (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(req.body);

        const statement = `select  UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where Email = ? and Password = ?`;
        const hashedPassword = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Base64);
        db.pool.query(statement, [Email, hashedPassword], (err, users) => {
            if (err) res.status(400).json({ message: err.message })
            if (users.length == 0) res.status(400).json({ message: "Invalid Credentials" })
            else {
                const user = users[0];
                console.log(user);
                const payload = {
                    UserId: user.UserId,
                    Role: user.RoleId == 3 ? "Government Employee" : "Government Representative",
                    RoleId: user.RoleId
                }
                const token = jwt.sign(payload, "@secretKey", { expiresIn: "1h" })
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false, // set true in production with HTTPS
                    sameSite: "lax", // "none" if cross-origin & secure
                    path: "/", // important to match logout clearCookie
                    maxAge: 60 * 60 * 1000 // 1 hour in ms (optional)

                })
                res.json({
                    user: user
                })
            }


        })




    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

authRouter.post("/logout", (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // 🔐 Set to true in production (with HTTPS)
            sameSite: "lax", // or "none" only if cross-site & over HTTPS
            path: "/" // ✅ VERY important to match cookie path

        })
        console.log("cleared Cookies");
        res.json({
            ok : true,
            message: "Logged Out"
        })
        

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})





module.exports = authRouter;