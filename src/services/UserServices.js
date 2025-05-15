const ProfileModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");
const { sendEmail } = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");

const UserOTPService = async (req) => {
    try {
        const code = Math.floor(100000 + Math.random() * 900000);
        const email = req.params.email;
        const subject = "OTP Verification";
        const text = `Your OTP code is: ${code}`;

        await sendEmail(email, subject, text);
        const data = await UserModel.findOneAndUpdate({ email: email }, { otp: code }, { new: true });

        return {
            status: "6 Digit OTP has been sent to your email",
            data: data,
        };
    } catch (error) {
        return {
            status: "6 Digit OTP has been sent failed",
            data: error,
        }
    }
}

const VerifyOTPService = async (req) => {
    try {
        const { email, otp } = req.params;

        // User Count
        const total = await UserModel.countDocuments({ email: email, otp: otp });
        // const total = await UserModel.aggregate([
        //     { $match: { email, otp } },
        //     { $count: 'total' }
        //   ]);

        if (total === 1) {

            // Read User Data
            const data = await UserModel.findOne({ email: email, otp: otp })

            // Create Token
            const Token = await EncodeToken(data.email, data._id.toString());

            // Update User Data
            await UserModel.findOneAndUpdate({ email: email }, { otp: '0' }, { new: true });


            return {
                status: "success",
                message: "otp verification successful",
                // data: data,
                token: Token,
            };
        } else {
            return { status: "failed", message: "invalid otp" }
        }


    } catch (error) {
        return { status: "OTP verification failed", data: error }

    }
}

const UserLogoutService = async (req) => {
    try {

        // const email = req.headers.email;
        // const user_id = req.headers.user_id;

        return {
            status: "success",
            data: "email"
        }
    } catch (error) {
        return {
            status: "logout failed",
            data: error
        }
    }
}

const SaveProfileService = async (req) => {
    try {
        const {email, user_id} = req.headers;
        const reqBody = req.body;
        reqBody.userID = user_id;

        const data = await ProfileModel.findOneAndUpdate({userID: user_id}, reqBody, {upsert: true}, {new: true});

        return {
            status: "profile save success",
            data: data
        }
    } catch (error) {
        return {
            status: "failed",
            data: error
        }
    }
}

const CreateProfileService = async (req) => {
    try {
        const {email, user_id} = req.headers;
        const reqBody = req.body;
        reqBody.userID = user_id;

        const data = await ProfileModel.findOneAndUpdate({userID: user_id}, reqBody, {upsert: true}, {new: true});

        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "failed",
            data: error
        }
    }
}

const UpdateProfileService = async () => { 
    try {
        const {email, user_id} = req.headers;
        const reqBody = req.body;
        reqBody.userID = user_id;

        const data = await ProfileModel.findOneAndUpdate({userID: user_id}, reqBody, {upsert: true}, {new: true});

        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "failed",
            data: error
        }
    }
 }
const ReadProfileService = async (req) => { 
    try {
        const  {email, user_id} = req.headers;
        const data = await ProfileModel.findOne({userID: user_id});
        return {
            status: "success",
            data: data
        }
    } catch (error) {
            return {
                status: "failed",
                data: error
            }
    }
 }

module.exports = {
    UserOTPService,
    VerifyOTPService,
    UserLogoutService,
    SaveProfileService,
    CreateProfileService,
    UpdateProfileService,
    ReadProfileService
}