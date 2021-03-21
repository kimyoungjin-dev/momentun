const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

function saveName(text) {
  localStorage.setItem("currentUser", text);
}

function handledSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add("showing");
  form.addEventListener("submit", handledSubmit);
}

function paintGreeting(text) {
  form.classList.remove("showing");
  greeting.classList.add("showing");
  greeting.innerText = `Hello ${text}!`;
}

function loadName() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
