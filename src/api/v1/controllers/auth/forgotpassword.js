const validations = require("../../validations");
const config = require("../../../../config");
const emailSenderProvider = config.emailSenderProvider;
const emailTemplates = require("../../templates").email;
const { randomNumberGenerator } = require("../../helpers");
const { userRepository, forgotPasswordRepository } = require("../../repositories");

const forgotpassword = {
    sendUserCode: async (req, res, next) => {
        const errors = await validations.auth.forgotpassword.getSendUserCodeValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }

        const forgotPasswordCodeExpiryTimeInHours = config.app.FORGOT_PASSWORD_CODE_EXPIRY_TIME_IN_HOURS;
        const reset_code = randomNumberGenerator(6);
        const user_email = req.body.email;
        const user = await userRepository.findOne({ email: user_email, is_deleted: 0 });
        const user_id = user._id;
        const sent_date = new Date();

        //@TODO 01: Send Verification
        const sendVerificationCodeEmailTemplate = emailTemplates.forgotpassword.sendCode;
        emailSenderProvider.sendMail(
            null,
            user_email,
            sendVerificationCodeEmailTemplate.subject,
            sendVerificationCodeEmailTemplate.body(reset_code))
            .then((sent) => {
                console.log("Email Sent");
            }).catch(console.error);

        const dataToBeCreated = {
            user_role: "user",
            user_email,
            reset_code,
            user_id,
            sent_date,
        };
        await forgotPasswordRepository.create(dataToBeCreated);
        res.json({ status: "success", message: "Password reset code has been sent successfully to your email", reset_code_expiry_time_in_hours: forgotPasswordCodeExpiryTimeInHours });
    },

    verifyUserCode: async (req, res, next) => {
        const errors = await validations.auth.forgotpassword.getVerifyUserCodeValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }

        const reset_code = req.body.verification_code;
        const user_email = req.body.email;
        const filter = { reset_code, user_email };
        const dataToBeUpdated = { is_verified: 1 };
        const passwordReset = await forgotPasswordRepository.findOneAndUpdate(filter, dataToBeUpdated);
        const user_id = passwordReset.user_id;
        res.json({ status: "success", message: "Password reset code verified successfully", user_id });
    },

    sendAdminCode: async (req, res, next) => {

    },

    verifyAdminCode: async (req, res, next) => {

    },
};

module.exports = forgotpassword;