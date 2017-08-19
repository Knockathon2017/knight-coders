var mongoose = require('mongoose');
var csv = require('ya-csv');
var fs = require('fs');


var economicTimesList = fs.readFileSync('D:\EconomicTimes2.csv').toString().split('\n');
economicTimesList.shift(); // Shift the headings off the list of records.

var moneyControlList = fs.readFileSync('D:\MoneyControl2.csv').toString().split('\n');
moneyControlList.shift();

var yahooFinanceList = fs.readFileSync('D:\YahooFinance2.csv').toString().split('\n');
yahooFinanceList.shift();

var dataList = {};
var schemaKeyList = ['Stock', 'Sector', 'Cap', 'BuyPrice', 'ExpectedReturns', 'BuySell', 'SellPrice', 'TimeFrame', 'Company'];

mongoose.Promise = require('bluebird');

var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

var EconomicTimes = new mongoose.Schema({
  Stock: String,
  Sector: String,
  Cap: String,
  BuyPrice: Number,
  ExpectedReturns: Number,
  BuySell: String,
  SellPrice: Number,
  TimeFrame: Number,
  Company: String
});
var EconomicTimesDoc = mongoose.model('EconomicTimes', EconomicTimes);

var MoneyControl = new mongoose.Schema({
  Stock: String,
  Sector: String,
  Cap: String,
  BuyPrice: Number,
  ExpectedReturns: Number,
  BuySell: String,
  SellPrice: Number,
  TimeFrame: Number,
  Company: String
});
var MoneyControlDoc = mongoose.model('MoneyControl', MoneyControl);

var YahooFinance = new mongoose.Schema({
  Stock: String,
  Sector: String,
  Cap: String,
  BuyPrice: Number,
  ExpectedReturns: Number,
  BuySell: String,
  SellPrice: Number,
  TimeFrame: Number,
  Company: String
});
var YahooFinanceDoc = mongoose.model('YahooFinance', YahooFinance);

// Recursively go through list adding documents.
// (This will overload the stack when lots of entries
// are inserted.  In practice I make heavy use the NodeJS 
// "async" module to avoid such situations.)
function createDocRecurse(lineList, schemaName) {
  return new Promise((resolve, reject) => {
    if (lineList.length) {
      var line = lineList.shift();
      var doc;
      if (schemaName === 'EconomicTimes') {
        doc = new EconomicTimesDoc();
      } else if (schemaName === 'MoneyControl') {
        doc = new MoneyControlDoc();
      } else {
        doc = new YahooFinanceDoc();
      }
      line.split(',').forEach(function (entry, i) {
        doc[schemaKeyList[i]] = entry;
      });
      return resolve(doc.save(createDocRecurse(lineList, schemaName)));
    } else {
      return reject('error');
    }
  })

}

function getDataEc() {
  return EconomicTimesDoc.find({}, (err, doc) => {
    dataList.ec = doc;
  });
}

function getDataMc() {
  return MoneyControlDoc.find({}, (err, doc) => {
    dataList.mc = doc;
  });
}

function getDataYc(res) {
  return YahooFinanceDoc.find({}, (err, doc) => {
    dataList.yc = doc;
    res.send(dataList);
  });
}
module.exports.stock = (req, res) => {
  createDocRecurse(economicTimesList, 'EconomicTimes').then(() => {
    getDataEc().then(() => {
      createDocRecurse(moneyControlList, 'MoneyControl').then(() => {
        getDataMc().then(() => {
          createDocRecurse(yahooFinanceList, 'YahooFinance').then(() => {
            getDataYc(res);
          });
        });
      });
    });
  });




};