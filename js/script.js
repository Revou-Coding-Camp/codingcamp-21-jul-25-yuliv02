const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const todoList = document.getElementById("todo-list");

let todos = [];

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty-msg">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTodo() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please fill in both fields.");
    return;
  }

  todos.push({ task, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleStatus(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteAllTodos() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
}

function filterTodos() {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAllTodos);
filterBtn.addEventListener("click", filterTodos);

renderTodos();
