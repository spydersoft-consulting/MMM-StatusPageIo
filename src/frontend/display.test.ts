import { AppearanceConfig } from "../types/config";
import * as Display from "../types/display";
import { getImpactIcon, getLoadingView, getComponentStatusIcon } from "./display";
import { getByText } from "@testing-library/dom";
import "@testing-library/jest-dom";
//import * as TestObjects from "./testobjects";

const displayWithHeader: AppearanceConfig = {
  useHeader: true,
  headerText: "Test Header",
  showComponents: true
};

const displayWithoutHeader: AppearanceConfig = {
  useHeader: false,
  showComponents: true
};

describe("Functions in display", function () {
  describe("getLoadingView", function () {
    it(`should return the loading view with custom header`, function () {
      const container = getLoadingView(displayWithHeader);

      const title = getByText(container, displayWithHeader.headerText ?? "");
      expect(title).toHaveClass("wrapper");
    });

    it(`should return the loading view without custom header`, function () {
      const container = getLoadingView(displayWithoutHeader);
      const title = getByText(container, "Status Page");
      expect(title).toHaveClass("wrapper");
    });
  });

  describe("getImpactIcon", function () {
    it(`should return minor image`, function () {
      const img = getImpactIcon(Display.Impact.MINOR);
      expect(img).toHaveClass("fa", "fa-fw", "fa-exclamation-triangle", "impact-minor");
    });

    it(`should return major image`, function () {
      const img = getImpactIcon(Display.Impact.MAJOR);
      expect(img).toHaveClass("fa", "fa-fw", "fa-exclamation-circle", "impact-major");
    });

    it(`should return critical image`, function () {
      const img = getImpactIcon(Display.Impact.CRITICAL);
      expect(img).toHaveClass("fa", "fa-fw", "fa-times-circle", "impact-critical");
    });

    it(`should return maintenance image`, function () {
      const img = getImpactIcon(Display.Impact.MAINTENANCE);
      expect(img).toHaveClass("fa", "fa-fw", "fa-screwdriver-wrench", "impact-maintenance");
    });

    it(`should return operational image`, function () {
      const img = getImpactIcon(Display.Impact.NONE);
      expect(img).toHaveClass("fa", "fa-fw", "fa-check-circle", "impact-none");
    });
  });

  describe("getComponentStatusIcon", function () {
    it(`should return degraded image`, function () {
      const img = getComponentStatusIcon(Display.ComponentStatus.DEGRADED);
      expect(img).toHaveClass("fa", "fa-fw", "fa-times-circle", "comp-status-degraded_performance");
    });

    it(`should return maintenance image`, function () {
      const img = getComponentStatusIcon(Display.ComponentStatus.MAINTENANCE);
      expect(img).toHaveClass("fa", "fa-fw", "fa-screwdriver-wrench", "comp-status-under_maintenance");
    });

    it(`should return major outage image`, function () {
      const img = getComponentStatusIcon(Display.ComponentStatus.MAJOR_OUTAGE);
      expect(img).toHaveClass("fa", "fa-fw", "fa-exclamation-circle", "comp-status-major_outage");
    });

    it(`should return partial outage image`, function () {
      const img = getComponentStatusIcon(Display.ComponentStatus.PARTIAL_OUTAGE);
      expect(img).toHaveClass("fa", "fa-fw", "fa-exclamation-triangle", "comp-status-partial_outage");
    });

    it(`should return operational image`, function () {
      const img = getComponentStatusIcon(Display.ComponentStatus.OPERATIONAL);
      expect(img).toHaveClass("fa", "fa-fw", "fa-check-circle", "comp-status-operational");
    });
  });

  // describe("getIncidentStatusWithIcon", function () {
  //     it(`investigating should return search icon`, function () {
  //         const container = getIncidentStatusWithIcon(TestObjects.InvestigatingCriticalIncident);
  //         const img = getByText(container, TestObjects.InvestigatingCriticalIncident.status)
  //         expect(img).toHaveClass("fa", "fa-fw", "fa-search");
  //     });

  //     it(`identified should return search location icon`, function () {
  //         const container = getIncidentStatusWithIcon(TestObjects.IdentifiedCriticalIncident);
  //         const img = getByText(container, TestObjects.IdentifiedCriticalIncident.status)
  //         expect(img).toHaveClass("fa", "fa-fw", "fa-search-location");
  //     });

  //     it(`monitoring should return watchman monitoring icon`, function () {
  //         const container = getIncidentStatusWithIcon(TestObjects.MonitoringCriticalIncident);
  //         const img = getByText(container, TestObjects.MonitoringCriticalIncident.status)
  //         expect(img).toHaveClass("fa", "fa-fw", "fa-watchman-monitoring");
  //     });
  //     it(`resolved should return check icon`, function () {
  //         const container = getIncidentStatusWithIcon(TestObjects.ResolvedCriticalIncident);
  //         const img = getByText(container, TestObjects.ResolvedCriticalIncident.status)
  //         expect(img).toHaveClass("fa", "fa-fw", "fa-check-square");
  //     });
  //     it(`postmortem should return clipboard icon`, function () {
  //         const container = getIncidentStatusWithIcon(TestObjects.PostmortemCriticalIncident);
  //         const img = getByText(container, TestObjects.PostmortemCriticalIncident.status)
  //         expect(img).toHaveClass("fa", "fa-fw", "fa-clipboard-check");
  //     });
  //     it(`scheduled should return calendar icon`, function () {
  //         const container = getIncidentStatusWithIcon(TestObjects.InvestigatingCriticalIncident);
  //         const img = getByText(container, TestObjects.InvestigatingCriticalIncident.status)
  //         expect(img).toHaveClass("fa", "fa-fw", "fa-calendar");
  //     });

  // });
});
