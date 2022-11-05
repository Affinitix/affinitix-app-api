var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    console.log("at INDEX");
    return res.json({
        message: "Welcome to Affinitix API"
    });
    //res.render("index");
});

//Import Auth Router
const authRouter = require("./auth");
router.use("/auth", authRouter);

module.exports = router;