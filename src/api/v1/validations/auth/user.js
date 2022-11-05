const { validationResult, body, param } = require('express-validator');
const { iconRepository, userRepository } = require("../../repositories");
const { passworHasher } = require("../../services");

module.exports = {
    getRegisterationValidationResult: async (req) => {
        const validations = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail()
                .custom(async value => {
                    const user = await userRepository.findOne({ email: value, is_deleted: 0 });
                    if (user) {
                        return Promise.reject('Email is already in use');
                    }
                }),
            body('auth_icon_id')
                .not().isEmpty()
                .withMessage('Please select a login icon')
                .bail()
                .trim()
                .escape()
                .custom(async value => {
                    try {
                        const authIcon = await iconRepository.findById(value);
                        if (!authIcon) {
                            return Promise.reject('Invalid auth icon id supplied');
                        }
                    } catch (error) {
                        return Promise.reject('Invalid auth icon id supplied');
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
                .withMessage('Please enter a valid email')
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
    getVerifyIconValidationResult: async (req) => {
        const validations = [
            body('user_id')
                .not().isEmpty()
                .withMessage('Please enter user_id')
                .isString()
                .trim(),
            body('auth_icon_id')
                .not().isEmpty()
                .withMessage('Please enter auth_icon_id')
                .isString()
                .trim()
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    },
    getUpdatePasswordValidationResult: async (req) => {
        const validations = [
            body('user_id')
                .not().isEmpty()
                .withMessage('Please enter user_id')
                .bail()
                .trim()
                .custom(async (value, { req }) => {
                    try {
                        const user = await userRepository.findById(value);
                        if (!user) {
                            return Promise.reject('Unauthorized action.');
                        }
                    } catch (error) {
                        return Promise.reject('Unauthorized action.');
                    }

                }),
            body('old_password')
                .optional()
                .not().isEmpty()
                .withMessage('Please enter old password')
                .bail()
                .trim()
                .escape()
                .custom(async (value, { req }) => {
                    if (req.body.old_password == req.body.new_password) {
                        return Promise.reject('New password must not be thesame as old password');
                    }
                    try {
                        const user = await userRepository.findById(req.body.user_id);
                        if (!user) {
                            return Promise.reject('Unauthorized action.');
                        }
                        const passwordIsCorrect = await passworHasher.verifyPassword(req.body.old_password, user.password);
                        if (!passwordIsCorrect) {
                            return Promise.reject('Incorrect old password supplied.');
                        }
                    } catch (error) {
                        console.log(error);
                        return Promise.reject('Unauthorized action.');
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