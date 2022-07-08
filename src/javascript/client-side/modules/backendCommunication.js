const Fetch_api = require("./fetch_api"); 

class CalendarBackend {
    constructor() {}

    fetch_api = new Fetch_api();

    async getMonthsAppointments(month, year) {
        let data = {
            user_id: 22,
            func: "getAllUserTrainingMonth",
            params: {
                month: month,
                year: year
            } 
        };
        return await this.fetch_api.postData("/training/get_user_trainings", data);
    }
}

module.exports = CalendarBackend;