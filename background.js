var allowFocusChange = true;

// set delay time (minimum sample rate) in ms
var delayTime = 5000;

chrome.tabs.onUpdated.addListener(function(tabId, tabUpdateInfo, tabState) {
    if (allowFocusChange && tabUpdateInfo.url != null) {
        // placeholder for opening secondary capture window
        alert(tabUpdateInfo.url);
        concatFocusChange();
    }
});

function concatFocusChange() {
    allowFocusChange = false;
    setTimeout(function() {allowFocusChange = true}, delayTime);
}