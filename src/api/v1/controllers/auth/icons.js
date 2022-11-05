const { fileUploadProvider } = require("../../../../config");
const validations = require("../../validations");
const { iconRepository } = require("../../repositories");
const icons = {
    createIcon: async (req, res, next) => {
        const errors = await validations.auth.icon.getCreateIconValidationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }
        const icon_url = await fileUploadProvider.uploadFile(req.files.icon);
        const createdIcon = await iconRepository.create({ icon_url }, ["_id", "icon_url"]);
        res.json({
            status: "success",
            message: "Auth created successfully",
            icon: createdIcon
        });
    },

    getAllIcons: async (req, res, next) => {
        const icons = await iconRepository.find({}, ["_id", "icon_url"]);
        res.json({
            status: "success",
            message: "Auth icons retrieved successfully",
            icons
        });
    },
};

module.exports = icons;