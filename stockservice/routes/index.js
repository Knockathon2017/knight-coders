const express = require('express');
const routeLogic = require('./routeLogic');

const router = new express.Router();

router.get('/stocks', routeLogic.stock);

module.exports = router;
