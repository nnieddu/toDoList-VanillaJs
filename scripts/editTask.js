// <! ------------- La possibilité d'editer une tâche ------------- >

export function editListItem(listItem) {
  const input = document.createElement("input");
  input.value = listItem.getElementsByTagName("span")[0].innerText;

  const inputDueDate = document.createElement("input");
  inputDueDate.setAttribute("type", "date");
  inputDueDate.valueAsDate = new Date(listItem.getAttribute("data-end-date"));
  inputDueDate.className += " task-end-date";

  const saveButton = document.createElement("img");
  saveButton.innerText = "Save";
  saveButton.setAttribute("src", "./style/save.svg");
  saveButton.setAttribute("alt", "Save");

  listItem.innerText = "";
  listItem.appendChild(input);
  listItem.appendChild(inputDueDate);
  listItem.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    if (input.value && inputDueDate.value) {
      const updatedTask = {
        label: listItem.getAttribute("data-label"),
        description: input.value,
        start_date: new Date(listItem.getAttribute("data-start-date")).toISOString(),
        end_date: new Date(inputDueDate.value).toISOString(),
      };

      fetch(`http://127.0.0.1:9000/v1/tasks/${updatedTask.label}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }).catch((error) => console.error(error));

			listItem.getElementsByTagName("span")[0].innerText = input.value;
			listItem.getElementsByTagName("span")[1].innerText = inputDueDate.value;

      listItem.removeChild(input);
      listItem.removeChild(inputDueDate);
      listItem.removeChild(saveButton);
    }
		else
			alert("Task and due date can't be empty !")
  });
}
