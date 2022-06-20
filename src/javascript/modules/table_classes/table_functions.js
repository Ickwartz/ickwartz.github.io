class Table_functions {
    constructor() {}
    
    getColCount() {
        return Object.keys(this).length;
    }

    getDate() {
        var today = new Date();

        var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        return date;
    }

    getValues() {
        return Object.values(this);
    }

}


module.exports = Table_functions;