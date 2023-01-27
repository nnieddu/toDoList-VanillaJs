import { addTask, appendTask, taskList, createTaskForm} from "./scripts/addTask.js";
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
  listItem.style.whiteSpace = "unset";
  listItem.style.textOverflow = "unset";
  listItem.style.wordBreak = "break-word";

  const menu = document.createElement("div");
  menu.classList.add("menu");

  const editButton = document.createElement("img");
  editButton.setAttribute("src", "./style/edit.svg");
  editButton.setAttribute("alt", "Edit");
  editButton.addEventListener("mousedown", () => {
    listItem.removeChild(menu);
    editListItem(listItem);
  });

  const deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "./style/trash.svg");
  deleteButton.setAttribute("alt", "Edit");
  deleteButton.addEventListener("mousedown", () => {
    deleteTask(listItem, taskList);
  });

  menu.appendChild(editButton);
  menu.appendChild(deleteButton);
  listItem.appendChild(menu);
}

taskList.addEventListener("mousedown", (e) => {
    const listItem = e.target.closest("LI");
    if (listItem) {
			let menu = taskList.querySelector(".menu");
			if (menu) {
				console.log(menu.parentNode);
				menu.parentNode.style.whiteSpace = "nowrap";
				menu.parentNode.style.textOverflow = "ellipsis";
				menu.parentNode.style.wordBreak = "unset";
				menu.parentNode.removeChild(menu);
			}
      editOrDeleteListItem(listItem);
    }
});
