const { Router } = require('express');
const router = Router();
const postPorperty = require('./controllers')

router.post('/postProperty', postPorperty(req, res, next))