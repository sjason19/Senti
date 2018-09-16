const app = new Clarifai.App({
  apiKey: '28d269d8ec60434c849e75a1d5ec4fbf'
});

document.getElementById("emotion-button").addEventListener("click", getEmotionAsynchronous);

function getEmotion() {
  return new Promise(function (resolve, reject) {
    app.models.predict(Clarifai.GENERAL_MODEL, "https://previews.123rf.com/images/kurhan/kurhan1103/kurhan110300100/9050894-happy-man.jpg", {
      selectConcepts: [
        { name: 'happiness' },
        { name: 'sadness' },
        { name: 'neutral' }
      ]
    }).then(
      function (response) {
        // do something with response
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
    if (emotion.value > largestValue) {
      largestValue = emotion.value;
      largestEmotion = emotion.name;
    }
  }
  console.log(largestEmotion);
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
        sentiments.push({result: result});
        chrome.storage.sync.set({sentiments: sentiments}, function () {
          chrome.storage.local.get('sentiments', function (test) {
            console.log(test.sentiments)
          });
        });
      } else {
        sentiments = items.sentiments;
        sentiments.push({result: result});
        chrome.storage.sync.set({sentiments: sentiments}, function () {
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

function displaySentiments() {
  
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
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
  console.log("at event listener");
});