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
		maxWidth: "300px",
		animationSpeed: 3000, // fade speed
		initialLoadDelay: 3250,
		updateInterval: 2 * 60 * 1000, // 2 minutes
		showComponents: true
	},

	requiresVersion: "2.1.0",

	getStyles: function () {
		return ["MMM-StatusPageIo.css"];
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
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		wrapper.style.maxWidth = this.config.maxWidth;

		if (!this.loaded) {
			wrapper.innerHTML = "Status Page Incidents";
			wrapper.classList.add("bright", "light", "small");
			return wrapper;
		}

		//  Header
		if (this.config.useHeader !== false) {
			var header = document.createElement("header");
			header.classList.add("header", "small", "dimmed", "bold");
			var text = document.createElement("span");
			text.innerHTML = this.StatusPageIoSummary.title;
			header.appendChild(text);
			header.appendChild(this.getImpactIcon(this.StatusPageIoSummary.indicator, ""));
			wrapper.appendChild(header);
		}

		if (this.StatusPageIoSummary.incidents.length > 0) {
			this.StatusPageIoSummary.incidents.forEach((incident) => {
				wrapper.appendChild(this.getIncidentCard(incident));
			});
		}

		if (this.config.showComponents && this.StatusPageIoSummary.components.length > 0) {
			this.StatusPageIoSummary.components.forEach((component) => {
				wrapper.appendChild(this.getComponentCard(component));
			})
		}

		return wrapper;
	}, // <-- closes getDom
	getIncidentCard: function (incident) {
		var card = document.createElement("div");
		card.classList.add("incident-wrapper");

		var dateWrapper = document.createElement("div");
		dateWrapper.classList.add("status-wrapper");
		card.appendChild(dateWrapper);

		var dataWrapper = document.createElement("div");
		dataWrapper.classList.add("data-wrapper");
		card.appendChild(dataWrapper);

		// expected_delivery date
		var impactIcon = document.createElement("div");
		impactIcon.classList.add("bright", "impact-" + incident.impact);

		var impactIconLabel = document.createElement("div");
		impactIconLabel.classList.add("bright", "expected_delivery_label");
		impactIconLabel.innerText = incident.impact;
		dateWrapper.appendChild(this.getImpactIcon(incident.impact, ""));

		dateWrapper.appendChild(impactIconLabel);

		var title = document.createElement("div");
		title.classList.add("small", "bright", "no-wrap", "title");
		title.innerHTML = incident.name;
		dataWrapper.appendChild(title);

		var startDiv = document.createElement("div");
		startDiv.classList.add("xsmall", "no-wrap", "dimmed");

		if (incident.started !== null) startDiv.innerHTML += `<i class="fa fa-clock" aria-hidden="true"></i>  ${incident.started}`;

		dataWrapper.appendChild(startDiv);
		dataWrapper.appendChild(this.getIncidentStatusWithIcon(incident));

		return card;
	},
	getComponentCard: function (component) {
		var card = document.createElement("div");
		card.classList.add("component-wrapper");

		var dateWrapper = document.createElement("div");
		dateWrapper.classList.add("status-wrapper");
		card.appendChild(dateWrapper);

		var dataWrapper = document.createElement("div");
		dataWrapper.classList.add("data-wrapper");
		card.appendChild(dataWrapper);

		// Status Icon
		dateWrapper.appendChild(this.getComponentStatusIcon(component.status, ""));


		var title = document.createElement("div");
		title.classList.add("small", "bright", "no-wrap", "title");
		title.innerHTML = component.name;
		dataWrapper.appendChild(title);

		var startDiv = document.createElement("div");
		startDiv.classList.add("xsmall", "no-wrap", "dimmed");

		if (component.description !== null) startDiv.innerHTML += `<i class="fa fa-clock" aria-hidden="true"></i>  ${component.description}`;

		dataWrapper.appendChild(startDiv);

		return card;
	},

	getIncidentStatusWithIcon: function (incident) {
		var statusDiv = document.createElement("div");
		statusDiv.classList.add("xsmall", "no-wrap", "dimmed");

		var icon = document.createElement("i");
		var iconName = "";
		switch (incident.status) {
			case "investigating":
				iconName = "search";
				break;
			case "identified":
				iconName = "search-location";
				break;
			case "monitoring":
				iconName = "watchman-monitoring";
				break;
			case "resolved":
				iconName = "check-square";
				break;
			case "postmortem":
				iconName = "clipboard-check";
				break;
		}

		icon.classList.add("fa", "fa-fw", `fa-${iconName}`);
		statusDiv.appendChild(icon);
		var span = document.createElement("span");
		span.innerText = incident.status;
		statusDiv.appendChild(span);
		return statusDiv;
	},

	getComponentStatusIcon: function (status, iconCss) {
		var faIconName = "";
		switch (status) {
			case "major_outage":
				faIconName = "exclamation-circle";
				break;
			case "partial_outage":
				faIconName = "exclamation-triangle";
				break;
			case "degraded_performance":
				faIconName = "times-circle";
				break;
			default:
				faIconName = "check-circle";
				break;
		}
		var icon = document.createElement("i");
		icon.classList.add("fa", "fa-fw", "fa-" + faIconName, "comp-status-" + status);
		if (iconCss && iconCss !== "") {
			icon.classList.add(iconCss);
		}
		return icon;
	},

	getImpactIcon: function (indicator, iconCss) {
		var faIconName = "";
		switch (indicator) {
			case "major":
				faIconName = "exclamation-circle";
				break;
			case "minor":
				faIconName = "exclamation-triangle";
				break;
			case "critical":
				faIconName = "times-circle";
				break;
			default:
				faIconName = "check-circle";
				break;
		}
		var icon = document.createElement("i");
		icon.classList.add("fa", "fa-fw", "fa-" + faIconName, "impact-" + indicator);
		if (iconCss && iconCss !== "") {
			icon.classList.add(iconCss);
		}
		return icon;
	}
});
