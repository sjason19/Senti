const app = new Clarifai.App({
  apiKey: '00d157dbe1164bd5b891cdaa0cd25ba4'
});

document.getElementById("emotion-button").addEventListener("click", getEmotionAsynchronous);

function getEmotion() {
  return new Promise(function (resolve, reject) {
    app.models.predict({ id: 'EmotionDetection', version: '8cdcab711f354950b68d3d239b50291b' }, { base64: getBase64() }).then(
      function (response) {
        // do something with response
        // console.log(getBase64());
        resolve(getLargestEmotion(response));
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

async function getEmotionAsynchronous() {
  var result;

  try {
    result = await getEmotion();

    chrome.storage.sync.get({sentiments:[]}, function(items) {
      var sentiments;
      console.log(items)
      if (items == null) {
        sentiments = [];
        sentiments.push({
          result
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

// Store CSS data in the "local" storage area.
//
// Usually we try to store settings in the "sync" area since a lot of the time
// it will be a better user experience for settings to automatically sync
// between browsers.
//
// However, "sync" is expensive with a strict quota (both in storage space and
// bandwidth) so data that may be as large and updated as frequently as the CSS
// may not be suitable.

function saveChanges() {
  // Get the current CSS snippet from the form.
  var apiKeyVal = '65c1d14cd9f94e27bf58fbf8da6f26c0';
  // Save it using the Chrome extension storage API.
  storage.set({ 'apiKeyVal': apiKeyVal }, function () {
  });
}

document.addEventListener('DOMContentLoaded', function () {

  window.storage = chrome.storage.local;

  window.savedClarifaiResponse = null;
  // Load any CSS that may have previously been saved.
  // console.log("at event listener");
});

document.querySelector('#go-to-options').addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

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

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
  });

function getBase64() {
  var url = document.getElementById('canvas').toDataURL();
  url = url.replace(/^data:image\/(png|jpg);base64,/, "");
  return url;
}
