var allowFocusChange = true;

// set delay time (minimum sample rate) in ms
var delayTime = 5000;

chrome.tabs.onUpdated.addListener(function (tabId, tabUpdateInfo, tabState) {
	if (allowFocusChange && tabUpdateInfo.url != null) {
		// placeholder for opening secondary capture window
		setTimeout(function() {
			chrome.windows.create({ url: './secondaryPopup/secondaryPopup.html', type: 'popup', top: 0, left: 0, height: 1, width: 1, focused: false });
			concatFocusChange();
		}, 5000);
	}
});

function concatFocusChange() {
	allowFocusChange = false;
	setTimeout(function () { allowFocusChange = true }, delayTime);
}
