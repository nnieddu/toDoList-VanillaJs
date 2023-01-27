import { addTask, appendTask, taskList, createTaskForm } from "./scripts/addTask.js";
import { deleteTask } from "./scripts/deleteTask.js";
import { editListItem } from "./scripts/editTask.js";
import { filterTasks, searchField, dateField } from "./scripts/searchTask.js";

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

// <!--- Edit / Delete buttons handler --->
function editOrDeleteListItem(listItem) {
  if (listItem.querySelector(".menu")) {
    return;
  }

  listItem.style.whiteSpace = "unset";
  listItem.style.textOverflow = "unset";
  listItem.style.wordBreak = "break-all";

  const menu = document.createElement("div");
  menu.classList.add("menu");

  const editButton = document.createElement("img");
  editButton.setAttribute("src", "./style/edit.svg");
  editButton.setAttribute("alt", "Edit");
  editButton.addEventListener("click", () => {
    editListItem(listItem);
  });

  const deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "./style/trash.svg");
  deleteButton.setAttribute("alt", "Edit");
  deleteButton.addEventListener("click", () => {
    deleteTask(listItem, taskList);
  });

  menu.appendChild(editButton);
  menu.appendChild(deleteButton);
  listItem.appendChild(menu);

  document.addEventListener("click", (e) => {
    if (!listItem.contains(e.target)) {
      listItem.removeChild(menu);
      listItem.style.whiteSpace = "nowrap";
      listItem.style.textOverflow = "ellipsis";
      listItem.style.wordBreak = "unset";
    }
  });
}

taskList.addEventListener("click", (e) => {
  const listItem = e.target.closest("LI");
  if (listItem) {
    editOrDeleteListItem(listItem);
  }
});
