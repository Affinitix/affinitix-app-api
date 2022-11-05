const express = require('express');
const router = express.Router();

router.get("/uploads/:file_name", async (req, res) => {
    const { fileUploadProvider } = require("../config");
    const originalURL = await fileUploadProvider.getPresignedFileUrl(req.params.file_name);
    return res.redirect(originalURL);
});

module.exports = router;