var mongoose = require('mongoose');
var csv = require('ya-csv');
var fs = require('fs');

var _ = require('lodash');


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

var stockCount = new mongoose.Schema({
  Stock: {
    type: String
  },
  Sector: {
    type: String
  },
  Cap: {
    type: String
  },
  BuyPrice: {
    type: Number
  },
  ExpectedReturns: {
    type: Number
  },
  BuySell: {
    type: String
  },
  SellPrice: {
    type: Number
  },
  TimeFrame: {
    type: Number
  },
  Company: {
    type: String
  },
  count: {
    type: Number
  },
  weightedAvg: {
    type: Number
  }
}, {
  versionKey: false,
  minimize: false,
  strict: true
});
var stockCountDoc = mongoose.model('stockCount', stockCount);

// Recursively go through list adding documents.
// (This will overload the stack when lots of entries
// are inserted.  In practice I make heavy use the NodeJS 
// "async" module to avoid such situations.)
function createDocRecurse(lineList, schemaName) {
  return new Promise((resolve, reject) => {
    if (lineList && lineList.length && lineList[lineList.length] !== "") {
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
      return resolve(true);
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

    for (var record of dataList.ec) {

      if (record.Stock) {
        var meanValue = 3;
        var count = 1;
        var buyPrice = record.BuyPrice * 3;
        var expectedReturns = record.ExpectedReturns * 3;
        var sellPrice = record.SellPrice * 3;
        var mcRecord = _.find(dataList.mc, {
          Stock: record.Stock
        });

        if (mcRecord) {
          dataList.mc = _.remove(dataList.mc, (ob) => {
            if (ob.Stock !== record.Stock) {
              return ob;
            }
          });
          meanValue = meanValue + 2;
          count++;
          buyPrice = buyPrice + mcRecord.BuyPrice * 2;
          expectedReturns = expectedReturns + mcRecord.ExpectedReturns * 2;
          sellPrice = sellPrice + mcRecord.SellPrice * 2;
        }

        var ycRecord = _.find(dataList.yc, {
          Stock: record.Stock
        });

        if (ycRecord) {
          dataList.yc = _.remove(dataList.yc, (ob) => {
            if (ob.Stock !== record.Stock) {
              return ob;
            }
          });
          buyPrice = buyPrice + ycRecord.BuyPrice;
          expectedReturns = expectedReturns + ycRecord.ExpectedReturns;
          sellPrice = sellPrice + ycRecord.SellPrice;
          meanValue = meanValue + 1;
          count++;
        }

        var newRecord = new Object();
        newRecord.Stock = record.Stock,
          newRecord.Sector = record.Sector,
          newRecord.Cap = record.Cap,
          newRecord.BuyPrice = buyPrice/meanValue,
          newRecord.ExpectedReturns = expectedReturns/meanValue,
          newRecord.BuySell = record.BuySell,
          newRecord.SellPrice = sellPrice/meanValue,
          newRecord.TimeFrame = record.TimeFrame,
          newRecord.Company = record.Company,
          newRecord.count = count;
        newRecord.weightedAvg = meanValue;
        var stockc = new stockCountDoc(newRecord);
        stockc.save((err) => {
          if (!err) {
            return true;
          }
        }, {
          validateBeforeSave: false
        });
      }
    }

    for (var record of dataList.mc) {

      if (record.Stock) {
        var buyPrice = record.BuyPrice * 2;
        var expectedReturns = record.ExpectedReturns * 2;
        var sellPrice = record.SellPrice * 2;
        var meanValue = 2;
        var count = 1;

        var ycRecord = _.find(dataList.yc, {
          Stock: record.Stock
        });

        if (ycRecord) {
          dataList.yc = _.remove(dataList.yc, (ob) => {
            if (ob.Stock !== record.Stock) {
              return ob;
            }
          });
          buyPrice = buyPrice + ycRecord.BuyPrice;
          expectedReturns = expectedReturns + ycRecord.ExpectedReturns;
          sellPrice = sellPrice + ycRecord.SellPrice;
          meanValue = meanValue + 1;
          count++;
        }

        var newRecord = new Object();
        newRecord.Stock = record.Stock,
          newRecord.Sector = record.Sector,
          newRecord.Cap = record.Cap,
          newRecord.BuyPrice = buyPrice/meanValue,
          newRecord.ExpectedReturns = expectedReturns/meanValue,
          newRecord.BuySell = record.BuySell,
          newRecord.SellPrice = sellPrice/meanValue,
          newRecord.TimeFrame = record.TimeFrame,
          newRecord.Company = record.Company,
          newRecord.count = count;
        newRecord.weightedAvg = meanValue;
        var stockc = new stockCountDoc(newRecord);
        stockc.save((err) => {
          if (!err) {
            return true;
          }
        }, {
          validateBeforeSave: false
        });
      }
    }

    for (var record of dataList.yc) {

      if (record.Stock) {
        var meanValue = 1;
        var count = 1;

        var newRecord = new Object();
        newRecord.Stock = record.Stock,
          newRecord.Sector = record.Sector,
          newRecord.Cap = record.Cap,
          newRecord.BuyPrice = record.BuyPrice,
          newRecord.ExpectedReturns = record.ExpectedReturns,
          newRecord.BuySell = record.BuySell,
          newRecord.SellPrice = record.SellPrice,
          newRecord.TimeFrame = record.TimeFrame,
          newRecord.Company = record.Company,
          newRecord.count = count;
        newRecord.weightedAvg = meanValue;
        var stockc = new stockCountDoc(newRecord);
        stockc.save((err) => {
          if (!err) {
            return true;
          }
        }, {
          validateBeforeSave: false
        });
      }
    }

    res.send(dataList);
  });
}


function getStockCount(res) {
  return stockCountDoc.find({}, (err, doc) => {
    //console.log(doc)
    res.send(doc);
  });
}
module.exports.stock = (req, res) => {
  createDocRecurse(economicTimesList, 'EconomicTimes').then(() => {
    getDataEc().then(() => {
      createDocRecurse(moneyControlList, 'MoneyControl').then(() => {
        getDataMc().then(() => {
          createDocRecurse(yahooFinanceList, 'YahooFinance').then(() => {
            getDataYc(res);
          }).catch((err) => {
            console.log(err)
          });
        }).catch((err) => {
          console.log(err)
        });
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {
      console.log(err)
    });
  }).catch((err) => {
    console.log(err)
  });

};
module.exports.stockCount = (req, res) => {
  getStockCount(res);
}