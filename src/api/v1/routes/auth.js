const express = require('express');
const router = express.Router();
const controllers = require("../controllers/");

router.post("/icons", controllers.auth.icons.createIcon);
router.get("/icons", controllers.auth.icons.getAllIcons);

router.post("/users/register", controllers.auth.users.register);
router.post("/users/login", controllers.auth.users.login);
router.post("/users/verifyicon", controllers.auth.users.verifyUserIcon);
router.put("/users/updatepassword", controllers.auth.users.updatePassword);

router.post("/users/forgotpassword/sendcode", controllers.auth.forgotpassword.sendUserCode);
router.post("/users/forgotpassword/verifycode", controllers.auth.forgotpassword.verifyUserCode);

router.post("/users/emailverifyer/sendcode", controllers.auth.emailverifyer.sendUserCode);
router.post("/users/emailverifyer/verifycode", controllers.auth.emailverifyer.verifyUserCode);

router.post("/admins/forgotpassword/sendcode", controllers.auth.forgotpassword.sendAdminCode);
router.post("/admins/forgotpassword/verifycode", controllers.auth.forgotpassword.verifyAdminCode);

router.post("/admins/emailverifyer/sendcode", controllers.auth.emailverifyer.sendAdminCode);
router.post("/admins/emailverifyer/verifycode", controllers.auth.emailverifyer.verifyAdminCode);



router.get("/admins/register", controllers.auth.admins.register);
router.get("/admins/login", controllers.auth.admins.login);
router.put("/admins/updatepassword", controllers.auth.admins.updatePassword);


module.exports = router;