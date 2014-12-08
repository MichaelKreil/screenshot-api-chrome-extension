var port = chrome.runtime.connect();
port.onMessage.addListener(function (message) {
	if (message.type == 'screenshot_done') {
		//console.log('transceive down "screenshot_done"');
		window.postMessage(message, '*');
	}
});

window.addEventListener('message', function(event) {
	if (event.source != window) return;
	if (event.data.type && (event.data.type == 'screenshot_do')) {
		//console.log('transceive up "screenshot_do"');
		port.postMessage(event.data);
	}
}, false);
