class Snackbar {
    constructor() {}

    addSnackbar() {
        console.log("Snek");
        let snackbar = document.createElement("div");
        snackbar.id = "snackbar";
        let snackbarContent = document.createElement("p");
        snackbarContent.id = "snackbar-content";
        snackbar.append(snackbarContent);
        document.body.append(snackbar);

        let snackbarCss = "<link rel='stylesheet' href='../css/snackbar.css' type='text/css'></link>";
        document.head.innerHTML += snackbarCss;
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

export {Snackbar};