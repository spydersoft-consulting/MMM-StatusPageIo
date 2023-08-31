import { Response } from "node-fetch";
import { LogWrapper } from "../utilities/LogWrapper";
import { StatusPageService } from "./StatusPageService";

jest.mock("../utilities/LogWrapper", () => {
  return {
    LogWrapper: jest.fn().mockImplementation(() => {
      return {
        error: jest.fn().mockImplementation(),
        warn: jest.fn().mockImplementation(),
        info: jest.fn().mockImplementation(),
        log: jest.fn().mockImplementation(),
        formatMessage: jest.fn()
      };
    })
  };
});

describe("Functions in prometheus-service", function () {
  describe("checkFetchStatus", function () {
    it(`for a string should return an array`, function () {
      const testResponse: Response = new Response('{ data: { name: "Test Response" }      }"', {
        status: 200
      });
      const service = new StatusPageService(
        {
          pageId: "123",
          updateInterval: 1000,
          componentsToIgnore: []
        },
        new LogWrapper("TEST", undefined)
      );

      expect(service.checkFetchStatus(testResponse)).toBe(testResponse);
    });
  });
});
