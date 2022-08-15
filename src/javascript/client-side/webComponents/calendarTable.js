import {days, months, today} from "./vars.js";

class CalendarTable extends HTMLTableElement {
    constructor(){
        super();
    }

    currentMonthAndYear = {
        month: 0,
        year: 0
    };

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
    }

    getAppointmentDayElements() {
        return this.getElementsByClassName("appointment-day");
    }

    showCalendar(month, year) {
        console.log(month, year);
        this.currentMonthAndYear.month = parseInt(month) + 1;
        this.currentMonthAndYear.year = parseInt(year);
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
        for (let day of days) {
            let col = document.createElement("th");
            col.innerHTML = day;
            tableHead.appendChild(col);
        }

        let tbody = document.createElement("tbody");
        tbody.id = "calendar-body";
        thead.appendChild(tableHead);
        this.appendChild(thead);
        this.appendChild(tbody);

        // first calendar with current month
        this.showCalendar(today.getMonth(), today.getFullYear());

    }
}

export {CalendarTable};