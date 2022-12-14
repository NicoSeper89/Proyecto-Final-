const { Router } = require("express");
// Importar todos los routers;
const userRouter = require("./userRoutes/index.js");
const publicationRouter = require("./publicationRoutes/index.js");
const mpRouter = require("./mpRoutes/index.js");
const adminRoutes = require("./adminRoutes/index.js");
const router = Router();

router.use("/user", userRouter);
router.use("/publication", publicationRouter);
router.use("/sell", mpRouter);
router.use("/admin", adminRoutes);

module.exports = router;
