const router = require("express").Router();
const eventConroller = require("../controllers/eventController");

router.route("/").get(eventConroller.findAll).post(eventConroller.create);

router.route("/findFeatured").get(eventConroller.findFeatured);

router
    .route("/:id")
    .get(eventConroller.findById)
    .put(eventConroller.update)
    .delete(eventConroller.remove);

module.exports = router;
