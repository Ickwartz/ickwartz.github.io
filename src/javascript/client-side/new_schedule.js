import {NewScheduleTableHandler} from "./modules/newScheduleTableHandler.js";
let tableHandler =  new NewScheduleTableHandler();

function applyKeyListeners() {
	let inputs = document.querySelectorAll("input, textarea");
	let nodes = Array.prototype.slice.call(inputs);
	console.log(inputs);
	for (let input of inputs) {
		let index = nodes.indexOf(input);
		input.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				inputs[index+1] ? inputs[index+1].focus() : inputs[index].focus();
			}
		});
		
	}
	let textareas = document.getElementsByTagName("textarea");
	let textnodes = Array.prototype.slice.call(textareas);
	for (let textarea of textareas) {
		let index = textnodes.indexOf(textarea);
		textarea.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				if (!textareas[index+1]) {
					tableHandler.createRow();
				}
			}
		});
	}
}

window.onload = () => {

	document.getElementById("addRowButton").addEventListener("click",() => {
		tableHandler.createRow();
	});

	document.getElementById("submitButton").addEventListener("click", () => {
        tableHandler.saveTableData();
    }); 

	applyKeyListeners();
	let tbody = document.getElementById("input_body");
	const observer = new MutationObserver(async () => {
		applyKeyListeners();
    });
    observer.observe(tbody, {childList: true});
};