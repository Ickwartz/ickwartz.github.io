class ScheduleDisplay extends HTMLElement {
    constructor() {
        super();
    }

    displaySchedule(scheduleObjects) {
        let wrapper = document.getElementById("display-wrapper");
        if (wrapper) {
            wrapper.innerHTML="";
        } else {        
            wrapper = document.createElement("div");
            wrapper.id = "display-wrapper";
        }
        for (let scheduleObject of scheduleObjects) {
            let entry = document.createElement("div");
            entry.className = "container d-flex justify-content-between";
            let description = document.createElement("p");
            description.className = "display-description";
            description.textContent = `${scheduleObject.date}  |  ${scheduleObject.name}`;
        
            let details = document.createElement("a");
            details.className = "details-link";
            details.href = "/details";
            details.textContent = "Details";
            details.style.color = "black";
        
            entry.appendChild(description);
            entry.appendChild(details);
            wrapper.appendChild(entry);
        }
        this.appendChild(wrapper);
    }

    connectedCallback() {
        this.id = "schedule-display";
        let header = document.createElement("h4");
        header.innerHTML = "Termine: ";
        this.appendChild(header);
    }
}

export {ScheduleDisplay};