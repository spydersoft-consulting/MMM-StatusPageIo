import * as Log from "logger";
import * as NodeHelper from "node_helper";
import { LogWrapper } from "./utilities/LogWrapper";
import { ModuleNotification } from "./types/ModuleNotification";
import { StatusPageService } from "./backend/StatusPageService";
import { DataConfig, isDataConfig } from "./types/Config";
import * as Display from "./types/Display";

const logger = new LogWrapper("MMM-StatusPageIo", Log);

module.exports = NodeHelper.create({
  service: {} as StatusPageService,

  start: function () {
    logger.info("Starting node_helper" + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    logger.info(`Processing ${notification} notification`);

    if (notification === ModuleNotification.CONFIG) {
      if (isDataConfig(payload)) {
        this.service = new StatusPageService(payload as DataConfig, logger);
      } else {
        logger.error("Invalid configuration payload");
      }
    }

    if (notification === ModuleNotification.RETRIEVE) {
      if (!this.service) {
        logger.error("No valid service configured");
      } else {
        this.service.getStatusPageIoSummary().then((response: Display.SummaryData | undefined) => {
          if (response) {
            this.sendSocketNotification(ModuleNotification.RESULTS, response);
          } else {
            this.sendSocketNotification(ModuleNotification.ERROR, {});
          }
        });
      }
    }
  }
});
