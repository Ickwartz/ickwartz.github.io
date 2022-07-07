let dates = ["2022-07-05", "2022-07-10", "2022-07-20"];

let blub = dates.map(x => {
    let date = new Date(x);
    return date.getDate();
});


console.log(blub);