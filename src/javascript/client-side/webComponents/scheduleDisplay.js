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
            let date = scheduleObject.date;
            let name = scheduleObject.name;
            let training_id = scheduleObject.training_id;
            let entry = document.createElement("div");
            entry.className = "container d-flex justify-content-between";
            let description = document.createElement("p");
            description.className = "display-description";
            description.textContent = `${date}  |  ${name}`;
            

            let details = document.createElement("a");
            details.className = "details-link";
            // details.href = `/training/trainingsplan?trainingid=${training_id}`;
            // details.target = "_blank";
            // details.rel = "noreferrer noopener";    // prevent "tabnabbing" attacks that exploit new tab links
            details.href = "#";
            details.setAttribute("training-id", training_id);
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