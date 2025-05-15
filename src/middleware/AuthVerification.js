const { DecodeToken } = require("../utility/TokenHelper");

module.exports = async (req, res, next) => {
    try {

        // 1. Get token from header or cookies
        let token = req.headers['token'] || req.cookies?.token;

        // 2. If token not found
        if (!token) {
            return res.status(401).json({ status: "fail", message: "No token provided" });
        }

        // 3. Decode token
        const decoded = await DecodeToken(token);

        // 4. If decoding fails
        if (!decoded) {
            return res.status(401).json({ status: "fail", message: "Invalid or expired token" });
        }

        // 5. Attach decoded info to request
        let email = decoded.email
        let user_id = decoded.user_id
        req.headers.email = email
        req.headers.user_id = user_id
        next()


    } catch (error) {
        return res.status(401).json({ status: "Fail", message: "Unauthorized" })
    }
}