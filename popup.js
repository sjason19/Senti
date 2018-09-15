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

function resultHappy() {
  var img = document.createElement("img");
  img.src = "happy.png";

  var src = document.getElementById("image-result");
  src.appendChild(img);
}

function resultSad() {
  
}

function resultLonely() {
  
}

function resultAngry() {
  
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
  // Get at the DOM controls used in the sample.
  window.emotionalCheck = document.getElementById('emotionalCheck');

  // Load any CSS that may have previously been saved.
  console.log("at event listener");
  emotionalCheck.addEventListener('click', resultHappy());
});