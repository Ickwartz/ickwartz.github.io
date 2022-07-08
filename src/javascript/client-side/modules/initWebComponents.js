import {NavButtons} from "../webComponents/navButtons.js";
import {CalendarTable} from "../webComponents/calendarTable.js";
import {QuickNav} from "../webComponents/quickNav.js";
import {ScheduleDisplay} from "../webComponents/scheduleDisplay.js";
import {ScheduleCalendar} from "../webComponents/scheduleCalendar.js";

window.customElements.define("navigation-buttons", NavButtons);
window.customElements.define("calendar-table", CalendarTable, {extends: "table"});
window.customElements.define("quick-navigation", QuickNav);
window.customElements.define("schedule-display", ScheduleDisplay);
window.customElements.define("schedule-calendar", ScheduleCalendar);