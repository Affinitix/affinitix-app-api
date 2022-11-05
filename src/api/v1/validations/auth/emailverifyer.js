const { validationResult, body, param } = require('express-validator');

module.exports = {
    getSendUserCodeValidationResult: async (req, model) => {
        const validations = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail()
                .custom(async (value, { req }) => {
                    const fetchedModel = await model.findOne({ email: value, is_deleted: 0 });
                    if (!fetchedModel) {
                        return Promise.reject("User does not exist.");
                    }
                })
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    },
    getVerifyUserCodeValidationResult: async (req, model) => {
        const validations = [
            body('email')
                .isEmail()
                .normalizeEmail()
                .withMessage('Please enter a valid email')
                .custom(async value => {
                    const user = await model.findOne({ email: value, email_is_verified: false, is_deleted: 0 });
                    if (!user) {
                        return Promise.reject('Unauthorized Action.');
                    }
                }),
            body('email_verification_code')
                .notEmpty()
                .custom(async (value, { req }) => {
                    const user = await model.findOne({ email_verification_code: value, email: req.body.email, is_deleted: 0 });
                    if (!user) {
                        return Promise.reject('Incorrect email or verification code.');
                    }
                })

        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    }
};