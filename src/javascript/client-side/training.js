import {CalendarFunctions} from "./modules/calendar_functions.js"; 


window.onload = async () => {
    let calendarFunctions = window.calendarFunctions = new CalendarFunctions();

    calendarFunctions.initAppointments().then(() => {  
        calendarFunctions.tagAppointmentDays();
        calendarFunctions.setAppointmentEventListener();
    });
    // Mutation Observer to tag Appointment Days on Calendar change
    const calendar = document.getElementById("calendar-body");
    const observer = new MutationObserver(async () => {
        calendarFunctions.initAppointments().then(() => {  
            calendarFunctions.tagAppointmentDays();
            calendarFunctions.setAppointmentEventListener();
        });
    });
    observer.observe(calendar, {childList: true});
};