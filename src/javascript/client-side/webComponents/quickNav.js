import {months, today} from "./vars.js";

class QuickNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = "footer-container-calendar";
        let label = document.createElement("label");
        label.setAttribute("for", "month");
        label.textContent = "Springen zu: ";

        let monthSelector = document.createElement("select");
        monthSelector.id = "month";
        // populate quick jump options months
        for (let i = 0; i < 12; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = months[i];
            if(i === today.getMonth()) {
                option.setAttribute("selected", "selected");
            }
            monthSelector.appendChild(option);
        }    

        let yearSelector = document.createElement("select");
        yearSelector.id = "year";
        // populate quick jump options years
        for (let year = 1970; year <= 2050; year++) {
            let option = document.createElement("option");
            option.value = year;
            option.innerHTML = year;
            if(year === today.getFullYear()) {
                option.setAttribute("selected", "selected");
            }
            yearSelector.appendChild(option);
        }
        
        monthSelector.addEventListener("change", () => {
            let month = monthSelector.value;
            let year = yearSelector.value;
            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month, year);
        });
        yearSelector.addEventListener("change", () => {
            let month = monthSelector.value;
            let year = yearSelector.value;
            let table = document.getElementsByClassName("table-calendar")[0];
            table.showCalendar(month, year);
        });

        this.appendChild(label);
        this.appendChild(monthSelector);
        this.appendChild(yearSelector);
    }
}

export {QuickNav};