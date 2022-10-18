const router = require("express").Router();
const postsController = require("../controllers/postsController");

router.route("/").get(postsController.findAll).post(postsController.create);

router
  .route("/:id")
  .get(postsController.findById)
  .put(postsController.update)
  .delete(postsController.remove);

module.exports = router;
