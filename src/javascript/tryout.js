let str = '<td data-date="1" data-month="2" data-year="2022" data-month_name="Jul" class="date-picker"><span>9</span></td>'
let parser = new DOMParser();
let day = parser.parseFromString(str, "text/html").body;

console.log(day.value);