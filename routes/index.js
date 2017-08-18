const express = require('express');
const routeLogic = require('./routeLogic');

const router = new express.Router();

router.post('/test', routeLogic.test);

module.exports = router;
