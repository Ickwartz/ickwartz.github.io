let startDateString = "2022-08-08";
// let endDateString = "2022-10-08";

let startDate = new Date(startDateString);
let endDate = new Date(startDateString);
endDate.setMonth(endDate.getMonth() + 1);

// let bitRepeatPattern = 0b00101010;
let weekdays = {
    "0": 0b00000001,    //Sonntag
    "1": 0b00000010,
    "2": 0b00000100,
    "3": 0b00001000,
    "4": 0b00010000,
    "5": 0b00100000,
    "6": 0b01000000,
};

let testdays = [1,3,5]; // Sonntag = 0

function getBitRepeatPattern(days) {
    // if (days == []) {}   // why not working?
    if (!days[0]) {
        return 0;
    } else {
        return (weekdays[days.shift()] + getBitRepeatPattern(days));
    }
}


function getAllDays(startDate, endDate, repeatPattern) {
    console.log("Start: ", startDate.toISOString().split('T')[0]);
    console.log("End: ", endDate.toISOString().split('T')[0]);
    let currentDate = startDate;
    let allDates = [];
    while (currentDate <= endDate) {
        let dayIndex = currentDate.getDay();
        let patternValue = weekdays[dayIndex] & repeatPattern;
        if (patternValue > 0) allDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(allDates);
}

getAllDays(startDate, endDate, getBitRepeatPattern(testdays));



// bits 0b00000000
//  bits & vglBit --> 0 / 1
// enum wochentage?