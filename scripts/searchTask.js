// <!---------- Un champ de recherche par texte et par date -------->

export const searchField = document.getElementById("search-field");
export const dateField = document.getElementById("search-date-field");

export function filterTasks() {
	const tasks = document.getElementById("task-list").getElementsByTagName("li");
  const searchTerm = searchField.value.toLowerCase();
  let dateValue = "";
  if (dateField.value !== "") {
    dateValue = new Date(dateField.value).toISOString();
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task.getElementsByTagName("span")[0].textContent.toLowerCase();
    const taskDate = task.getAttribute("data-end-date");
    if (
      taskText.indexOf(searchTerm) !== -1 &&
      (dateValue === "" || taskDate === dateValue)
    ) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
}