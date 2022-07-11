const mockCurrentMonthAndYear = {month: 2, year: 2022};

class CalendarTable extends HTMLTableElement {
    constructor() {
        super();
    }
    
    currentMonthAndYear = mockCurrentMonthAndYear;
    cleanupTags = jest.fn();
    showCalendar = jest.fn();

    getAppointmentDayElements() {
        let day = document.getElementById("test-day");
        return [day];
    }
    connectedCallback() {
        this.className = "table-calendar";
    }
}
CalendarTable.prototype.tagAppointmentDates = jest.fn();

export {CalendarTable};