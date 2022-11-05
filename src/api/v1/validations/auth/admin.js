const bcrypt = require('bcryptjs');
const { validationResult, body, param } = require('express-validator');
module.exports = {
    getRegisterationValidationResult: async (req) => {
        const validations = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail()
                .custom(async value => {
                    const user = await User.findOne({ email: value, is_deleted: 0 });
                    if (user) {
                        return Promise.reject('Email is already in use');
                    }
                }),
            body('password')
                .not().isEmpty()
                .withMessage('Please enter password')
                .trim()
                .escape()
                .isLength({ min: 5 })
                .withMessage('Password must be at least 5 characters long')
        ];

        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    },

    getLoginValidationResult: async (req) => {
        const validations = [
            body('email')
                .isEmail()
                .withMessage('Please enetr a valid email')
                .normalizeEmail(),
            body('password')
                .not().isEmpty()
                .withMessage('Please enter your password')
                .trim()
                .escape()
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    },

    getUpdatePasswordValidationResult: async (req) => {
        const validations = [
            param('user_id')
                .custom(async (value, { req }) => {
                    const user = await User.findById(value);
                    if (!user) {
                        return Promise.reject('Unauthorized action.');
                    }
                }),
            body('old_password')
                .optional()
                .not().isEmpty()
                .withMessage('Please enter old password')
                .trim()
                .escape()
                .custom(async (value, { req }) => {
                    if (req.body.old_password === req.body.new_password) {
                        return Promise.reject('New password must not be thesame as old password');
                    }

                    const user = await User.findById(req.params.user_id);
                    if (!user) {
                        return Promise.reject('Unauthorized action.');
                    }
                    const passwordIsCorrect = await bcrypt.compare(req.body.old_password, user.password);
                    if (passwordIsCorrect) {
                        return Promise.reject('Incorrect password supplied.');
                    }
                }),
            body('new_password')
                .not().isEmpty()
                .withMessage('Please enter new password')
                .trim()
                .escape()
                .isLength({ min: 5 })
                .withMessage('Password must be at least 5 characters long')
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    },
};