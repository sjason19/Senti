/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    //console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageKeywords(img) {
  console.log(img);
  const app = new Clarifai.App({
    apiKey: '65c1d14cd9f94e27bf58fbf8da6f26c0'
   });

  $('#status').html("loading keywords for image...");
  if(window.savedClarifaiResponse == null) {
  app.models.predict(Clarifai.GENERAL_MODEL, img).then(
              function(response) {
                  console.log(response);
                  var $el = $('#keyword-result');
                  debugger;
                  var keywordTags = response.data.outputs[0].data.concepts;
                  for(var i=0;i<keywordTags.length;i++){
                    var name = keywordTags[i].name;
                    name = name.replace("\"","");
                    name += ",";
                  $el.append(name);
                  }
                  window.savedClarifaiResponse = response;
                  $('#status').html("");

              },
              function(err) {
                  console.error(err);
              }
          );
  } else {
            var response = window.savedClarifaiResponse;
            var keywords = '';
            for(var j=0;j<response.data.outputs.length;j++){
                for(var k=0;k<response.data.outputs[j].data.concepts.length;k++){
                    if(response.data.outputs[j].data.concepts[k].value > probability && keywords.indexOf(response.data.outputs[j].data.concepts[k].name) == -1){
                        keywords += ","+response.data.outputs[j].data.concepts[k].name;
                        keywordArray.push({id: response.data.outputs[j].data.concepts[k].id, text: response.data.outputs[j].data.concepts[k].name});
                    }
                }
            }
            $('#status').html("");
            document.getElementById('keyword-result').innerHTML = keywordArray;
            console.log(keywordArray);
  }
}

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
  var apiKeyVal = apiKey.value;
  var apiSecretVal = apiSecret.value;
  var apiValues = {'apiKey': apiKeyVal,'apiSecret': apiSecretVal};
  // Check that there's some code there.
  if (!apiKey) {
    message('Error: No API key specified');
    return;
  }
  if (!apiSecret) {
    message('Error: No API secret specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'apiValues': apiValues}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

function loadChanges() {
  storage.get('apiValues', function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.apiValues) {
      apiKey.value = items.apiValues.apiKey;
      apiSecret.value = items.apiValues.apiSecret;
      message('Loaded saved API keys.');
    }
  });
}

function message(msg) {
  var message = document.getElementById('status');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  //getImageKeywords();
  console.log("this happened");

  window.storage = chrome.storage.local;

  window.savedClarifaiResponse = null;
  // Get at the DOM controls used in the sample.
  window.emotionalCheck = document.getElementById('emotionalCheck');

  // Load any CSS that may have previously been saved.
  loadChanges();
  emotionalCheck.addEventListener('click', getCurrentTabUrl(getImageKeywords));
});