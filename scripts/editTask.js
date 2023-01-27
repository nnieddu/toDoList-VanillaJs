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
			console.log(data.start_date);
			inputDueDate.setAttribute("min", new Date(data.start_date).toISOString().slice(0,10));

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
          if (new Date(data.start_date).getTime() > new Date(updatedTask.end_date).getTime()) 
						listItem.className += " late";
          if (new Date(data.start_date).getTime() === new Date(updatedTask.end_date).getTime()) 
						listItem.className += " sameday";
        }

        listItem.removeChild(lineBreak);
        listItem.removeChild(inputDueDate);
        listItem.removeChild(saveButton);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
