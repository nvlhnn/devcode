const ItemController = require("../controllers/item.controller");
const itemSchema = require("../validation/item");
const validate = require("../validation/validator");
const router = require("express").Router();

router.post("/", validate(itemSchema), ItemController.create);
router.patch("/:id", ItemController.update);
router.get("/", ItemController.findAll);
router.get("/:id", ItemController.find);
router.delete("/:id", ItemController.destroy);

module.exports = router;
