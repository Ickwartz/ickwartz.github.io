
function markAsToBeDeleted() {
    let today = new Date();
    let deletionDate = new Date();
    deletionDate.setDate(today.getDate() + 30);
    deletionDate = deletionDate.toISOString().split('T')[0];
    console.log(deletionDate);
}

markAsToBeDeleted();


/*
let date1 = new Date();
let date2 = new Date();
date2.setDate(date1.getDate() + 30);
let date3 = new Date();
date3.setMinutes(date1.getMinutes() + 20);

console.log("Today: ", date1);
console.log("Future: ", date2);
console.log("near Future: ", date3);


let dateObj = new Date(date_val);
let date = dateObj.toISOString().split('T')[0];

*/