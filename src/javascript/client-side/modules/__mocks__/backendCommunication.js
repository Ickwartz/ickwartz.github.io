class CalendarBackend {
    constructor() {}
    getMonthsAppointments = jest.fn(async () => {
        return new Promise((res) => {
            res([{training_id: 1, name: 'test', date: '2022-02-01', user_id: 1}]);
        });
    });
}

export {CalendarBackend};