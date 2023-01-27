export function errorDisplayer(targetedError) {
		const error = document.createElement("p");
		error.innerText = "Due date cannot be earlier than start date.";
		targetedError.appendChild(error);
		setTimeout(() => {
			targetedError.removeChild(error);
		}, 3000);
}

export function blockEarlierDates(createTaskForm) {
	const startDate = document.querySelector(".task-start-date").value;
	const endDate = document.querySelector(".task-end-date").value;
	document.querySelector(".task-end-date").min = startDate;
	if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
		errorDisplayer(createTaskForm);
		document.querySelector(".task-end-date").value = "";
	}
}


// ------- Un système de validation de tâche par date de fin ------->
export function checkDates(taskEndDate, li) {
  // const startDate = new Date(task.start_date);
	let todayDate = new Date();
  todayDate.setMinutes(0);
  todayDate.setHours(1);
  todayDate.setSeconds(0);
  todayDate.setMilliseconds(0);

  const endDate = new Date(taskEndDate);
  if (todayDate.getTime() > endDate.getTime()) li.className += " late";
  if (todayDate.getTime() === endDate.getTime()) li.className += " sameday";
  return li;
}
