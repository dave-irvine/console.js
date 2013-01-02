/*jslint browser: true */
(function (global, debug) {
	"use strict";

	if (global.console || !debug) { return; }

	var consoleReady = false,
		consoleInner = document.createElement("div"),
		consoleText = document.createElement("div"),
		consoleLayer1Wrap = document.createElement("div"),
		consoleLayer2Wrap = document.createElement("div"),
		consoleLayer3Wrap = document.createElement("div"),
		consoleLayer4Wrap = document.createElement("div"),
		consoleWrap = document.createElement("div"),
		consoleStyle = document.createElement("link"),
		consoleClose = document.createElement("img"),
		consolePopout = document.createElement("img"),
		consoleMinimize = document.createElement("img"),
		messageQueue = [],
		displayQueuedMessages;

	consoleInner.className = "inner";
	consoleText.className = "text";

	consoleLayer1Wrap.className = "layer1";
	consoleLayer2Wrap.className = "layer2";
	consoleLayer3Wrap.className = "layer3";
	consoleLayer4Wrap.className = "layer4";

	consoleClose.className = "close";
	consoleClose.src = "close.PNG";

	consoleMinimize.className = "minimize";
	consoleMinimize.src = "minimize.PNG";

	consolePopout.className = "popout";
	consolePopout.src = "popout.PNG";

	consoleWrap.id = "ie7console";

	consoleStyle.href = "style.css";
	consoleStyle.rel = "stylesheet";

	consoleInner.appendChild(consoleClose);
	consoleInner.appendChild(consoleMinimize);
	consoleInner.appendChild(consolePopout);

	consoleInner.appendChild(consoleText);

	consoleLayer1Wrap.appendChild(consoleInner);
	consoleLayer2Wrap.appendChild(consoleLayer1Wrap);
	consoleLayer3Wrap.appendChild(consoleLayer2Wrap);
	consoleLayer4Wrap.appendChild(consoleLayer3Wrap);
	consoleWrap.appendChild(consoleLayer4Wrap);

	displayQueuedMessages = function () {
		var i,
			message;

		while (messageQueue.length > 0) {
			message = messageQueue.shift();
			consoleText.innerHTML = consoleText.innerHTML + message + "<br />";
		}

		consoleReady = true;
	};

	global.console = {};

	global.console.log = function (msg) {
		messageQueue.push(msg);

		if (consoleReady) {
			displayQueuedMessages();
		}
	};

	document.attachEvent("onreadystatechange", function () {
		if (document.readyState === "complete") {
			document.getElementsByTagName('head')[0].appendChild(consoleStyle);
			document.body.appendChild(consoleWrap);
			displayQueuedMessages();
		}
	});
}(this, true));