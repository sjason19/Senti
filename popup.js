/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
// function getImageKeywords(img) {
//   console.log(img);
//   const app = new Clarifai.App({
//     apiKey: '65c1d14cd9f94e27bf58fbf8da6f26c0'
//    });

//   $('#status').html("loading keywords for image...");
//   if(window.savedClarifaiResponse == null) {
//   app.models.predict(Clarifai.GENERAL_MODEL, img).then(
//               function(response) {
//                   console.log(response);
//                   var $el = $('#keyword-result');
//                   debugger;
//                   var keywordTags = response.data.outputs[0].data.concepts;
//                   for(var i=0;i<keywordTags.length;i++){
//                     var name = keywordTags[i].name;
//                     name = name.replace("\"","");
//                     name += ",";
//                   $el.append(name);
//                   }
//                   window.savedClarifaiResponse = response;
//                   $('#status').html("");

//               },
//               function(err) {
//                   console.error(err);
//               }
//           );
//   } else {
//             var response = window.savedClarifaiResponse;
//             var keywords = '';
//             for(var j=0;j<response.data.outputs.length;j++){
//                 for(var k=0;k<response.data.outputs[j].data.concepts.length;k++){
//                     if(response.data.outputs[j].data.concepts[k].value > probability && keywords.indexOf(response.data.outputs[j].data.concepts[k].name) == -1){
//                         keywords += ","+response.data.outputs[j].data.concepts[k].name;
//                         keywordArray.push({id: response.data.outputs[j].data.concepts[k].id, text: response.data.outputs[j].data.concepts[k].name});
//                     }
//                 }
//             }
//             $('#status').html("");
//             document.getElementById('keyword-result').innerHTML = keywordArray;
//             console.log(keywordArray);
//   }
// }
const app = new Clarifai.App({
  apiKey: '28d269d8ec60434c849e75a1d5ec4fbf'
 });

document.getElementById("emotion-button").addEventListener("click", getEmotionAsynchronous);

function getEmotion() {
  app.models.predict(Clarifai.GENERAL_MODEL, "https://previews.123rf.com/images/kurhan/kurhan1103/kurhan110300100/9050894-happy-man.jpg", {
    selectConcepts: [
      {name: 'happiness'},
      {name: 'sadness'},
      {name: 'neutral'}
    ]
  }).then(
    function(response) {
      // do something with response
      return getLargestEmotion(response);
    },
    function(err) {
      // there was an error
      console.log("error");
    }
  );
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
  var result = await getEmotion();
  switch(result) {
    case "happiness":
        resultHappy("canada");
        break;
    case "sad":
        resultSad("canada");
        break;
    case "angry":
        resultAngry("canada");
        break;
    default:
        resultLonely("canada");
  }
}

function resultHappy(country) {
  console.log("at happy")
  var img = document.createElement("img");
  img.src = "happy.png";
  img.height = "100";
  img.width = "100";

  var src = document.getElementById("image-result");
  src.appendChild(img);
}

function resultSad(country) {
  console.log("at sad")
  var img = document.createElement("img");
  img.src = "happy.png";
  img.height = "100";
  img.width = "100";

  var src = document.getElementById("image-result");
  src.appendChild(img);
}

function resultLonely(country) {
  console.log("at lonely")
  var img = document.createElement("img");
  img.src = "happy.png";
  img.height = "100";
  img.width = "100";

  var src = document.getElementById("image-result");
  src.appendChild(img);
}

function resultAngry(country) {
  console.log("at angry")
  var img = document.createElement("img");
  img.src = "happy.png";
  img.height = "100";
  img.width = "100";

  var src = document.getElementById("image-result");
  src.appendChild(img);
}

function getLocation() {
  return "canada"
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
  var apiKeyVal = '65c1d14cd9f94e27bf58fbf8da6f26c0';
  // Save it using the Chrome extension storage API.
  storage.set({'apiKeyVal': apiKeyVal}, function() {
  });
}

document.addEventListener('DOMContentLoaded', function() {

  window.storage = chrome.storage.local;

  window.savedClarifaiResponse = null;
    // Load any CSS that may have previously been saved.
    console.log("at event listener");
});