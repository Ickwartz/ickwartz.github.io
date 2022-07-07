function createElements() {
    let testdiv = document.getElementById("container");
    let testp = document.createElement("p");
    testp.id = "testp";
    testp.textContent = "Hello this is default text";
    let testbutton = document.createElement("button");
    testbutton.id = "testbutton";
    testbutton.innerHTML = "Click Me";
    testbutton.addEventListener("click", () => {
        testp.textContent = "I changed";
    });

    testdiv.appendChild(testp);
    testdiv.appendChild(testbutton);
}

export {createElements};