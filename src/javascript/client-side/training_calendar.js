import {CalendarFunctions} from "./modules/calendar_functions.js"; 


window.onload = () => {
    let calendarFunctions = window.calendarFunctions = new CalendarFunctions();

    calendarFunctions.tagAppointmentDays();
    calendarFunctions.setAppointmentEventListener();
    // Mutation Observer to tag Appointment Days on Calendar change
    const calendar = document.getElementById("calendar-body");
    const observer = new MutationObserver(() => {
        calendarFunctions.tagAppointmentDays();
        calendarFunctions.setAppointmentEventListener();
    });
    observer.observe(calendar, {childList: true});
};

// slots, methods, attribute for appointment display?