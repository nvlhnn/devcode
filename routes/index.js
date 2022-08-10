const router = require("express").Router();

const activityRoute = require("./activity.route");
const itemRoute = require("./item.route");

router.use("/activity-groups", activityRoute);
router.use("/todo-items", itemRoute);

router.use("/api", router);
// router.get('api/user/stat', (req, res) => res.status(200).json('ok'))
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
