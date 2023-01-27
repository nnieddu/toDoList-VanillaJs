import { addTask, appendTask, taskList, createTaskForm } from "./scripts/addTask.js";
import { filterTasks, searchField, dateField } from "./scripts/searchTask.js";
import { editOrDeleteListItem } from "./scripts/menuButtonHandler.js";

createTaskForm.addEventListener("submit", (event) => addTask(event));
searchField.addEventListener("input", filterTasks);
dateField.addEventListener("input", filterTasks);

// <!--- Get task from SQLite DB --->
fetch("http://127.0.0.1:9000/v1/tasks")
  .then((response) => {
    if (response.status === 200) return response.json();
    document.getElementById("emptyTaskList").style.display = "block";
  })
  .then((data) => {
    if (data) {
      data.forEach((task) => {
        appendTask(task);
      });
    }
  })
  .catch((error) => console.error("Error: " + error));

// <!--- Edit & Delete menu EventHandler --->
document.addEventListener("mousedown", (e) => {
  let menu = taskList.querySelector(".menu");
  let inputDueDate = taskList.querySelector(".task-end-date");
  let saveButton = taskList.querySelector(".saveBtn");
  if (inputDueDate && saveButton && e.target != inputDueDate) {
    saveButton.parentNode.removeChild(saveButton);
    inputDueDate.parentNode.removeChild(inputDueDate);
  }
  if (menu) {
    menu.parentNode.classList.remove("expand");
    menu.parentNode.removeChild(menu);
  }
  const listItem = e.target.closest("LI");
  if (listItem && !listItem.querySelector(".task-end-date")) {
    editOrDeleteListItem(listItem, taskList);
  }
});

function checkDates() {
  const startDate = document.querySelector(".task-start-date").value;
  const endDate = document.querySelector(".task-end-date").value;
  document.querySelector(".task-end-date").min = startDate;
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    alert("Due date cannot be earlier than start date.");
    document.querySelector(".task-end-date").value = "";
  }
}

document.querySelector(".task-start-date").addEventListener("input", checkDates);
document.querySelector(".task-end-date").addEventListener("input", checkDates);
