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
}

export {CalendarFunctions};