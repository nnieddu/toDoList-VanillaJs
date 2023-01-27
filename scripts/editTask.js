import { checkDates } from "./datesHandler.js";
import { errorDisplayer } from "./datesHandler.js";

// <! ------------- La possibilité d'editer une tâche ------------- >
export function editListItem(listItem) {
  fetch(`http://127.0.0.1:9000/v1/tasks/${listItem.getAttribute("data-label")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
			const lineBreak = document.createElement("br");
			lineBreak.classList.add("lineBrak");
      const inputDueDate = document.createElement("input");
      inputDueDate.setAttribute("type", "date");
      if (data.end_date) inputDueDate.valueAsDate = new Date(data.end_date);
      inputDueDate.classList.add("task-end-date");
			inputDueDate.setAttribute("min", new Date(data.start_date).toISOString().slice(0,10));
			inputDueDate.setAttribute("max", "9999-12-31");

      const saveButton = document.createElement("img");
      saveButton.innerText = "Save";
      saveButton.setAttribute("src", "./style/save.svg");
      saveButton.setAttribute("alt", "Save");
			saveButton.classList.add("saveBtn");

      listItem.appendChild(lineBreak);
      listItem.appendChild(inputDueDate);
      listItem.appendChild(saveButton);

      saveButton.addEventListener("mousedown", () => {
        if (inputDueDate.value) {
					if (new Date(data.start_date) > new Date(inputDueDate.value)) {
						errorDisplayer(listItem);
						inputDueDate.value = "";
					}
					else {
          const updatedTask = {
            end_date: new Date(inputDueDate.value).toISOString(),
          };
          fetch(`http://127.0.0.1:9000/v1/tasks/${data.label}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
          }).catch((error) => console.error(error));

					let parts = listItem.getElementsByTagName("span")[1].innerHTML.split("|");
					parts[1] = " Due date : " + " <strong> " + new Date(inputDueDate.value).toLocaleDateString() +" <strong/>";
					listItem.getElementsByTagName("span")[1].innerHTML = parts.join(" |");
					listItem.classList.remove("late");
					listItem.classList.remove("sameday");
					checkDates(updatedTask.end_date, listItem)
        }
        listItem.removeChild(lineBreak);
        listItem.removeChild(inputDueDate);
        listItem.removeChild(saveButton);
			}
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
