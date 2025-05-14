const jwt = require('jsonwebtoken')
exports.EncodeToken = async (email, user_id) => {
    try {
        const KEY = 'ABC-123-XYZ'
        const EXP = {expiresIn: '24h'}
        const PAYLOAD = {
            email: email,
            user_id: user_id
        }
        const token = await jwt.sign(PAYLOAD, KEY, EXP)
        return token
    } catch (error) {
         console.log(error)
    }
}

exports.DecodeToken = async (token) => {
    try {
        const KEY = 'ABC-123-XYZ'
        const decoded = await jwt.verify(token, KEY)
        return decoded
    } catch (error) {
        console.log(error)
    }
    
}