/* Magic Mirror
 * Module: MMM-StatusPageIo
 *
 */

const { formatDistanceToNow } = require("date-fns");
const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const Log = require("logger");
const { json } = require("express");

module.exports = NodeHelper.create({
	start: function () {
		Log.info("MMM-StatusPageIo - Starting node_helper for: " + this.name);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "GET_STATUSPAGEIO_SUMMARY" && payload.pageId !== null) {
			Log.info(`MMM-StatusPageIo - Processing GET_STATUSPAGEIO_SUMMARY notification for ${payload.pageId}`);
			this.getStatusPageIoSummary(payload.pageId, payload.componentsToIgnore);
		}
	},

	inGroup: function (comp, group = null) {
		return comp.group_id === group;
	},

	hasIncident: function (incidents, comp) {
		return incidents.findIndex((inc) => inc.componentId === comp.id) !== -1;
	},

	ignoreComponent: function (componentsToIgnore, compId) {
		return componentsToIgnore.findIndex((comp) => comp === compId) !== -1;
	},

	getStatusPageIoSummary: function (pageId, componentsToIgnore) {
		let self = this;
		var url = "https://" + pageId + ".statuspage.io/api/v2/summary.json";
		try {
			fetch(url, {
				method: "get"
			})
				.then(self.checkFetchStatus)
				.then((response) => response.json())
				.then((responseData) => {
					//Log.info("[MMM-StatusPageIo] - Processing data");
					var incidents = [];
					responseData.incidents.forEach((incident) => {
						var startedAt = Date.parse(incident.started_at);
						if (!self.ignoreComponent(componentsToIgnore, incident.components[0].id)) {
							incidents.push({
								name: incident.name,
								status: incident.status,
								impact: incident.impact,
								componentId: incident.components[0].id,
								started: formatDistanceToNow(startedAt, {})
							});
						}
					});

					// If the component has an incident, it'll be shown above.
					var topLevelComponents = responseData.components.filter((comp) => comp.group_id === null && !self.hasIncident(incidents, comp) && !self.ignoreComponent(componentsToIgnore, comp.id));

					var components = topLevelComponents.map((topComponent) => {
						var childComponents = responseData.components.filter((comp) => self.inGroup(comp, topComponent.id) && !self.hasIncident(incidents, comp) && !self.ignoreComponent(componentsToIgnore, comp.id));
						var childComps = childComponents.map((comp) => {
							return {
								id: comp.id,
								name: comp.name,
								description: comp.description,
								status: comp.status
							};
						});

						return {
							id: topComponent.id,
							name: topComponent.name,
							description: topComponent.description,
							status: topComponent.status,
							children: childComps
						};
					});

					var summaryData = {
						title: responseData.page.name,
						indicator: responseData.status.indicator,
						statusDescription: responseData.status.description,
						incidents: incidents,
						components: components
					};

					Log.info("[MMM-StatusPageIo] - Sending Summary Data");
					Log.debug("[MMM-StatusPageIo] - " + JSON.stringify(summaryData));
					self.sendSocketNotification("STATUSPAGEIO_RESULT", summaryData);
				});
		} catch (error) {
			//Log.error("MMM-STATUSPAGEIO - Error fetching status:" + error);
		}
	},

	checkFetchStatus: function (response) {
		if (response.ok) {
			return response;
		} else {
			throw Error(response.statusText);
		}
	}
});
