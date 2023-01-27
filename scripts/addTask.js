export const taskList = document.getElementById("task-list");
var labelnbr = 0;

// ---- Un système de validation de tâche par date de fin ----
function checkDates(task, li) {
  const startDate = new Date(task.start_date);
  const endDate = new Date(task.end_date);
  if (startDate.getTime() > endDate.getTime()) li.className += " late";
  if (startDate.getTime() === endDate.getTime()) li.className += " sameday";
  return li;
}

// <!-- La création de tâche -->
export function appendTask(task) {
  let li = document.createElement("li");
  li.setAttribute("data-label", labelnbr.toString());
  li.setAttribute("data-end-date", task.end_date);
  li = checkDates(task, li);
  taskList.appendChild(li);
  let spanDecsription = document.createElement("span");
  let spanDates = document.createElement("span");
  li.appendChild(spanDecsription);
  spanDecsription.innerHTML = `${task.description} <br>`;
  li.appendChild(spanDates);
  spanDates.innerHTML = `Created : <strong>${new Date(
    task.start_date
  ).toLocaleDateString()}<strong/> | Due date : <strong>${new Date(
    task.end_date
  ).toLocaleDateString()}<strong/>`;
  document.getElementById("emptyTaskList").style.display = "none";
  labelnbr++;
}

export function addTask(clickEvent) {
  clickEvent.preventDefault();

  let formData = new FormData(createTaskForm);

  let startDate = new Date();
  startDate.setMinutes(0);
  startDate.setHours(1);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);

  const taskToAdd = {
    label: labelnbr.toString(),
    description: formData.get("task-description"),
    start_date: startDate.toISOString(),
    end_date: new Date(formData.get("task-end-date")).toISOString(),
  };

  fetch("http://127.0.0.1:9000/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskToAdd),
  })
    .then((response) => {
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
    })
    .catch((error) => console.error(error));

  appendTask(taskToAdd);
}
