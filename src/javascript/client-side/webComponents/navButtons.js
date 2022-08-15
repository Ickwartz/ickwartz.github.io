import {months} from "./vars.js";

class NavButtons extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.className = "button-container-calendar";

        // button Previous Month
        let buttonPrev = document.createElement("button");
        buttonPrev.innerHTML = "‹";
        buttonPrev.addEventListener("click", () => {
            let monthAndYear_el = document.getElementById("monthAndYear");
            let monthAndYear = monthAndYear_el.innerHTML.split(" ");

            let month = months.indexOf(monthAndYear[0]);
            let year = parseInt(monthAndYear[1]) ;
            year = (month === 0) ? year - 1 : year;
            month = (month === 0) ? 11 : month - 1;

            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month,year);
        });
        buttonPrev.style.float = "left";
        
        // button Next Month
        let buttonNext = document.createElement("button");
        buttonNext.innerHTML = "›";
        buttonNext.style.float = "right";
        buttonNext.addEventListener("click", () => {
            let monthAndYear_el = document.getElementById("monthAndYear");
            let monthAndYear = monthAndYear_el.innerHTML.split(" ");
            
            let month = months.indexOf(monthAndYear[0]);
            let year = parseInt(monthAndYear[1]) ;
            year = (month === 11) ? year + 1 : year;
            month = (month === 11) ? 0 : month + 1;

            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month,year);
        });

        this.appendChild(buttonPrev);
        this.appendChild(buttonNext);
    }
}

export {NavButtons};