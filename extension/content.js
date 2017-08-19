var tableRows = $(".table-responsive.clear_lr:not('.ng-hide') .table .rowHovr");
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

for (var row = 0; row < tableRows.length; row++) {        
    var column = $(tableRows[row]).find('td');
    stockDetail = new Object();
    stockDetail.company = column[0].innerText;
    stockDetail.ltp = parseFloat( column[1].innerText);
    stockDetail.quantity = parseFloat( column[2].innerText);
    stockDetail.avgCost = parseFloat( column[3].innerText);
    stockDetail.amountInvested = parseFloat( column[4].innerText);
    stockDetail.daysChangeRs = parseFloat( column[5].innerText);
    stockDetail.daysChangePerc = parseFloat( column[6].innerText);
    stockDetail.currentNetWorth = parseFloat( column[7].innerText);
    stockDetail.todaysGainLossRs = parseFloat( column[8].innerText);
    stockDetail.notionalGainLossRs = parseFloat( column[9].innerText);
    stockDetail.notionalGainLossPerc = parseFloat( column[10].innerText);
    stockList.push(stockDetail);
}
chrome.runtime.sendMessage({stockList: stockList});