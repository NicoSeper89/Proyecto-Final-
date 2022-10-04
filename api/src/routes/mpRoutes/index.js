const { Router } = require("express");
const { premiumController } = require("./controllers");

const router = Router();

router.post("/premium", premiumController);

module.exports = router;