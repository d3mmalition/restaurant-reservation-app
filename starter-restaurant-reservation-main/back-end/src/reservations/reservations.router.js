/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/all").get(controller.list).all(methodNotAllowed);

router
  .route("/")
  .get(controller.readByDate)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:reservation_id")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router
  .route("/:reservation_id/status")
  .put(controller.statusUpdate)
  .all(methodNotAllowed);

// Adding CORS middleware to the router
router.use(cors());

module.exports = router;
