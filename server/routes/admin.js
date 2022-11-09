const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.route("/").post(adminController.create);
router.route("/login").post(adminController.login);
router.route("/changePassword").post(adminController.changePassword)

module.exports = router;
