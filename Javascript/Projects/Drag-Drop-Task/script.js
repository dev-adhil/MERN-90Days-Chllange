const notyf = new Notyf();
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const newList = document.getElementById("newList");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

let draggedItem = null;
let sourceList = null;

// Load tasks from localStorage
window.addEventListener("load", () => {
  loadTasks("tasks_new", newList);
  loadTasks("tasks_pending", pendingList);
  loadTasks("tasks_completed", completedList);
});

// Add new task
addBtn.addEventListener("click", () => {
  const taskValue = taskInput.value.trim();
  if (!taskValue) return notyf.error("Please enter a task!");

  addTaskToList(taskValue, newList);
  saveTaskToLocalStorage("tasks_new", taskValue);
  notyf.success("Task added successfully!");
  taskInput.value = "";
});

// Add task to a list
function addTaskToList(taskValue, list) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.draggable = true;

  const span = document.createElement("span");
  span.textContent = taskValue;
  li.appendChild(span);

  const icons = document.createElement("span");
  icons.classList.add("task-icons");
  icons.innerHTML = `
    <i class="fa-solid fa-pen-to-square edit-btn"></i>
    <i class="fa-solid fa-trash delete-btn"></i>
  `;
  li.appendChild(icons);
  list.appendChild(li);

  // DELETE
  icons.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    removeTaskFromLocalStorage(list.id, span.textContent);
    notyf.success("Task deleted!");
  });

  // EDIT
  icons.querySelector(".edit-btn").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.classList.add("edit-input");

    li.replaceChild(input, span);
    input.focus();

    const saveEdit = () => {
      const newValue = input.value.trim();
      if (!newValue) return notyf.error("Task cannot be empty!");
      
      updateTaskInLocalStorage(list.id, span.textContent, newValue);
      span.textContent = newValue;
      li.replaceChild(span, input);
      notyf.success("Task updated!");
    };

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") saveEdit();
    });
  });

  // DRAG
  li.addEventListener("dragstart", () => {
    draggedItem = li;
    sourceList = list;
    li.classList.add("dragging");
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
    draggedItem = null;
    sourceList = null;
    saveAllListsToLocalStorage();
  });
}

// Drag & Drop for all lists
[newList, pendingList, completedList].forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    list.classList.add("drag-over"); // highlight
    const target = e.target.closest("li");
    if (target && target !== draggedItem) {
      const rect = target.getBoundingClientRect();
      const offset = e.clientY - rect.top;
      if (offset > rect.height / 2) target.insertAdjacentElement("afterend", draggedItem);
      else target.insertAdjacentElement("beforebegin", draggedItem);
    } else if (!target && draggedItem) {
      list.appendChild(draggedItem);
    }
  });

  list.addEventListener("dragleave", () => list.classList.remove("drag-over"));
  list.addEventListener("drop", () => {
    list.classList.remove("drag-over");
    if (draggedItem && sourceList !== list) {
      sourceList.removeChild(draggedItem);
      list.appendChild(draggedItem);
      notyf.success("Task moved!");
      saveAllListsToLocalStorage();
    }
  });
});

// LocalStorage functions
function saveTaskToLocalStorage(key, taskValue) {
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  tasks.push(taskValue);
  localStorage.setItem(key, JSON.stringify(tasks));
}

function loadTasks(key, list) {
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  tasks.forEach((task) => addTaskToList(task, list));
}

function removeTaskFromLocalStorage(listId, taskValue) {
  const key = getKey(listId);
  let tasks = JSON.parse(localStorage.getItem(key)) || [];
  tasks = tasks.filter((task) => task !== taskValue);
  localStorage.setItem(key, JSON.stringify(tasks));
}

function updateTaskInLocalStorage(listId, oldValue, newValue) {
  const key = getKey(listId);
  let tasks = JSON.parse(localStorage.getItem(key)) || [];
  const idx = tasks.indexOf(oldValue);
  if (idx !== -1) {
    tasks[idx] = newValue;
    localStorage.setItem(key, JSON.stringify(tasks));
  }
}

function saveAllListsToLocalStorage() {
  localStorage.setItem("tasks_new", JSON.stringify(getListItems(newList)));
  localStorage.setItem("tasks_pending", JSON.stringify(getListItems(pendingList)));
  localStorage.setItem("tasks_completed", JSON.stringify(getListItems(completedList)));
}

function getKey(listId) {
  if (listId === "newList") return "tasks_new";
  if (listId === "pendingList") return "tasks_pending";
  if (listId === "completedList") return "tasks_completed";
}

function getListItems(list) {
  return Array.from(list.querySelectorAll("li span:first-child")).map(span => span.textContent.trim());
}
