import { deleteTask } from "./deleteTask.js";
import { editListItem } from "./editTask.js";

// <!--- Edit / Delete buttons handler --->
export function editOrDeleteListItem(listItem, taskList) {
	listItem.classList.add("expand");
	const menu = document.createElement("div");
  menu.classList.add("menu");

  const editButton = document.createElement("img");
  editButton.setAttribute("src", "./style/edit.svg");
  editButton.setAttribute("alt", "Edit");

	const deleteButton = document.createElement("img");
	deleteButton.setAttribute("src", "./style/trash.svg");
	deleteButton.setAttribute("alt", "Edit");

  editButton.addEventListener("mousedown", () => {
    listItem.removeChild(menu);
    editListItem(listItem, menu, editButton, deleteButton);
  });

  deleteButton.addEventListener("mousedown", () => {
    deleteTask(listItem, taskList);
  });

  menu.appendChild(editButton);
  menu.appendChild(deleteButton);
  listItem.appendChild(menu);
}