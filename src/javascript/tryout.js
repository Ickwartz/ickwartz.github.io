let date_val = "21.07.2022";

let dateObj = new Date(date_val);
let date = dateObj.toISOString().split('T')[0];
console.log(date);