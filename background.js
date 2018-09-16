var allowFocusChange = true;

// set delay time (minimum sample rate) in ms
var delayTime = 5000;

chrome.tabs.onUpdated.addListener(function (tabId, tabUpdateInfo, tabState) {
	if (allowFocusChange && tabUpdateInfo.url != null) {
		// placeholder for opening secondary capture window
		
		chrome.storage.sync.get(['category'], function (result) {
			var category;
			console.log(result)
			if (result == null) {
				category = getCategory(tabUpdateInfo.url);

				chrome.storage.sync.set({ sentiments: sentiments }, function () {
					chrome.storage.local.get('sentiments', function (test) {
						console.log(test.sentiments)
					});
				});
			} else {
				sentiments = items.sentiments;
				sentiments.push({ result: result });
				chrome.storage.sync.set({ sentiments: sentiments }, function () {
					chrome.storage.local.get('sentiments', function (test) {
						console.log(test.sentiments)
					});
				});
			}
		});

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
	// parse the url

	// see which category it fits under
}