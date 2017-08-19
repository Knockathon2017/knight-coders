var tableRows = $(".table-responsive.clear_lr:not('.ng-hide') .table .rowHovr");
chrome.runtime.sendMessage({tableRows: tableRows});