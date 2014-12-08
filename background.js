
chrome.runtime.onConnect.addListener(function (port) {
	var tab = port.sender.tab;

	port.onMessage.addListener(function (message, sender, callback) {
		var filename = message.filename;

		chrome.tabs.captureVisibleTab(tab.windowId, {format:'png'}, function (dataUrl) {

			chrome.downloads.setShelfEnabled(false);
			chrome.downloads.download(
				{
					url:dataUrl,
					filename:filename,
					conflictAction:'overwrite'
				},
				function () {
					port.postMessage({type:'screenshot_done'})
				}
			)
		});
	})
})