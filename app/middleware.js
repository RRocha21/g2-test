const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

NOT_AUTHENTICATED = "Not authenticated";

module.exports = (req, res, next) => {
    if (req.headers["authorization"]) {
        try {
            let authorization = req.headers["authorization"].split(" ");
            if (authorization[0] !== "Bearer") {
                return res
                    .status(401)
                    .send({ errors: { message: NOT_AUTHENTICATED } });
            } else {
                req.jwt = jwt.verify(authorization[1], jwtSecret);
                return next();
            }
        } catch (err) {
            return res.status(403).send({
                errors: { message: NOT_AUTHENTICATED },
            });
        }
    } else {
        return res.status(401).send({
            errors: { message: NOT_AUTHENTICATED },
        });
    }
};
