import {CalendarBackendCommunicator} from "./backendCommunication.js";

class CalendarFunctions {
    constructor() {}

    cbc = new CalendarBackendCommunicator();

    getDateInfoFromDay(day_el) {
        let day = this.formatNumeral(day_el.attributes["data-date"].value);
        let month = this.formatNumeral(day_el.attributes["data-month"].value);
        let year = day_el.attributes["data-year"].value;
        return {
            day: day,
            month: month,
            year: year,
            date: `${year}-${month}-${day}`
        };

    }

    formatNumeral(num) {
        // adds 0 to one digit numeral string:  6 ==> 06
        num.length === 1 ? num = "0"+num : num;
        return num;
    }

    tagAppointmentDays() {
        let days_el = document.getElementsByClassName("date-picker");
        let dateInfo = this.getDateInfoFromDay(days_el[0]);
        let appointments = this.cbc.getAppointmentDates(dateInfo.month, dateInfo.year);
        for (let day_el of days_el) {
            let dayDateInfo = this.getDateInfoFromDay(day_el);
            if (appointments.includes(dayDateInfo.date)) {
                day_el.className += " appointment-day";
            }
        }
    }

    setAppointmentEventListener() {
        let days_el = document.getElementsByClassName("appointment-day");
        for (let day_el of days_el) {
            day_el.addEventListener("click", () => this.displayAppointments(day_el));
        }
    }

    displayAppointments(day) {
        let scheduleDisplay = document.getElementById("schedule-display");
        let date = this.getDateInfoFromDay(day).date;
        let appointments = this.cbc.getAppointments();
        let schedule = [];        
        for (let appointment of appointments) {
            if (date === appointment.date) {
                schedule.push(appointment);
            }
        }
        scheduleDisplay.displaySchedule(schedule);

    }
}

export {CalendarFunctions};