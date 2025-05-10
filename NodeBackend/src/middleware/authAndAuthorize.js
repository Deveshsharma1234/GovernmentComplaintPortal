const jwt = require('jsonwebtoken')

// pass allowed role IDs as arguments
//Role  ID = 1 for admin
//Role Id =2 for  Government Representative 
//Role Id =3 for  Government emp  
//Role Id  =4 for Citizens
const authAndAuthorize = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(req.cookies);
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }

        try {
            const decoded = jwt.verify(token, "@secretKey"); 
            console.log(decoded);
            req.user = decoded;

            if (!allowedRoles.includes(decoded.RoleId)) {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }

            next();
        } catch (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token",
                error : err.message
             });
        }
    };
};

module.exports = authAndAuthorize;
