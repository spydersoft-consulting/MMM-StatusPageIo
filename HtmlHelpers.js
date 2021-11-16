const HtmlHelpers = {
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

        if (component.children.length === 0) {
            var descriptionDiv = document.createElement("div");
            descriptionDiv.classList.add("xsmall", "no-wrap", "dimmed");

            if (component.description !== null) descriptionDiv.innerHTML += `${component.description}`;
            dataWrapper.appendChild(descriptionDiv);
        }
        else {
            // Render Child components
            component.children.forEach((child) => {
                var childDiv = document.createElement("div");
                childDiv.classList.add("xsmall", "no-wrap");
                childDiv.appendChild(this.getComponentStatusIcon(child.status));

                var span = document.createElement("span");
                span.innerText = child.name;
                childDiv.appendChild(span);
                dataWrapper.appendChild(childDiv);
            });
        }

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

}