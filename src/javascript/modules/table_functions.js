class Table_functions {
    constructor() {}

    getColCount() {
        return Object.keys(this).length
    }

    getDate = function() {
        var today = new Date();

        var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        return date
    }
}


module.exports = Table_functions