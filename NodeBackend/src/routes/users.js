const express = require('express');
const authAndAuthorize = require('../middleware/authAndAuthorize');
const db = require('../config/db');

const userRouter = express.Router();


userRouter.get("/getAllUsers", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const statement = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where ActiveState = true order by RoleId`;
        db.pool.query(statement, (error, users) => {
            if (error) res.status(400).json({ error: error.message })
            if (users.length == 0) res.status(404).json({ message: "Users not found" });
            res.json({
                users: users
            })

        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


})

// to get other users profile by admin , gov officer and rep only
userRouter.get("/user/:UserId", authAndAuthorize(1, 2, 3), (req, res) => {
    try {
        const { UserId } = req.params;
        const statement = `select UserId,FirstName,LastName,Email,Phone,Address,Pincode,State,District,City,RoleId from users where UserId = ? and activeState = true`;
        db.pool.query(statement, [UserId], (error, users) => {
            if (error) res.status(400).json({ error: error.message })
            if (users.length == 0) res.status(404).json({ message: "Users not found" });
            const user = users[0];
            res.json({
                user: user
            })

        })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

})

// get users  profile
userRouter.get("/getProfile", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {

        const User = req.user;
        res.json({
            message: "User profile retrieved",
            user: User

        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.patch("/user", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const user = req.user;
        const {
            FirstName,
            LastName,
            Phone,
            Address,
            Pincode,
            State,
            District,
            City
        } = req.body;

        const ModifiedDate = new Date();
        let ModifiedBy;
        if (user.RoleId == 1) ModifiedBy = "Admin";
        if (user.RoleId == 2) ModifiedBy = "Government Representative";
        if (user.RoleId == 3) ModifiedBy = "Government emp "
        if (user.RoleId == 4) ModifiedBy = "Citizen";
        else {
            ModifiedBy = "SYSTEM"
        }

        const updateQuery = `
            UPDATE users SET
                FirstName = ?,
                LastName = ?,
                Phone = ?,
                Address = ?,
                Pincode = ?,
                State = ?,
                District = ?,
                City = ?,
                ModifiedDate = ?,
                ModifiedBy = ?
            WHERE UserId = ?
        `;

        const values = [
            FirstName,
            LastName,
            Phone,
            Address,
            Pincode,
            State,
            District,
            City,
            ModifiedDate,
            ModifiedBy,
            user.UserId
        ];

        db.pool.execute(updateQuery, values, (err, result) => {
            if (err) return res.status(400).json({ error: err.message });

            // Now fetch the updated user
            db.pool.execute(`SELECT UserId, FirstName, LastName, Email, Phone, Address, Pincode, State, District, City, RoleId,ActiveState, ModifiedDate, ModifiedBy FROM users WHERE UserId = ?`,
                [user.UserId],
                (err2, rows) => {
                    if (err2) return res.status(500).json({ error: err2.message });

                    res.json({
                        message: "User profile updated successfully",
                        updatedUser: rows[0]
                    });
                });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


userRouter.delete("/user", authAndAuthorize(1, 2, 3, 4), (req, res) => {
    try {
        const user = req.user;
        const statement = 'Update users set ActiveState = false where UserId = ?';
        db.pool.execute(statement, [user.UserId], (error, result) => {
            if (error) res.status(400).json({ error: error.message })
            res.json({
                message: "User Deactivated",
                result: result
            })

        })


    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

module.exports = userRouter;