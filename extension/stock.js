
 chrome.browserAction.onClicked.addListener(function(tab) {
     chrome.tabs.executeScript({file: "content.js"});
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message.stockList) {
      var stocksIndustry = [];
      $.ajax({
        url: "http://localhost:8787/stockIndustry",
        method: "GET",
        dataType: "json",
        success: function(data2) {
            stocksIndustry = data2;

            $.ajax({
                url: "http://localhost:8787/stockCount",
                method: "GET",
                dataType: "json",
                success: function(data) {
                    var userStocks = message.stockList;
                    var stocksToBuy = [];

                    $.each(userStocks, function(i, d){
                        var filteredStock = _.filter(data, function(record) {
                            return record.Company.toLowerCase().trim().includes(d.company.toLowerCase().trim());
                        });                
                        if(filteredStock.length > 0) {
                            var selectedStock = filteredStock[0];
                            if(d.avgCost >= selectedStock.BuyPrice) {   
                                stocksToBuy.push(selectedStock);
                            }
                            else {                                
                                if((d.avgCost + 300) < selectedStock.BuyPrice) { 
                                    if(selectedStock.ExpectedReturns > 4 && selectedStock.weightedAvg >= 3) {
                                        stocksToBuy.push(selectedStock);
                                    }                                                       
                                }
                                else {
                                    if(selectedStock.ExpectedReturns > 6 && selectedStock.weightedAvg > 3) {                        
                                        stocksToBuy.push(selectedStock);
                                    }
                                }
                            }                            
                        }
                    });
                
                    var sortedStocks = _.orderBy(data, ['weightedAvg'], ['desc']);            
                    var genericTopFiveStocks = sortedStocks.slice(0, 5);

                    var outputUserPreference = 'User portfolio basis: \n';
                    $.each(stocksToBuy, function(i, da) {
                        outputUserPreference = outputUserPreference + (i+1) + '. Company: ' + da.Company + ' | Buy Price: ' + da.BuyPrice.toFixed(2) + ' | Target Price: ' + da.SellPrice.toFixed(2) + ' | Expected Returns: ' + da.ExpectedReturns.toFixed(2) + '\n';
                    });

                    var outputgenericPreference = 'General prediction: \n';
                    $.each(genericTopFiveStocks, function(i, da) {
                        outputgenericPreference = outputgenericPreference + (i+1) + '. Company: ' + da.Company + ' | Buy Price: ' + da.BuyPrice.toFixed(2) + ' | Target Price: ' + da.SellPrice.toFixed(2) + ' | Expected Returns: ' + da.ExpectedReturns.toFixed(2) + '\n';
                    });
                    var finalOutput = outputUserPreference + '\n\n' + outputgenericPreference;
                    alert(finalOutput);
                }
            });
        }
      });
  }
  else {
      alert("no data found");
  }
});
