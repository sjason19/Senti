const app = new Clarifai.App({
	apiKey: '00d157dbe1164bd5b891cdaa0cd25ba4'
});

function getEmotion() {
	return new Promise(function (resolve, reject) {
		app.models.predict({ id: 'EmotionDetection', version: '8cdcab711f354950b68d3d239b50291b' }, { base64: getBase64() }).then(
			function (response) {
				// do something with response
				// console.log(getBase64());
				data = {
					result: getLargestEmotion(response),
					category: getCategory()
				}
				resolve(data);
			},
			function (err) {
				// there was an error
				reject(console.log("error"));
			}
		);
	});
}

function getLargestEmotion(response) {
	var emotions = response.outputs[0].data.concepts;
	var largestValue = emotions[0].value;
	var largestEmotion = emotions[0].name;

	for (var emotion in emotions) {
		console.log(emotions[emotion].name);
		console.log(emotions[emotion].value);
		if (emotions[emotion].value > largestValue) {
			largestValue = emotions[emotion].value;
			largestEmotion = emotions[emotion].name;
		}
	}
	return largestEmotion;
}

function getCategory() {
	return;
}

async function getEmotionAsynchronous() {
	var result;
	var category;

	try {
		result = await getEmotion();
		chrome.storage.sync.get({ sentiments: [] }, function (items) {
			var sentiments;
			console.log(items)
			if (items == null) {
				sentiments = [];
				sentiments.push({
					result: result
				});
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
	} catch (err) {
		message(err)
	}
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

function getBase64() {
	var url = document.getElementById('canvas').toDataURL();
	url = url.replace(/^data:image\/(png|jpg);base64,/, "");
	return url;
}

function getWebcamImage() {
	const player = document.getElementById('player');
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const captureButton = document.getElementById('capture');

	const constraints = {
		video: true,
	};

	captureButton.addEventListener('click', () => {
		// Draw the video frame to the canvas.
		context.drawImage(player, 0, 0, canvas.width, canvas.height);
	});

	navigator.mediaDevices.getUserMedia(constraints)
		.then((stream) => {
			player.srcObject = stream;
		});

	setTimeout(function(){
		captureButton.click();
		getEmotionAsynchronous();
	}, 1000);
}

window.onload = function() {
	getWebcamImage();
	setTimeout(function() {
		window.close();
	}, 2000)
}