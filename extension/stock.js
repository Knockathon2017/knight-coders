
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
        success: function(data) { alert(data[0].Stock); }
    });
  }
  else {
      alert("no data found");
  }
});
