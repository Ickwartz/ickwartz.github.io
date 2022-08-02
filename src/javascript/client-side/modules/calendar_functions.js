import {TrainingScheduleHandler} from "./trainingScheduleHandler.js";
import {Fetch_api} from "./fetch_api.js";

class CalendarFunctions {
    constructor() {}

    trainingHandler = new TrainingScheduleHandler();
    fetch_api = new Fetch_api();

    monthsAppointments = [];

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
        // adds 0 to one digit numeral:  6 ==> 06
        if (typeof num === "number") {
            num = num.toString();
        }
        num.length === 1 ? num = "0"+num : num;
        return num;
    }

    async initAppointments() {
        let table = document.getElementsByClassName("table-calendar")[0];
        let dateInfo = table.currentMonthAndYear;
        this.monthsAppointments = await this.getMonthsAppointments(this.formatNumeral(dateInfo.month), this.formatNumeral(dateInfo.year));
    }

    async getMonthsAppointments(month, year) {
        let data = {
            params: {
                month: month,
                year: year
            } 
        };
        return await this.fetch_api.postData("/training/get_user_trainings", data);
    }

    getAppointmentDates() {
        let appointments = this.monthsAppointments;
        let dates = appointments.map(appointment => {
            let date = new Date(appointment.date);
            return date.getDate();
        });
        return dates;
    }

    tagAppointmentDays() {
        let days = this.getAppointmentDates();
        let table = document.getElementsByClassName("table-calendar")[0];
        table.tagAppointmentDates(days);
    }

    setAppointmentEventListener() {
        let table = document.getElementsByClassName("table-calendar")[0];
        let days_el = table.getAppointmentDayElements();
        for (let day_el of days_el) {
            day_el.addEventListener("click", () => this.displayAppointments(day_el));
        }
    }

    displayAppointments(day) {
        let scheduleDisplay = document.getElementById("schedule-display");
        let date = this.getDateInfoFromDay(day).date;
        let appointments = this.monthsAppointments;
        let schedule = [];
        for (let appointment of appointments) {
            if (date === appointment.date) {
                schedule.push(appointment);
            }
        }
        scheduleDisplay.displaySchedule(schedule);
        let detailLinks = scheduleDisplay.querySelectorAll(".details-link");
        for (let link of detailLinks) {
            link.addEventListener("click", () => {
                let id = link.getAttribute("training-id");
                let training = schedule.find(training => training.training_id == id);
                this.trainingHandler.displayTraining(training);
            });
        }
    }
}

export {CalendarFunctions};