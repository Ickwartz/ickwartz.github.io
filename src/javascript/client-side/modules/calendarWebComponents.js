import {CalendarFunctions} from "./calendar_functions.js";

let calendarFunctions = new CalendarFunctions();

class NavButtons extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.className = "button-container-calendar";
        let buttonPrev = document.createElement("button");
        buttonPrev.innerHTML = "‹"
        buttonPrev.addEventListener("click", () => calendarFunctions.previous());
        buttonPrev.style.float = "left";    // ---------------------- ok ??
        let buttonNext = document.createElement("button");
        buttonNext.innerHTML = "›"
        buttonNext.style.float = "right";   // ---------------------- ok ??
        buttonNext.addEventListener("click", () => calendarFunctions.next());

        this.appendChild(buttonPrev);
        this.appendChild(buttonNext);
    }
}
window.customElements.define("navigation-buttons", NavButtons);

class CalendarTable extends HTMLTableElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.className = "table-calendar";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        console.log("Connected Table Callback");
        thead.id = "thead-month";
        tbody.id = "calendar-body";

        this.appendChild(thead);
        this.appendChild(tbody);
    }
}
window.customElements.define("calendar-table", CalendarTable, {extends: "table"});

class QuickNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = "footer-container-calendar";
        let label = document.createElement("label");
        label.setAttribute("for", "month");
        label.textContent = "Springen zu: ";
        let monthSelector = document.createElement("select");
        monthSelector.id = "month";
        monthSelector.onchange = () => calendarFunctions.jump();
        
        let months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
        for (let i = 0; i < 12; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = months[i];
            monthSelector.appendChild(option);
        }

        let yearSelector = document.createElement("select");
        yearSelector.id = "year";
        yearSelector.onchange = () => calendarFunctions.jump();
        
        console.log("Connected QuickNav Callback");

        this.appendChild(label);
        this.appendChild(monthSelector);
        this.appendChild(yearSelector);
    }
}
window.customElements.define("quick-navigation", QuickNav);

class ScheduleDisplay extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <h4>Termine: </h4>
        <div id="schedule-display"></div>`;
    }
}
window.customElements.define("schedule-display", ScheduleDisplay);

class ScheduleCalendar extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        //let wrapper = document.createElement("div"); 
        this.className = "wrapper";
        let container = document.createElement("div");
        container.className = "container-calendar";

        let header = document.createElement("h3");
        header.id = "monthAndYear";

        let navButtons =  document.createElement("navigation-buttons");

        //let calendarTable = document.createElement("calendar-table");
        let calendarTable = document.createElement("table");
        calendarTable.setAttribute("is", "calendar-table");
        
        let quickNav = document.createElement("quick-navigation");
        let scheduleDisplay = document.createElement("schedule-display");

        container.append(header, navButtons, calendarTable, quickNav, scheduleDisplay);
        //wrapper.appendChild(container);
        this.appendChild(container);
    }
}
window.customElements.define("schedule-calendar", ScheduleCalendar);