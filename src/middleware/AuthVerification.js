const { DecodeToken } = require("../utility/TokenHelper");

module.exports = async (req, res, next) => {
    try {
    
        let token = req.headers['token'];
        if (!token) {
            token = req.cookies['token']
        }
        let decoded = DecodeToken(token)
        let email = decoded.email
        let user_id = decoded.user_id
        req.headers.email = email
        req.headers.user_id = user_id
        next()
    } catch (error) {
        return res.status(401).json({ status: "Fail", message: "Unauthorized" })
    }
}