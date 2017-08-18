'use strict';

// const configModule = require('exframe-configuration');
// // const logger = require('exframe-logger').create(process.env.LOGSENE_TOKEN || 'token');
const express = require('express');
const bodyParser = require('body-parser');

const middleware = require('./lib/middleware');
const routes = require('./routes');

const PORT = process.env.PORT || 8787;
const app = express();

app.use(bodyParser.json());
app.use(middleware.headers());

app.use('/', routes);

app.listen(PORT, () => {
    console.log('service is running on port ', PORT);
});
