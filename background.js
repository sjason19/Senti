var allowFocusChange = true;

// set delay time (minimum sample rate) in ms
var delayTime = 5000;
var CATEGORIES = ['Social Networking', 'Shopping', 'News', 'Education', 'Technology', 'Sports', 'Finance', 'Other'];

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

chrome.tabs.onUpdated.addListener(function (tabId, tabUpdateInfo, tabState) {
	var blackList = [null, 'chrome://newtab']
	if (allowFocusChange && !blackList.includes(tabUpdateInfo.url)) {
		// placeholder for opening secondary capture window
		
		chrome.storage.sync.get(['category'], function (result) {
			var currentCategory;
			console.log(result)
			if (result == null) {
				currentCategory = getCategory(tabUpdateInfo.url);

				chrome.storage.sync.set({ category: currentCategory }, function () {
					chrome.storage.local.get('category', function (test) {
						console.log(test.category)
					});
				});
			} else {
				category = result.category;
				currentCategory = getCategory(tabUpdateInfo.url);
				chrome.storage.sync.set({ category: currentCategory }, function () {
					chrome.storage.local.get('sentiments', function (test) {
						console.log(test.category)
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