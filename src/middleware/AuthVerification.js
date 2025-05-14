const { DecodeToken } = require("../utility/TokenHelper");

module.exports = async (req, res, next) => {
    try {
    
        // Find Token from Header
        let token = req.headers['token'];

        // Find Token from Cookie
        if (!token) {
            token = req.cookies['token']
        }

        // Decode Token
        let decoded = await DecodeToken(token)

        // Check Token is Valid or Not
        if (decoded === null) {
            return res.status(401).json({ status: "Fail", message: "Unauthorized" })
            
        } else {
            // Set Email and User ID in Header
            let email = decoded.email
            let user_id = decoded.user_id
            req.headers.email = email
            req.headers.user_id = user_id
            next()
            
        }

    } catch (error) {
        return res.status(401).json({ status: "Fail", message: "Unauthorized" })
    }
}