const editButton = document.getElementById("toggleForm");
const submitButton = document.getElementById("updateDetails");
const dataDisplays = document.getElementsByClassName("data-display");
const inputs = document.getElementsByClassName("form-control");
for (let input of inputs) input.style.display = "none";
submitButton.style.display = "none";

editButton.addEventListener("click", (event) => {
    event.preventDefault();
    editButton.style.display = "none";
    for (let dataDisplay of dataDisplays) dataDisplay.style.display = "none";
    submitButton.style.display = "block";
    for (let input of inputs) input.style.display = "block"; 
})

submitButton.addEventListener("click", () => {
    editButton.style.display = "block";
    for (let dataDisplay of dataDisplays) dataDisplay.style.display = "block";
    submitButton.style.display = "none";
    for (let input of inputs) input.style.display = "none"; 
})
