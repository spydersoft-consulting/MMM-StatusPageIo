import { isDataConfig } from "./config";

describe("Functions in config", function () {
  describe("isDataConfig", function () {
    it(`should return true for a DataConfig object`, function () {
      const configTest = {
        pageId: "",
        componentsToIgnore: ["test", "test2"],
        updateInterval: 1000
      };

      const isConfig = isDataConfig(configTest);

      expect(isConfig).toBeTruthy();
    });

    it(`should return false for an object that is not a DataConfig`, function () {
      const configTest = {
        page2: "",
        componentsToIgnore: ["test", "test2"],
        updateIntervalf: 1000
      };

      const isConfig = isDataConfig(configTest);

      expect(isConfig).not.toBeTruthy();
    });

    it(`should return false for something that isn't an object`, function () {
      const isConfig = isDataConfig(undefined);

      expect(isConfig).not.toBeTruthy();
    });
  });
});
