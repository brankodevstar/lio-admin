const router = require("express").Router();
const announcementController = require("../controllers/announcementController");

router
    .route("/")
    .get(announcementController.findAll)
    .post(announcementController.create);

router
    .route("/:id")
    .get(announcementController.findById)
    .put(announcementController.update)
    .delete(announcementController.remove);
router.route("/like/:id").put(announcementController.increaseLike);

module.exports = router;
