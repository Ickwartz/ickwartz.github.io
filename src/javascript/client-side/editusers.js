import {Fetch_api} from "./modules/fetch_api.js";

class UserControl {
    constructor() {}

    fetch_api = new Fetch_api();

    applyEventListeners() {
        document.querySelector("#users").addEventListener("click", () => {
            this.createUserTable();
        });
        document.querySelector("#registration").addEventListener("click", () => {
            this.createRegistrationTable();
        });
    }

    async createUserTable() {
        this.createTableHead(["UserID", "Vorname", "Nachname", "Email", "Anmeldedatum"]);
        let userData = await this.fetch_api.postData("/getusers");
        let dataMatrix = userData.map((user) => Object.values(user));
        this.fillTableBody(dataMatrix);
    }

    async createRegistrationTable() {
        this.createTableHead(["#", "Email", "Status"]);
        let registerList = await this.fetch_api.postData("/getregistrationlist");
        console.log(registerList);
    }

    createTableHead(entries) {
        let thead = document.querySelector("thead");
        let tr = document.createElement("tr");
        for (let entry of entries) {
            let th = document.createElement("th");
            th.textContent = entry;
            tr.append(th);
        }
        thead.replaceChildren(tr);
    }

    fillTableBody(entries) {
        // takes [[val, val, val] [val, val, val]] and stupidly fills table with no checks
        let tbody = document.querySelector("tbody");
        for (let row of entries) {
            let tr = document.createElement("tr");
            for (let val of row) {
                let td = document.createElement("td");
                td.textContent = val;
                tr.append(td);
            }
            tbody.append(tr);
        }

    }
}

window.onload = () => {
    let userControl = new UserControl();
    userControl.applyEventListeners();
};