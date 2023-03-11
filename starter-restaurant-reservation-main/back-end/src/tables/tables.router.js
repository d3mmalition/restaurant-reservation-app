const router = require("express").Router({ mergeParams: true });
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:table_id/seat")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/:table_id").get(controller.read).all(methodNotAllowed);

// Adding CORS middleware to the router
router.use(cors());

module.exports = router;
