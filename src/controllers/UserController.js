const { UserOTPService, VerifyOTPService, CreateProfileService, UpdateProfileService, UserLogoutService, SaveProfileService, ReadProfileService } = require("../services/UserServices")

exports.UserOTP = async (req, res) => {
    const result = await UserOTPService(req)
    return res.status(200).json(result)
}

exports.VerifyOTP = async (req, res) => {
    const result = await VerifyOTPService(req)
    if (result.status === 'success') {

        // Cookie Options
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: false
        }

        // Set Cookie with response
        res.cookie('token', result.token, cookieOptions)

        return res.status(200).json(result)
    } else {
        return res.status(200).json(result)
    }
}

exports.UserLogout = async (req, res) => {

    // Cookie Options
    const cookieOptions = {
        expires: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        httpOnly: false
    }

    // Set Cookie with response
    //  res.cookie('token', '', cookieOptions)
     res.clearCookie('token')

     const cookie = res.cookie

     return res.status(200).json({ status: "success", message: "logout successful" })



    // const result = await UserLogoutService(req)
    // return res.status(200).json(result)
}

exports.SaveProfile = async (req, res) => {
    const result = await SaveProfileService(req)
    return res.status(200).json(result)
}

exports.CreateProfile = async (req, res) => {
    const result = await CreateProfileService(req)
    return res.status(200).json(result)
}

exports.UpdateProfile = async (req, res) => {
    const result = await UpdateProfileService(req)
    return res.status(200).json(result)
}

exports.ReadProfile = async (req, res) => { 
    const result = await ReadProfileService(req)
    return res.status(200).json(result)
 }

