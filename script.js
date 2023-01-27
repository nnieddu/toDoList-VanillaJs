import { addTask, appendTask, taskList, createTaskForm } from "./scripts/addTask.js";
import { filterTasks, searchField, dateField } from "./scripts/searchTask.js";
import { editOrDeleteListItem } from "./scripts/menuButtonHandler.js";
import { blockEarlierDates } from "./scripts/datesHandler.js";

createTaskForm.addEventListener("submit", (event) => addTask(event));
searchField.addEventListener("input", filterTasks);
dateField.addEventListener("input", filterTasks);
document.querySelector(".task-start-date").addEventListener("input", () => blockEarlierDates(createTaskForm));
document.querySelector(".task-end-date").addEventListener("input", () => blockEarlierDates(createTaskForm));

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
  const menu = taskList.querySelector(".menu");
  const lineBreak = taskList.querySelector(".lineBrak");
  const inputDueDate = taskList.querySelector(".task-end-date");
  const saveButton = taskList.querySelector(".saveBtn");

  if (inputDueDate && saveButton && e.target != inputDueDate) {
    inputDueDate.parentNode.removeChild(lineBreak);
    inputDueDate.parentNode.removeChild(inputDueDate);
    saveButton.parentNode.removeChild(saveButton);
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
