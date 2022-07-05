import {getAppointments} from "./backendCommunication.js";

class CalendarFunctions {
    constructor() {}

    today = new Date();
    currentMonth = this.today.getMonth();
    currentYear = this.today.getFullYear();

    days = ["M", "D", "M", "D", "F", "S", "S"];
    months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    
    monthAndYear = document.getElementById("monthAndYear");
    selectYear = document.getElementById("year");
    selectMonth = document.getElementById("month");

    genCalendar() {        
        let createYear = this.generate_year_range(1970, 2050);
        
        document.getElementById("year").innerHTML = createYear;
           
        
        let dataHead = "<tr>";
        for (let dhead in this.days) {
            dataHead += "<th data-days='" + this.days[dhead] + "'>" + this.days[dhead] + "</th>";
        }
        dataHead += "</tr>";
        
        document.getElementById("thead-month").innerHTML = dataHead;
        
        this.showCalendar(this.currentMonth, this.currentYear);
    }

    generate_year_range(start, end) {
        let years = "";
        for (let year = start; year <= end; year++) {
            years += "<option value='" + year + "'>" + year + "</option>";
        }
        return years;
    }
    
    next() {
        this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
        this.currentMonth = (this.currentMonth + 1) % 12;
        this.showCalendar(this.currentMonth, this.currentYear);
    }

    previous() {
        this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 :this. currentYear;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
        this.showCalendar(this.currentMonth, this.currentYear);
    }

    jump() {
        this.currentYear = parseInt(this.selectYear.value);
        this.currentMonth = parseInt(this.selectMonth.value);
        this.showCalendar(this.currentMonth, this.currentYear);
    }
    
    getMonthEventDays(month, year, data) {
        // return array of days (integer) of the current month, which have an appointment
        let monthStr = month < 10 ? `0${month}` : `${month}`;
        let days = [];
        for (let appointment of data) {
            let splitDate = appointment.date.split("-");
            if (splitDate[0] === `${year}` && splitDate[1] === monthStr) {
                let day = splitDate[2];
                day = day.charAt(0) === "0" ? day.charAt(1) : day;
                days.push(Number(day));
            }
        }
        return days;
    }

    daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    formatNumeral(num) {
        // adds 0 to one digit numeral string:  6 ==> 06
        num.length === 1 ? num = "0"+num : num;
        return num;
    }
    
    
    addScheduleHtml(scheduleObject) {
        let container = document.getElementById("schedule-display");
        let wrapper = document.createElement("div");
    
        let entry = document.createElement("p");
        entry.className = "display-entry";
        entry.textContent = `${scheduleObject.date}  |  ${scheduleObject.name}: ${scheduleObject.description}`;
    
        let details = document.createElement("a");
        details.className = "details-link";
        details.href = "/details";
        details.textContent = "Details";
    
        wrapper.appendChild(entry);
        wrapper.appendChild(details);
        container.appendChild(wrapper);
    }
    
    showAppointments(selectedDay) {
        let scheduleDisplay = document.getElementById("schedule-display");
        scheduleDisplay.innerHTML = "";
        let appointments = getAppointments();
        let year = selectedDay.getAttribute("data-year");
        let month = this.formatNumeral(selectedDay.getAttribute("data-month"));
        let day = this.formatNumeral(selectedDay.getAttribute("data-date"));
        let date = `${year}-${month}-${day}`;
        for (let element of appointments) {
            if (element.date == date) {
                this.addScheduleHtml(element);
            }
        }
    }

    showCalendar(month, year) {

        // -1 because default is week starting with sunday but i want it to start with monday
        let firstDay = ( new Date( year, month ) ).getDay() -1;
        firstDay = firstDay === -1 ? 6 : firstDay;

        let tbl = document.getElementById("calendar-body");
        tbl.innerHTML = "";
        
        this.monthAndYear.innerHTML = this.months[month] + " " + year;
        this.selectYear.value = year;
        this.selectMonth.value = month;

        let appointmentDays = this.getMonthEventDays(month+1, year, getAppointments());

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
                } else if (date > this.daysInMonth(month, year)) {
                    break;
                } else {
                    cell.setAttribute("data-date", date);
                    cell.setAttribute("data-month", month + 1);
                    cell.setAttribute("data-year", year);
                    cell.setAttribute("data-month_name", this.months[month]);
                    cell.setAttribute("onclick", "calendarFunctions.showAppointments(this)");
                    //cell.addEventListener("click", console.log("click")); //this.showAppointments(cell))
                    cell.className = "date-picker";
                    cell.innerHTML = "<span>" + date + "</span>";

                    if ( date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth() ) {
                        cell.className += " selected";
                    }
                    if (appointmentDays.includes(date)) {
                        cell.className += " appointment-day";
                    }
                    row.appendChild(cell);
                    date++;
                }
            }
            tbl.appendChild(row);
        }
    }        
}

export {CalendarFunctions};