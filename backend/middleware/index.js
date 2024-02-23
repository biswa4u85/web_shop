const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    verifyTokenAdmin: async (req, res, next) => {
        try {
            let token = req.headers["authorization"];
            if (!token) {
                return res.status(403).json({ errMsg: "Access denied" });
            }
            if (token.startsWith("Bearer")) {
                token = token.slice(7, token.length).trimLeft();
            }
            const verified = jwt.verify(token, process.env.JWTSECRET);
            req.payload = verified;

            if (req.payload.role === "admin") {
                next();
            } else {
                return res.status(403).json({ errMsg: "Access Denied" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ errMsg: "Server Down" });
        }
    }
}