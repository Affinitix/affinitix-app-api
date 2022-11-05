const { validationResult, body, param } = require('express-validator');
const { userRepository, forgotPasswordRepository } = require("../../repositories");

module.exports = {
    getSendUserCodeValidationResult: async (req, model) => {
        const validations = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail()
                .custom(async (value, { req }) => {
                    const fetchedModel = await userRepository.findOne({ email: value, is_deleted: 0 });
                    if (!fetchedModel) {
                        return Promise.reject("User does not exist.");
                    }
                })
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    },
    getVerifyUserCodeValidationResult: async (req, user_role) => {
        const validations = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail()
                .custom(async (value, { req }) => {
                    const userPasswordReset = await forgotPasswordRepository.findOne({ user_email: value, user_role: "user" });
                    if (!userPasswordReset) {
                        return Promise.reject('Invalid email.');
                    }
                }),
            body('verification_code')
                .notEmpty()
                .custom(async (value, { req }) => {
                    const userPasswordReset = await forgotPasswordRepository.findOne({ user_email: req.body.email, reset_code: value, user_role: "user" })
                    if (!userPasswordReset) {
                        return Promise.reject('Invalid code.');
                    }

                    if (userPasswordReset.is_verified == 1) {
                        return Promise.reject('Unauthorized User.');
                    }
                    const currentDate = new Date();
                    const sentDate = userPasswordReset.sent_date;
                    const hoursSinceResetCodeWasSent = Math.abs(currentDate.getTime() - sentDate.getTime()) / 3600000;
                    const resetCodeExpiryTimeInHours = process.env.PASSWORD_RESET_CODE_EXPIRY_TIME_IN_HOURS;

                    if (hoursSinceResetCodeWasSent > resetCodeExpiryTimeInHours) {
                        return Promise.reject('Code has expired.');
                    }
                })
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    }
};