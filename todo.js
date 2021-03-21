const todoform = document.querySelector(".js-todoform");
const todoinput = todoform.querySelector("input");
const todolist = document.querySelector(".js-todolist");
let todos = [];

function deletetodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todolist.removeChild(li);
  const cleanTodos = todos.filter(function (todo) {
    return todo.id !== li.id;
  });
  todos = cleanTodos;
  saveTodo();
}

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delbtn = document.createElement("button");
  const newid = todos.length + 1;
  delbtn.innerText = "완료";
  span.innerText = text;
  delbtn.addEventListener("click", deletetodo);
  li.appendChild(span);
  li.appendChild(delbtn);
  todolist.appendChild(li);
  li.id = newid;
  const todoObj = {
    text: text,
    id: newid,
  };
  todos.push(todoObj);
  saveTodo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoinput.value;
  paintTodo(currentValue);
  todoinput.value = "";
}

function loadTodos() {
  const loadedTodos = localStorage.getItem("todos");
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (todo) {
      paintTodo(todo.text);
    });
  } else {
  }
}

function init() {
  loadTodos();
  todoform.addEventListener("submit", handleSubmit);
}
init();
