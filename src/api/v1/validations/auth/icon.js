const { validationResult, param, check } = require('express-validator');

module.exports = {
    getCreateIconValidationResult: async (req) => {
        const validations = [
            check("icon")
                .custom((value, { req }) => {
                    if (!req.files.icon.type) {
                        throw new Error('Please upload an image file.');
                    }
                    const mimeType = req.files.icon.type.split("/")[0];
                    if (mimeType != "image") {
                        throw new Error('Please upload an image file.');
                    }
                    return req.files.icon;
                })
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);

    },
    getUpdateIconValidationResult: async (req) => {
        const validations = [
            param("icon_id")
                .trim()
                .notEmpty()
                .withMessage("Please specify icon_id in the url"),
            check("icon")
                .custom((value, { req }) => {
                    const filename = req.file.originalname;
                    const extension = (path.extname(filename)).toLowerCase();
                    switch (extension) {
                        case '.jpg':
                            return '.jpg';
                        case '.jpeg':
                            return '.jpeg';
                        case '.png':
                            return '.png';
                        default:
                            throw new Error('Please upload an image file.');
                    }
                })
        ];
        await Promise.all(validations.map(validation => validation.run(req)));
        return validationResult(req);
    }
};