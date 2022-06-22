class Table_functions {
    constructor() {}
 
    getDate() {
        var today = new Date();

        var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        return date;
    }
}


module.exports = Table_functions;