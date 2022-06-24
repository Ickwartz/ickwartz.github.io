class TableHandler  {
	constructor(){}
	rows = 0;

	tableBody = document.getElementById("input_body");
	getTableRowHtml() {
		return `
		<tr>
			<td>${this.rows}</td>
			<td><input id="exInp${this.rows}" type="text" placeholder="Übung" class="TableInput"/></td>
			<td><input id="descInp${this.rows}" type="text" placeholder="Beschreibung" class="TableInput"/></td>
		</tr>`;
	}

	createRow() {
		// Create Rows like this to keep values when adding new Rows
		this.rows++;
		const tr = document.createElement("tr");

		let td_index = document.createElement("td");
		td_index.innerHTML = this.rows;

		let td_name = document.createElement("td");
		let ti_name = document.createElement("input");
		ti_name.setAttribute("id", `exInp${this.rows}`);
		ti_name.setAttribute("type", "text");
		ti_name.setAttribute("placeholder", "Übung");
		ti_name.setAttribute("class", "TableInput");
		td_name.appendChild(ti_name);

		let td_description = document.createElement("td");
		let ti_description = document.createElement("input");
		ti_description.setAttribute("id", `descInp${this.rows}`);
		ti_description.setAttribute("type", "text");
		ti_description.setAttribute("placeholder", "Beschreibung");
		ti_description.setAttribute("class", "TableInput");
		td_description.appendChild(ti_description);

		tr.appendChild(td_index);
		tr.appendChild(td_name);
		tr.appendChild(td_description);

		this.tableBody.appendChild(tr);
	}


	getTableData() {
		let data = [];
		for (let i = 1; i <= this.rows; i++) {
			let exercise = document.getElementById(`exInp${i}`);
			let description = document.getElementById(`descInp${i}`);
			data.push({name: exercise.value, description: description.value});
		}
		return(data);
	}

	// TODO: change to fetch api
	ajaxPostData(url, data) {
		let jsonData = JSON.stringify(data);
		const xhttp = new XMLHttpRequest();
		xhttp.open("POST", url);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(jsonData);
	
	}

	async postData(url, data) {
		return fetch(url, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			return data;
		});
	}

	async saveTableData() {
		this.postData("/newexercise/save", this.getTableData()).then(result => {
			this.showResultMessage(result);
		});
	}

	showResultMessage(resultArr) {
		console.log(resultArr);
		let success = false;
		let text = "";

		resultArr.forEach(element => {
			if (element.result && !success) {
				success = true;
				text = "Erfolgreich in der Datenbank gespeichert!" + text;
			} else {
				text += "<br>" + element.message;
			}
		});
		this.displayOnSnackbar(text);
	}

	displayOnSnackbar(text) {
		// Show fading popup message on bottom of screen
		const snackbar = document.getElementById("snackbar");
		const snackbarContent = document.getElementById("snackbar-content");
		snackbarContent.innerHTML = text;
		snackbar.className = "show";
		// make it fade after 5s
		setTimeout(() => {snackbar.className = "";}, 5000);
	}
}

window.onload = () => {
	let tableHandler =  new TableHandler();

	document.getElementById("addRowButton").addEventListener("click",() => {
		tableHandler.createRow();
	});

	document.getElementById("submitButton").addEventListener("click", () => (tableHandler.saveTableData()));

};
