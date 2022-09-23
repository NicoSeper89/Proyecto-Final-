const { Router } = require("express");
const { premiumController } = require("./controllers");

const router = Router();

router.post("/premium", premiumController);
router.get("/test", async (req, res, next) => {
    try {
      res.redirect('https://localhost:3000/PaymentOk');
    } catch (error) {
      next(error);
    }
  });
module.exports = router;