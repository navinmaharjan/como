const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // If token is not available
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }

    // Decode the token
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.SECRET_KEY);
        req.userInfo = decodedTokenInfo;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Access denied.",
        });
    }
};

module.exports = authMiddleware;


