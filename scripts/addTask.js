export const taskList = document.getElementById("task-list");
export const createTaskForm = document.getElementById("create-task-form");
import { checkDates } from "./datesHandler.js";

// --------------------- La création de tâche --------------------- >
function createUniqueLabel() {
  const listItems = document.querySelectorAll("li");
  let existingLabels = [];
  listItems.forEach((li) => {
    existingLabels.push(li.getAttribute("data-label"));
  });
  let newLabel = 0;
  do {
    newLabel++;
  } while (existingLabels.includes(newLabel.toString()));
  return newLabel.toString();
}

export function appendTask(task) {
  let li = document.createElement("li");
  li.setAttribute("data-label", task.label);
  li.setAttribute("data-start-date", task.start_date);
  li = checkDates(task.end_date, li);
  taskList.appendChild(li);
  let spanDecsription = document.createElement("span");
  let spanDates = document.createElement("span");
  li.appendChild(spanDecsription);
  spanDecsription.innerHTML = `${task.description} <br>`;
  li.appendChild(spanDates);
  spanDates.innerHTML = `Started : <strong>${new Date(task.start_date).toLocaleDateString()}<strong/>`;
	if (task.end_date) {
		li.setAttribute("data-end-date", task.end_date);
		spanDates.innerHTML += ` | Due date : <strong>${new Date(task.end_date).toLocaleDateString()}<strong/>`;
	}
  document.getElementById("emptyTaskList").style.display = "none";
}

export function addTask(clickEvent) {
  clickEvent.preventDefault();
  let formData = new FormData(createTaskForm);
	
  const taskToAdd = {
    label: createUniqueLabel(),
    description: formData.get("task-description"),
    start_date: new Date(formData.get("task-start-date")).toISOString(),
  };
  let endDate = formData.get("task-end-date");
  if (endDate) taskToAdd.end_date = new Date(endDate).toISOString();

  fetch("http://127.0.0.1:9000/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskToAdd),
  })
    .then((response) => {
      if (endDate) {
        if (response.ok) {
          return fetch(`http://127.0.0.1:9000/v1/tasks/${taskToAdd.label}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskToAdd),
          });
        } else {
          throw new Error("Error in POST request");
        }
      }
    })
    .then(() => {
      appendTask(taskToAdd);
			createTaskForm.reset();
    })
    .catch((error) => console.error(error));
}
