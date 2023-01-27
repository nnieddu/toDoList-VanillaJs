// <! ------------- La possibilité d'editer une tâche ------------- >

export function editListItem(listItem) {
  const inputDueDate = document.createElement("input");
  inputDueDate.setAttribute("type", "date");
  inputDueDate.valueAsDate = new Date(listItem.getAttribute("data-end-date"));
  inputDueDate.className += " task-end-date";

  const saveButton = document.createElement("img");
  saveButton.innerText = "Save";
  saveButton.setAttribute("src", "./style/save.svg");
  saveButton.setAttribute("alt", "Save");

  listItem.appendChild(inputDueDate);
  listItem.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    if (inputDueDate.value) {
      const updatedTask = {
        end_date: new Date(inputDueDate.value).toISOString(),
      };
      fetch(`http://127.0.0.1:9000/v1/tasks/${listItem.getAttribute("data-label")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }).catch((error) => console.error(error));

      let text = listItem.getElementsByTagName("span")[1].innerText;
      let newDueDate =
        "<strong> " + new Date(inputDueDate.value).toLocaleDateString() + " <strong/>";
      let startIndex = text.indexOf("Due date : ") + "Due date : ".length;
      let oldDueDate = text.substring(startIndex);
      listItem.getElementsByTagName("span")[1].innerHTML = text.replace(
        oldDueDate,
        newDueDate
      );

      listItem.removeChild(inputDueDate);
      listItem.removeChild(saveButton);
    } else alert("Task due date can't be empty !");
  });
}
