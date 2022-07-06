const fakeSchedule = [
    {
        date: "2022-06-30",
        name: "Workout",
        description: "Workout im Juni"
    },
    {
        date: "2022-07-04",
        name: "Geburtstag",
        description: "Ein Geburtstag"
    },
    {
        date: "2022-07-10",
        name: "Workout",
        description: "Workout im Juli"
    },
    {
        date: "2022-07-10",
        name: "Gassi",
        description: "Good doggo"
    }
];

const fakeDates = ["2022-06-30", "2022-07-04", "2022-07-10"];

class CalendarBackendCommunicator {
    constructor() {}

    getAppointments() {
        return fakeSchedule;
    }

    getAppointmentDates(month, year) {
        let appointmentDates = [];
        for (let date of fakeDates) {
            let parts = date.split("-");
            let m = parts[1];
            let y = parts[0];
            if (m === month && y === year) {
                appointmentDates.push(date);
            }
        }
        return appointmentDates;
    }
}

export { CalendarBackendCommunicator };