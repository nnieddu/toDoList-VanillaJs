import { addTask, appendTask } from "./scripts/addTask.js";

const createTaskForm = document.getElementById("create-task-form");

createTaskForm.addEventListener("submit", event => addTask(event));

// <!-- Get task from SQLite DB -->
fetch("http://127.0.0.1:9000/v1/tasks")
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      document.getElementById("emptyTaskList").style.display = "block";
      console.error("Error: No task found");
    }
  })
  .then((data) => {
    if (data) {
      data.forEach((task) => {
        appendTask(task);
      });
    }
  })
  .catch((error) => console.error("Error: " + error));