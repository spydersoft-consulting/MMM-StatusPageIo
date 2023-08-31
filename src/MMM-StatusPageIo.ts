import { ModuleNotification } from "./types/ModuleNotification";
import { Config } from "./types/Config";
import * as Display from "./types/Display";
import { LogWrapper } from "./utilities/LogWrapper";
import { getLoadingView, getSummaryView } from "./frontend/Display";
import * as Log from "logger";

Module.register<Config>("MMM-StatusPageIo", {
  // Module config defaults.           // Make all changes in your config.js file
  defaults: {
    pageId: "",
    showComponents: true,
    componentsToIgnore: [],
    useHeader: true, // false if you don't want a header
    headerText: undefined,
    maxWidth: "300px",
    animationSpeed: 1000, // fade speed
    initialLoadDelay: 1500,
    updateInterval: 2 * 60 * 1000 // 2 minutes
  },
  getLogger: function (): LogWrapper {
    return new LogWrapper("MMM-StatusPageIo module", Log);
  },

  isLoaded: false,
  requiresVersion: "2.1.0",
  summaryData: {} as Display.SummaryData,

  getStyles: function () {
    return ["MMM-StatusPageIo.css"];
  },

  start: function () {
    this.getLogger().info("Starting module: " + this.name);
    this.sendSocketNotification(ModuleNotification.CONFIG, this.config);
    this.scheduleUpdate(this.config.initialLoadDelay);
  },

  scheduleUpdate: function (delay: number) {
    if (this.isScheduled) {
      return;
    }

    let nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay !== null && delay >= 0) {
      nextLoad = delay;
    }
    this.isScheduled = true;
    setTimeout(() => {
      this.getLogger().info("Requesting status update");
      this.isScheduled = false;
      this.sendSocketNotification(ModuleNotification.RETRIEVE, {});
    }, nextLoad);
  },

  socketNotificationReceived: function (notification, payload) {
    this.getLogger().info("socket notification received ", notification);
    if (notification === ModuleNotification.RESULTS) {
      const summary: Display.SummaryData = payload as Display.SummaryData;
      if (summary) {
        this.summaryData = summary;
        this.isLoaded = true;
        this.scheduleUpdate();
        this.updateDom(this.config.animationSpeed);
      } else {
        this.getLogger().warn("Summary data not formatted correctly");
      }
    }
    // If an error occurs, reschedule an update to try again
    if (notification === ModuleNotification.ERROR) {
      this.scheduleUpdate();
    }
  },

  getDom: function () {
    if (!this.isLoaded) {
      return getLoadingView(this.config);
    }

    return getSummaryView(this.summaryData, this.config);
  }
});
