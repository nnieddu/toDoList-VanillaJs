
// <!-- La possibilité d'editer une tâche -->

export function editListItem(listItem) {
  const input = document.createElement("input");
  input.value = listItem.getElementsByTagName("span")[0].innerText;

	const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
	inputDate.valueAsDate = new Date(listItem.getAttribute("data-end-date"));

  const saveButton = document.createElement("img");
  saveButton.innerText = "Save";
  saveButton.setAttribute("src", "./style/save.svg");
  saveButton.setAttribute("alt", "Save");

  listItem.innerText = "";
  listItem.appendChild(input);
  listItem.appendChild(inputDate);
  listItem.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    fetch(`http://127.0.0.1:9000/v1/tasks/${listItem.getAttribute("data-label")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    }).catch((error) => console.error(error));
  });
}
