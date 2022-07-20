import {Fetch_api} from "./fetch_api.js"; 

class CalendarBackend {
    constructor() {}

    fetch_api = new Fetch_api();

    async getMonthsAppointments(month, year) {
        let data = {
            params: {
                month: month,
                year: year
            } 
        };
        return await this.fetch_api.postData("/training/get_user_trainings", data);
    }
}

export {CalendarBackend};