
 chrome.browserAction.onClicked.addListener(function(tab) {
     chrome.tabs.executeScript({file: "content.js"});
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message.stockList) {

      //alert(message.stockList[0].company);
      //alert(message.stockList[1].company);

      $.ajax({
        url: "http://localhost:8787/stockCount",
        method: "GET",
        dataType: "json",
        success: function(data) {
            var userStocks = message.stockList;
            var stocksToBuy = [];

            $.each(userStocks, function(i, d){
                var filteredStock = _.filter(data, function(record) {
                    return record.Company.includes(d.company.trim());
                });                
                if(filteredStock.length > 0) {
                    var selectedStock = filteredStock[0];
                    if(d.avgCost >= selectedStock.BuyPrice) {   
                        stocksToBuy.push(selectedStock);
                    }
                    else if(d.avgCost < selectedStock.BuyPrice || selectedStock.ExpectedReturns > 2) {                        
                        stocksToBuy.push(selectedStock);
                    }
                }
            });

            var output = '';
            $.each(stocksToBuy, function(i, da) {
                output = output + 'Company: ' + da.Company + ' | Buy Price: ' + da.BuyPrice + ' | Target Price: ' + da.SellPrice + ' | Expected Returns: ' + da.ExpectedReturns + '\n';
            });

            alert(output);
            //alert('Hello');
        }
    });
  }
  else {
      alert("no data found");
  }
});
