'use strict';
let mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const middleware = require('./lib/middleware');
const routes = require('./routes');

const PORT = process.env.PORT || 8787;
const app = express();

mongoose.connect('mongodb://localhost:27017/stockdb', (err) => {
    if (err) {
        console.log('error in connecting mongodb');
    } else {

    }
});
mongoose.connection.collections['companyindustries'].drop(function (err) {
    console.log('collection dropped');
});
mongoose.connection.collections['economictimes'].drop(function (err) {
    console.log('collection dropped');
});
mongoose.connection.collections['moneycontrols'].drop(function (err) {
    console.log('collection dropped');
});
mongoose.connection.collections['yahoofinances'].drop(function (err) {
    console.log('collection dropped');
});
mongoose.connection.collections['stockcounts'].drop(function (err) {
    console.log('collection dropped');
});
app.use(bodyParser.json());
app.use(middleware.headers());

app.use('/', routes);

app.listen(PORT, () => {
    console.log('app run on port', PORT);
});