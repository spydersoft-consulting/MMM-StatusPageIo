/* Magic Mirror
 * Module: MMM-StatusPageIo
 *
 * By Matt Gerega
 *
 */
Module.register("MMM-StatusPageIo", {
	// Module config defaults.           // Make all changes in your config.js file
	defaults: {
		pageId: "",
		useHeader: true, // false if you don't want a header
		headerText: null,
		maxWidth: "300px",
		animationSpeed: 1000, // fade speed
		initialLoadDelay: 1500,
		updateInterval: 2 * 60 * 1000, // 2 minutes
		showComponents: true
	},

	requiresVersion: "2.1.0",

	getStyles: function () {
		return ["MMM-StatusPageIo.css"];
	},

	getScripts: function () {
		return [
			'HtmlHelpers.js'
		]
	},

	start: function () {
		Log.info("Starting module: " + this.name);

		this.StatusPageIoSummary = {};
		this.scheduleUpdate(this.config.initialLoadDelay);
	},

	scheduleUpdate: function (delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function () {
			Log.info("MMM-StatusPageIo - Requesting status update");
			self.sendSocketNotification("GET_STATUSPAGEIO_SUMMARY", { pageId: self.config.pageId });
		}, nextLoad);
	},

	socketNotificationReceived: function (notification, payload) {
		Log.info("[MMM-StatusPageIo] - socket notification received ", notification);
		if (notification === "STATUSPAGEIO_RESULT") {
			this.processStatusPageIoSummary(payload);
			this.updateDom(this.config.animationSpeed);
		}

		this.updateDom(this.config.initialLoadDelay);
	},

	processStatusPageIoSummary: function (data) {
		this.StatusPageIoSummary = data;
		// console.log('processStatusPageIoSummary: ' + this.StatusPageIoSummary); // for checking //
		this.loaded = true;
		this.scheduleUpdate();
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		wrapper.style.maxWidth = this.config.maxWidth;

		if (!this.loaded) {
			wrapper.innerHTML = "Status Page";
			wrapper.classList.add("bright", "light", "small");
			return wrapper;
		}

		//  Header
		if (this.config.useHeader !== false) {
			var header = document.createElement("header");
			header.classList.add("header", "small", "dimmed", "bold");
			var text = document.createElement("span");
			text.innerHTML = this.config.headerText ?? this.StatusPageIoSummary.title;
			header.appendChild(text);
			header.appendChild(HtmlHelpers.getImpactIcon(this.StatusPageIoSummary.indicator, ""));
			wrapper.appendChild(header);
		}

		if (this.StatusPageIoSummary.incidents.length > 0) {
			this.StatusPageIoSummary.incidents.forEach((incident) => {
				wrapper.appendChild(HtmlHelpers.getIncidentCard(incident));
			});
		}

		if (this.config.showComponents && this.StatusPageIoSummary.components.length > 0) {
			this.StatusPageIoSummary.components.forEach((component) => {
				wrapper.appendChild(HtmlHelpers.getComponentCard(component));
			});
		}

		return wrapper;
	}, // <-- closes getDom
	
});
