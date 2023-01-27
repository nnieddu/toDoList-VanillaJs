
// <!-- La possibilité de supprimer une tâche précise -->

let isLoading = false;

export async function deleteTask(listItem, taskList) {
  if (isLoading) {
    return;
  }
  isLoading = true;
  try {
    let label = listItem.getAttribute("data-label");
    const response = await fetch(`http://127.0.0.1:9000/v1/tasks/${label}`, {
      method: "DELETE",
    });
    if (response.ok) {
      taskList.removeChild(listItem);
      if (document.getElementsByTagName("li").length === 0)
        document.getElementById("emptyTaskList").style.display = "block";
    }
  } catch (error) {
    console.error("Error deleting task:" + error);
  } finally {
    isLoading = false;
  }
}
