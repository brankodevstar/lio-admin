const router = require("express").Router();
const benefitController = require("../controllers/benefitController");

router.route("/").get(benefitController.findAll).post(benefitController.create);

router
    .route("/:id")
    .get(benefitController.findById)
    .put(benefitController.update)
    .delete(benefitController.remove);

module.exports = router;
