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

function getCategory(url) {
    if (url.includes("facebook")) return 'Social Networking';
    if (url.includes("amazon")) return 'Shopping';
    if (url.includes("cnn")) return 'News';
    if (url.includes("ubc")) return 'Education';
    if (url.includes("techcrunch")) return 'Technology';
    if (url.includes("nba")) return 'Sports';
    if (url.includes("bloomberg")) return 'Finance';
    return 'Other'
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
			'Old value was "%s", new value is "%s".',
			key,
			namespace,
			storageChange.oldValue,
			storageChange.newValue);
	}
});