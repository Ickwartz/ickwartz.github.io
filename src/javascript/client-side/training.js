window.onload = () => {

    const button = document.getElementById("button1");

    button.addEventListener("click", () => {
        document.location.href = document.location.href + "/test";
    });
};