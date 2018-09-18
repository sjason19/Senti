// can't record a new URL-visit entry within delayTime (in ms)
var delayTime = 5000;

// record user webcam input after inputTime (in ms)
var inputTime = 2500;

var allowFocusChange = true;

chrome.tabs.onUpdated.addListener(function (tabId, tabUpdateInfo, tabState) {
	if (tabUpdateInfo.url != null) {
		if (allowFocusChange && isValidURL(tabUpdateInfo.url)) {
			var category = getCategory(tabUpdateInfo.url);
			if (category != 'Other') {
			chrome.storage.sync.get({ categories: [] }, function (items) {
				var categories;
				console.log(items)
				if (items == null) {
					categories = [];
					categories.push({
						category: category
					});
					chrome.storage.sync.set({ categories: categories }, function () {
						chrome.storage.local.get('categories', function (test) {
							console.log(test.categories)
						});
					});
				} else {
					categories = items.categories;
					categories.push({ category: category });
					chrome.storage.sync.set({ categories: categories }, function () {
						chrome.storage.local.get('sentiments', function (test) {
							console.log(test.categories)
						});
					});
				}
			});
		}

			// placeholder for opening secondary capture window
			setTimeout(function() {
				chrome.windows.create({ url: './secondaryPopup/secondaryPopup.html', type: 'popup', top: 0, left: 0, height: 1, width: 1, focused: false });
				concatFocusChange();
			}, inputTime);
		}
	}
});

function concatFocusChange() {
	allowFocusChange = false;
	setTimeout(function () { allowFocusChange = true }, delayTime);
}

function isValidURL(url) {
	return (!url.startsWith('chrome') && url != null);
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