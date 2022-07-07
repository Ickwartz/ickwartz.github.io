let months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
let days = ["M", "D", "M", "D", "F", "S", "S"];
let today = new Date();

class NavButtons extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.className = "button-container-calendar";
        let buttonPrev = document.createElement("button");
        buttonPrev.innerHTML = "‹";
        buttonPrev.addEventListener("click", () => {
            let monthAndYear_el = document.getElementById("monthAndYear");
            let monthAndYear = monthAndYear_el.innerHTML.split(" ");

            let month = months.indexOf(monthAndYear[0]);
            let year = monthAndYear[1] ;
            year = (month === 0) ? year - 1 : year;
            month = (month === 0) ? 11 : month - 1;

            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month,year);
        });
        buttonPrev.style.float = "left";    // ---------------------- ok ??
        let buttonNext = document.createElement("button");
        buttonNext.innerHTML = "›";
        buttonNext.style.float = "right";   // ---------------------- ok ??
        buttonNext.addEventListener("click", () => {
            let monthAndYear_el = document.getElementById("monthAndYear");
            let monthAndYear = monthAndYear_el.innerHTML.split(" ");
            
            let month = months.indexOf(monthAndYear[0]);
            let year = parseInt(monthAndYear[1]) ;
            year = (month === 11) ? year + 1 : year;
            month = (month === 11) ? 0 : month + 1;

            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month,year);
        });

        this.appendChild(buttonPrev);
        this.appendChild(buttonNext);
    }
}
window.customElements.define("navigation-buttons", NavButtons);

class CalendarTable extends HTMLTableElement {
    constructor(){
        super();
    }

    cleanupTags() {
        let elements = this.getElementsByClassName("appointment-day");
        for (let element of elements) {
            element.classList.remove("appointment-day");
        }
    }

    tagAppointmentDates(days) {
        this.cleanupTags();
        for (const day of days) {
            let day_el = this.querySelector(`[data-date="${day}"]`);
            day_el.classList.add("appointment-day");
        }
        // this -> div.container-calendar(0) -> table.table-calendar(1) -> tbody#calendar-body(1)
        // el.tagDate([5, 12, ...])
    }

    showCalendar(month, year) {
        // -1 because default is week starting with sunday but i want it to start with monday
        let firstDay = ( new Date( year, month ) ).getDay() -1;
        firstDay = firstDay === -1 ? 6 : firstDay;

        let tbl = document.getElementById("calendar-body");
        tbl.innerHTML = "";
        
        let headline = document.getElementById("monthAndYear");
        headline.innerHTML = months[month] + " " + year;

        let daysInMonth = 32 - new Date(year, month, 32).getDate();

        // creating all cells
        let date = 1;
        for ( let i = 0; i < 6; i++ ) {        
            let row = document.createElement("tr");

            for ( let j = 0; j < 7; j++ ) {
                
                let cell = document.createElement("td");
                // create empty cells before first day
                if ( i === 0 && j < firstDay ) {
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.setAttribute("data-date", date);
                    cell.setAttribute("data-month", month + 1);
                    cell.setAttribute("data-year", year);
                    cell.setAttribute("data-month_name", months[month]);
                    cell.className = "date-picker";
                    cell.innerHTML = "<span>" + date + "</span>";

                    if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                        cell.className += " selected";
                    }
                    /*if (appointmentDays.includes(date)) {
                        cell.className += " appointment-day";
                        cell.addEventListener("click", () => this.showAppointments(cell));
                    }*/
                    row.appendChild(cell);
                    date++;
                }
            }
            tbl.appendChild(row);
        }
    } 

    connectedCallback() {
        this.className = "table-calendar";
        let thead = document.createElement("thead");

        thead.id = "thead-month";
        //create tablehead with weekdays
        let tableHead = document.createElement("tr");
        for (let day in days) {
            let col = document.createElement("th");
            col.innerHTML = day;
            tableHead.appendChild(col);
        }

        let tbody = document.createElement("tbody");
        tbody.id = "calendar-body";

        this.appendChild(thead);
        this.appendChild(tbody);

        // first calendar with current month
        this.showCalendar(today.getMonth(), today.getFullYear());

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
        // populate quick jump options months
        for (let i = 0; i < 12; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = months[i];
            if(i === today.getMonth()) {
                option.setAttribute("selected", "selected");
            }
            monthSelector.appendChild(option);
        }    

        let yearSelector = document.createElement("select");
        yearSelector.id = "year";
        // populate quick jump options years
        for (let year = 1970; year <= 2050; year++) {
            let option = document.createElement("option");
            option.value = year;
            option.innerHTML = year;
            if(year === today.getFullYear()) {
                option.setAttribute("selected", "selected");
            }
            yearSelector.appendChild(option);
        }
        
        monthSelector.addEventListener("change", () => {
            let month = monthSelector.value;
            let year = yearSelector.value;
            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month, year);
        });
        yearSelector.addEventListener("change", () => {
            let month = monthSelector.value;
            let year = yearSelector.value;
            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month, year);
        });

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
window.customElements.define("schedule-display", ScheduleDisplay);

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
window.customElements.define("schedule-calendar", ScheduleCalendar);