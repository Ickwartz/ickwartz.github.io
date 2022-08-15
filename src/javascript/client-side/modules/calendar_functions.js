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
        let result = await this.fetch_api.postData("/training/get_user_trainings", data);
        let appointments = [];
        let firstDayMonth = `${year}-${month}-01`;
        let endDate = new Date(firstDayMonth);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        for (let appointment of result) {
            if (!appointment.repetition_pattern) {
                if (appointment.date < firstDayMonth || appointment.date > endDate) continue;
                appointments.push(appointment);
                continue;
            }
            let appointmentEndDate = new Date (appointment.end_date);
            let currentEndDate = appointmentEndDate < endDate ? appointmentEndDate : endDate;
            
            let startDate = appointment.date < firstDayMonth ? new Date(firstDayMonth) : new Date(appointment.date);
            let days = this.getAllRepetitiveAppointments(startDate, currentEndDate, appointment.repetition_pattern);
            for (let day of days) {
                appointments.push({
                    date: day,
                    name: appointment.name,
                    training_id: appointment.training_id,
                    user_id: appointment.user_id,
                    user_notes: appointment.user_notes
                });
            }
        }

        return appointments;
    }

    getAllRepetitiveAppointments(startDate, endDate, repeatPattern) {
        let weekdays = {
                "0": 0b00000001,    //Sonntag
                "1": 0b00000010,
                "2": 0b00000100,
                "3": 0b00001000,
                "4": 0b00010000,
                "5": 0b00100000,
                "6": 0b01000000,
            };

        let currentDate = startDate;
        let allDates = [];
        while (currentDate <= endDate) {
            let dayIndex = currentDate.getDay();
            let patternValue = weekdays[dayIndex] & repeatPattern;
            if (patternValue > 0) allDates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return allDates;
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