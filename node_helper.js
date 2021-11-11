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
    Log.info('MMM-StatusPageIo - Starting node_helper for: ' + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_STATUSPAGEIO_SUMMARY" && payload.pageId !== null) {
      Log.info(`MMM-StatusPageIo - Processing GET_STATUSPAGEIO_SUMMARY notification for ${payload.pageId}`);
      this.getStatusPageIoSummary(payload.pageId);
    }
  },

  getStatusPageIoSummary: function (pageId) {
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
            incidents.push({
              name: incident.name,
              status: incident.status,
              impact: incident.impact,
              started: formatDistanceToNow(startedAt, {})
            });
          });

          var topLevelComponents = responseData.components.filter((comp) => comp.group_id === null);

          var components = topLevelComponents.map((topComponent) => {
            var childComponents = responseData.components.filter((comp) => comp.group_id === topComponent.id);
            var childComps = childComponents.map((comp) => {
              return {
                name: comp.name,
                description: comp.description,
                status: comp.status,
              }
            })

            return {
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
          Log.info("[MMM-StatusPageIo] - " + JSON.stringify(summaryData));
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
