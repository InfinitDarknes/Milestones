function DisplayTrashBin() {
  if (DoesElementExist("trash-bin-section")) return;

  if (DoesElementExist("settings-container")) HideSettings();

  if (DoesElementExist("tasks-section")) document.getElementById("tasks-section").remove();

  if (DoesElementExist("user-category-page")) document.getElementById("user-category-page").remove();

  // Trash Bin Section
  const TrashBinSection = document.createElement("section");
  TrashBinSection.id = "trash-bin-section";
  document.body.appendChild(TrashBinSection);
  // List Section
  const ListSection = document.createElement("section");
  ListSection.id = "list-section";
  TrashBinSection.appendChild(ListSection);
  // Task Bar
  AppendHTMLElements("AppendTaskBar");
  AppendHTMLElements("AppendSelectAllButton");
  AppendHTMLElements("AppendDeleteTaskButton");
  AppendHTMLElements("AppendRestoreTaskButton");
  CheckForSelectedTasks();
  LoadTrashedTasks();
}
function LoadTrashedTasks() {
  if (!CheckForSave("AllTasks")) {
    EmptyBox("You have no task in trash bin");
    return;
  }
  let TrashedTasksArray = [];
  AllTasksArray.forEach((Task) => {
    if (Task.IsTaskTrashed) {
      TrashedTasksArray.push(Task);
    }
  });
  if (TrashedTasksArray.length === 0) {
    EmptyBox("You have no task in trash bin");
    return;
  }
  CheckForSelectedTasks();
  EnableSelectAllOption();
  ClearListSection();
  TrashedTasksArray.forEach((Task) => {
    const TrashedTask = document.createElement("section");
    TrashedTask.className = "task-container";
    TrashedTask.id = Task.ID.toString();
    const CheckBoxContainer = document.createElement("label");
    CheckBoxContainer.className = "checkbox-container";
    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";
    Checkbox.className = "checkbox";
    Checkbox.addEventListener("change", CheckForSelectedTasks);
    const CheckMark = document.createElement("div");
    CheckMark.className = "checkmark";
    const TrashedTaskTitle = document.createElement("section");
    TrashedTaskTitle.className = "task-title";
    TrashedTaskTitle.setAttribute("inert", "");
    const DateContainer = document.createElement("section");
    DateContainer.className = "date-container";
    DateContainer.classList.add("disabled");
    const TrashedTaskDate = document.createElement("section");
    TrashedTaskDate.className = "task-date";
    const TrashedTaskTime = document.createElement("section");
    TrashedTaskTime.className = "task-time";
    const TrashedTaskBadge = document.createElement("span");
    TrashedTaskBadge.className = "trashed-task-badge";
    TrashedTaskBadge.innerHTML = Strings.TrashedTaskBadge[UserSettings.CurrentLang];
    TrashedTaskBadge.setAttribute("inert", "");
    TrashedTask.addEventListener("contextmenu", (Event) => {
      Event.preventDefault();
      DisplayTaskContextMenu(Event, "Trashed");
    });
    TrashedTask.appendChild(CheckBoxContainer);
    CheckBoxContainer.appendChild(Checkbox);
    CheckBoxContainer.appendChild(CheckMark);
    TrashedTask.appendChild(TrashedTaskTitle);
    TrashedTask.appendChild(TrashedTaskBadge);
    TrashedTask.appendChild(DateContainer);
    DateContainer.appendChild(TrashedTaskDate);
    DateContainer.appendChild(TrashedTaskTime);
    TrashedTaskTitle.textContent = Task.Title;
    TrashedTaskDate.textContent = Task.DisplayDate;
    TrashedTaskTime.textContent = Task.DisplayTime;
    document.getElementById("list-section").appendChild(TrashedTask);
  });
}
function MoveToTrash(ActionType, ID) {
  if (ActionType === "SingleOperation") {
    for (i = 0; i < AllTasksArray.length; i++) {
      if (AllTasksArray[i].ID === ID) {
        AllTasksArray[i].IsTaskTrashed = true;
        localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
      }
    }
    CategoriesTasks(localStorage.getItem("SelectedCategory"));
    CheckForSelectedTasks();
  } else {
    let CheckBoxes = document.querySelectorAll(".checkbox");
    for (n of CheckBoxes) {
      if (n.checked) {
        for (i = 0; i < AllTasksArray.length; i++) {
          if (AllTasksArray[i].ID === n.parentNode.parentNode.id) {
            AllTasksArray[i].IsTaskTrashed = true;
            localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
          }
        }
        CategoriesTasks(localStorage.getItem("SelectedCategory"));
      }
    }
  }
  if (document.getElementById("select-all-checkbox").checked) {
    document.getElementById("select-all-checkbox").checked = false;
  }
}
