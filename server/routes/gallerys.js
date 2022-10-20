const router = require("express").Router();
const galleryController = require("../controllers/galleryController");

router.route("/")
    .get(galleryController.findAll)
    .post(galleryController.create);

router
    .route("/:id")
    .get(galleryController.findById)
    .put(galleryController.update)
    .delete(galleryController.remove);

module.exports = router;
