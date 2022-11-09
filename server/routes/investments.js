const router = require("express").Router();
const investmentController = require("../controllers/investmentController");

router
    .route("/")
    .get(investmentController.findAll)
    .post(investmentController.create);

router.route("/findFeatured").get(investmentController.findFeatured);

router
    .route("/:id")
    .get(investmentController.findById)
    .put(investmentController.update)
    .delete(investmentController.remove);

module.exports = router;
