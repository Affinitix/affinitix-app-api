const validations = require("../../validations");
const { userRepository } = require("../../repositories");
const { passworHasher, apiTokenGenerator } = require("../../services");


const users = {
    register: async (req, res, next) => {
        const errors = await validations.auth.user.getRegisterationValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }
        const registerationFreeMemoryAllocationInGB = 2;
        const dataToBeSaved = {
            auth_icon: req.body.auth_icon_id,
            email: req.body.email,
            password: await passworHasher.hashPassword(req.body.password),
            total_memory_space_in_gb: registerationFreeMemoryAllocationInGB
        };
        const user = await userRepository.create(dataToBeSaved, ["_id", "email", "total_memory_space_in_gb", "used_memory_space_in_gb", "current_sub_plan"]);
        const token = apiTokenGenerator.generateToken({ user, role: "user" });
        return res.json({
            status: "success",
            message: "User registered successfully",
            user,
            token
        });

    },

    login: async (req, res, next) => {
        const errors = await validations.auth.user.getLoginValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }
        const user = await userRepository.findOne({ email: req.body.email, is_deleted: 0 }, ["_id", "email", "password", "total_memory_space_in_gb", "used_memory_space_in_gb", "current_sub_plan"]);
        if (!user) {
            return res.status(400).json({ status: "error", message: "Invalid login details supplied" });

        }

        const passwordIsCorrect = await passworHasher.verifyPassword(req.body.password, user.password);
        if (!passwordIsCorrect) {
            return res.status(400).json({ status: "error", message: "Invalid login details supplied" });
        }
        delete user.password;
        const token = apiTokenGenerator.generateToken({ user, role: "user" });
        return res.json({
            status: "success",
            message: "User logged in successfully",
            user,
            token
        });

    },

    verifyUserIcon: async (req, res, next) => {
        const errors = await validations.auth.user.getVerifyIconValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }
        try {
            const user = await userRepository.findOne({ _id: req.body.user_id, auth_icon: req.body.auth_icon_id });
            if (!user) {
                return res.status(400).json({ status: "error", message: "Invalid authentication icon supplied" });
            }
            return res.json({
                status: "success",
                message: "Auth icon verified successfully"
            });
        } catch (error) {
            return res.status(400).json({ status: "error", message: "Invalid authentication icon supplied" });
        }

    },

    updatePassword: async (req, res, next) => {
        const errors = await validations.auth.user.getUpdatePasswordValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }

        const hashedNewPassword = await passworHasher.hashPassword(req.body.new_password);
        const user = await userRepository.updateOne(req.body.user_id, { password: hashedNewPassword }, ["_id", "email", "password", "total_memory_space_in_gb", "used_memory_space_in_gb", "current_sub_plan"]);
        return res.json({
            status: "success",
            message: "Password updated successfully",
            user
        });
    },
};

module.exports = users;