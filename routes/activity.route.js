const ActivityController = require("../controllers/activity.controller");
const activitySchema = require("../validation/activity");
const validate = require("../validation/validator");
const router = require("express").Router();

router.post("/", validate(activitySchema), ActivityController.create);
router.patch("/:id", ActivityController.update);
router.get("/", ActivityController.findAll);
router.get("/:id", ActivityController.find);
router.delete("/:id", ActivityController.destroy);

module.exports = router;
