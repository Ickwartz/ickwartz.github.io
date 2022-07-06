import {getAppointments} from "./backendCommunication.js";

class CalendarFunctions {
    constructor() {}

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