chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('options.html', {width: 1190, height: 709});
    console.log("Generated window");
});