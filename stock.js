
 chrome.browserAction.onClicked.addListener(function(tab) {
     chrome.tabs.executeScript({file: "content.js"});    
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message.tableRows) {      
      receiveText(message.tableRows);
  }
  else {
      alert("no data found");
  }
});

function receiveText(resultsArray){
    var stockList = [];
    var stockDetail = {
        company:'',
        ltp: 0,
        quantity: 0,
        avgCost: 0,
        amountInvested: 0,
        daysChangeRs: 0,
        daysChangePerc: 0,
        currentNetWorth: 0,
        todaysGainLossRs: 0,
        notionalGainLossRs: 0,
        notionalGainLossPerc: 0
    }

    //alert(resultsArray[0]);

    // resultsArray.forEach(function(element, index) {
    //     var column = $(element).find('td');
    //     // stockList.push(column[0].innerText);
    //     stockList.push(column[0]);
    // });
    alert(resultsArray.length);
    
    for (var row = 0; row < resultsArray.length; row++) {        
        var column = $(resultsArray[row]).find('td');
        alert(Object.keys($(resultsArray[row])) );
        alert(Object.keys(column));
        //alert(column[0].innerText);
        alert(column);
        alert('hi');        
        //stockDetail.company = column[0].innerText;
        // stockDetail.ltp =parseFloat( column[1].innerText);
        // stockDetail.quantity =parseFloat( column[2].innerText);
        // stockDetail.avgCost =parseFloat( column[3].innerText);
        // stockDetail.amountInvested =parseFloat( column[4].innerText);
        // stockDetail.daysChangeRs =parseFloat( column[5].innerText);
        // stockDetail.daysChangePerc =parseFloat( column[6].innerText);
        // stockDetail.currentNetWorth =parseFloat( column[7].innerText);
        // stockDetail.todaysGainLossRs =parseFloat( column[8].innerText);
        // stockDetail.notionalGainLossRs =parseFloat( column[9].innerText);
        // stockDetail.notionalGainLossPerc =parseFloat( column[10].innerText);
        stockList.push(column[0].innerText);
    }
    alert(stockList[0]);
}
// function getCurrentTabUrl(callback) { 
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, function(tabs) {    
//     var tab = tabs[0];
//     var url = tab.url;
//     console.assert(typeof url == 'string', 'tab.url should be a string');
//     callback(url);
//   });

//   // Most methods of the Chrome extension APIs are asynchronous. This means that
//   // you CANNOT do something like this:
//   //
//   // var url;
//   // chrome.tabs.query(queryInfo, function(tabs) {
//   //   url = tabs[0].url;
//   // });
//   // alert(url); // Shows "undefined", because chrome.tabs.query is async.
// }

// /**
//  * @param {string} searchTerm - Search term for Google Image search.
//  * @param {function(string,number,number)} callback - Called when an image has
//  *   been found. The callback gets the URL, width and height of the image.
//  * @param {function(string)} errorCallback - Called when the image is not found.
//  *   The callback gets a string that describes the failure reason.
//  */
// function getImageUrl(searchTerm, callback, errorCallback) {
//   // Google image search - 100 searches per day.
//   // https://developers.google.com/image-search/
//   var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//     '?v=1.0&q=' + encodeURIComponent(searchTerm);
//   var x = new XMLHttpRequest();
//   x.open('GET', searchUrl);
//   // The Google image search API responds with JSON, so let Chrome parse it.
//   x.responseType = 'json';
//   x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected respose from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
//   };
//   x.send();
// }

// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }

// document.addEventListener('DOMContentLoaded', function() {
//   getCurrentTabUrl(function(url) {
//     // Put the image URL in Google search.
//     //renderStatus('Performing Google Image search for ' + url);

//     getImageUrl(url, function(imageUrl, width, height) {

//     //   renderStatus('Search term: ' + url + '\n' +
//     //       'Google image search result: ' + imageUrl);
//       var imageResult = document.getElementById('image-result');
//       // Explicitly set the width/height to minimize the number of reflows. For
//       // a single image, this does not matter, but if you're going to embed
//       // multiple external images in your page, then the absence of width/height
//       // attributes causes the popup to resize multiple times.
//     //   imageResult.width = width;
//     //   imageResult.height = height;
//     //   imageResult.src = imageUrl;
//     //   imageResult.hidden = false;

//     }, function(errorMessage) {
//       renderStatus('Cannot display image. ' + errorMessage);
//     });
//   });
// });