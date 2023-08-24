import { AppearanceConfig } from "../types/config";
import * as Display from "../types/display";
import "./display.scss";

export const getLoadingView = (config: AppearanceConfig): HTMLElement => {
  const wrapper = getWrapperElement(config);
  wrapper.innerHTML = config.useHeader && config.headerText ? config.headerText : "Status Page";
  wrapper.classList.add("bright", "light", "small");
  return wrapper;
};

export const getSummaryView = (summaryData: Display.SummaryData, config: AppearanceConfig): HTMLElement => {
  const wrapper = getWrapperElement(config);

  //  Header
  if (config.useHeader !== false) {
    const header = document.createElement("header");
    header.classList.add("header", "small", "dimmed", "bold");
    const text = document.createElement("span");
    text.innerHTML = config.headerText ?? summaryData.title;
    header.appendChild(text);
    header.appendChild(getImpactIcon(summaryData.indicator));
    wrapper.appendChild(header);
  }

  if (summaryData.incidents.length > 0) {
    summaryData.incidents.forEach((incident) => {
      wrapper.appendChild(getIncidentCard(incident));
    });
  }

  if (config.showComponents && summaryData.components.length > 0) {
    summaryData.components.forEach((component) => {
      wrapper.appendChild(getComponentCard(component));
    });
  }

  return wrapper;
};

const getWrapperElement = (config: AppearanceConfig): HTMLElement => {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  wrapper.style.maxWidth = config.maxWidth ?? "auto";

  return wrapper;
};

const getIncidentCard = (incident: Display.Incident): HTMLElement => {
  const card = document.createElement("div");
  card.classList.add("incident-wrapper");

  const dateWrapper = document.createElement("div");
  dateWrapper.classList.add("status-wrapper");
  card.appendChild(dateWrapper);

  const dataWrapper = document.createElement("div");
  dataWrapper.classList.add("data-wrapper");
  card.appendChild(dataWrapper);

  // expected_delivery date
  const impactIcon = document.createElement("div");
  impactIcon.classList.add("bright", "impact-" + incident.impact);

  const impactIconLabel = document.createElement("div");
  impactIconLabel.classList.add("bright", "expected_delivery_label");
  impactIconLabel.innerText = incident.impact;
  dateWrapper.appendChild(getImpactIcon(incident.impact));

  dateWrapper.appendChild(impactIconLabel);

  const title = document.createElement("div");
  title.classList.add("small", "bright", "no-wrap", "title");
  title.innerHTML = incident.name;
  dataWrapper.appendChild(title);

  const startDiv = document.createElement("div");
  startDiv.classList.add("xsmall", "no-wrap", "dimmed");

  if (incident.started !== null) startDiv.innerHTML += `<i class="fa fa-clock" aria-hidden="true"></i>  ${incident.started}`;

  dataWrapper.appendChild(startDiv);
  dataWrapper.appendChild(getIncidentStatusWithIcon(incident));

  return card;
};

export const getComponentCard = (component: Display.Component): HTMLElement => {
  const card = document.createElement("div");
  card.classList.add("component-wrapper");

  const dateWrapper = document.createElement("div");
  dateWrapper.classList.add("status-wrapper");
  card.appendChild(dateWrapper);

  const dataWrapper = document.createElement("div");
  dataWrapper.classList.add("data-wrapper");
  card.appendChild(dataWrapper);

  // Status Icon
  dateWrapper.appendChild(getComponentStatusIcon(component.status));

  const title = document.createElement("div");
  title.classList.add("small", "bright", "no-wrap", "title");
  title.innerHTML = component.name;
  dataWrapper.appendChild(title);

  if (component.children && component.children.length !== 0) {
    // Render Child components
    component.children.forEach((child) => {
      const childDiv = document.createElement("div");
      childDiv.classList.add("xsmall", "no-wrap");
      childDiv.appendChild(getComponentStatusIcon(child.status));

      const span = document.createElement("span");
      span.innerText = child.name;
      childDiv.appendChild(span);
      dataWrapper.appendChild(childDiv);
    });
  } else {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("xsmall", "no-wrap", "dimmed");

    if (component.description !== null) descriptionDiv.innerHTML += `${component.description}`;
    dataWrapper.appendChild(descriptionDiv);
  }

  return card;
};

export const getIncidentStatusWithIcon = (incident: Display.Incident) => {
  const statusDiv = document.createElement("div");
  statusDiv.classList.add("xsmall", "no-wrap", "dimmed");

  const icon = document.createElement("i");
  let iconName = "";
  switch (incident.status) {
    case Display.IncidentStatus.INVESTIGATING:
      iconName = "search";
      break;
    case Display.IncidentStatus.IDENTIFIED:
      iconName = "search-location";
      break;
    case Display.IncidentStatus.MONITORING:
      iconName = "watchman-monitoring";
      break;
    case Display.IncidentStatus.RESOLVED:
      iconName = "check-square";
      break;
    case Display.IncidentStatus.POSTMORTEM:
      iconName = "clipboard-check";
      break;
    case Display.IncidentStatus.SCHEDULED:
      iconName = "calendar";
      break;
  }

  icon.classList.add("fa", "fa-fw", `fa-${iconName}`);
  icon.setAttribute("role", "img");
  statusDiv.appendChild(icon);
  const span = document.createElement("span");
  span.innerHTML = `${incident.status}`;
  statusDiv.appendChild(span);
  return statusDiv;
};

export const getComponentStatusIcon = (status: Display.ComponentStatus): HTMLElement => {
  let faIconName = "";
  switch (status) {
    case Display.ComponentStatus.MAINTENANCE:
      faIconName = "screwdriver-wrench";
      break;
    case Display.ComponentStatus.MAJOR_OUTAGE:
      faIconName = "exclamation-circle";
      break;
    case Display.ComponentStatus.PARTIAL_OUTAGE:
      faIconName = "exclamation-triangle";
      break;
    case Display.ComponentStatus.DEGRADED:
      faIconName = "times-circle";
      break;
    case Display.ComponentStatus.OPERATIONAL:
    default:
      faIconName = "check-circle";
      break;
  }
  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-fw", "fa-" + faIconName, "comp-status-" + status);
  return icon;
};

export const getImpactIcon = (indicator: Display.Impact): HTMLElement => {
  let faIconName = "";
  switch (indicator) {
    case Display.Impact.MAINTENANCE:
      faIconName = "screwdriver-wrench";
      break;
    case Display.Impact.MAJOR:
      faIconName = "exclamation-circle";
      break;
    case Display.Impact.MINOR:
      faIconName = "exclamation-triangle";
      break;
    case Display.Impact.CRITICAL:
      faIconName = "times-circle";
      break;
    default:
      faIconName = "check-circle";
      break;
  }
  const icon = document.createElement("i", {});
  icon.setAttribute("role", "img");
  icon.classList.add("fa", "fa-fw", "fa-" + faIconName, "impact-" + indicator);
  return icon;
};
