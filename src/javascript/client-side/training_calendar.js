import {CalendarFunctions} from "./modules/calendar_functions.js"; 


window.onload = () => {
    let calendarFunctions = window.calendarFunctions = new CalendarFunctions();
    calendarFunctions.genCalendar();
};