class ScheduleDisplay extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.id = "schedule-display";
    }
}

ScheduleDisplay.prototype.displaySchedule = jest.fn();

export {ScheduleDisplay};