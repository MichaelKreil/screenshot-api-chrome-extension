# Installation

* Pull'n
* In Chrome `chrome://extensions/` öffnen
* Rechts oben "Developer Mode" aktivieren
* Mit "Load Extracted Extension" diesen Folder öffnen

Damit können alle Webseiten, die unter `file:///` oder `localhost` geöffnet sind, Screenshots auslösen.

* In der bildschirmschießenden Webapp folgenden Code einfügen:

		(function () {
			var _callback = false;

			window.addEventListener('message', function(event) {
				if (event.source != window) return;
				
				if (event.data.type && (event.data.type == 'screenshot_done')) {
					var cb = _callback;
					_callback = false;
					if (cb) cb();
				}
			}, false);

			window.screenshot = function (filename, callback) {
				if (_callback) throw Error('Ein Screenshot nach dem anderen, bitte!');

				_callback = callback;
				window.postMessage({ type: 'screenshot_do', filename: filename }, '*');
			}
		})()

* Screenshots werden ausgelöst mit:
`window.screenshot(filename, callback)`



In code we trust
