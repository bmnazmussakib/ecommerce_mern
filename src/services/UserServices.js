const UserModel = require("../models/UserModel");
const { sendEmail } = require("../utility/EmailHelper");

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
        return { status: "6 Digit OTP has been sent failed",
            data: error,}
    }
}
const VerifyLoginService = async () => { }
const UserLogoutService = async () => { }
const CreateProfileService = async () => { }
const UpdateProfileService = async () => { }
const ReadProfileService = async () => { }

module.exports = {
    UserOTPService,
    VerifyLoginService,
    UserLogoutService,
    CreateProfileService,
    UpdateProfileService,
    ReadProfileService
}