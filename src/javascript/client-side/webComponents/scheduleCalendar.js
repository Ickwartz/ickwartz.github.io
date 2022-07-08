class ScheduleCalendar extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.className = "wrapper";
        let container = document.createElement("div");
        container.className = "container-calendar";

        let header = document.createElement("h3");
        header.id = "monthAndYear";

        let navButtons =  document.createElement("navigation-buttons");

        let calendarTable = document.createElement("table", {is: "calendar-table"});
        
        let quickNav = document.createElement("quick-navigation");
        let scheduleDisplay = document.createElement("schedule-display");

        container.append(header, navButtons, calendarTable, quickNav, scheduleDisplay);
        this.appendChild(container);
    }
}

export {ScheduleCalendar};