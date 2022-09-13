const { Router } = require('express');
// Importar todos los routers;
const userRouter = require('./userRoutes/index.js');
const publicationRouter = require('./publicationRoutes/index.js');

const router = Router();

router.use('/user',userRouter)
router.use('/publication',publicationRouter)


module.exports = router;
