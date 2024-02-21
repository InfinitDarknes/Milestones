function DisplayTrashBin() {
  SelectedUserCategory = "";
  CurrentWindow = `Trash-All`;
  if (DoesElementExist("trash-bin-section")) return;

  if (DoesElementExist("settings-container")) HideSettings();

  if (DoesElementExist("tasks-section")) document.getElementById("tasks-section").remove();

  if (DoesElementExist("user-category-page")) document.getElementById("user-category-page").remove();

  // Trash Bin Section
  const TrashBinSection = document.createElement("section");
  TrashBinSection.id = "trash-bin-section";
  document.body.append(TrashBinSection);
  // List Section
  const ListSection = document.createElement("section");
  ListSection.id = "list-section";
  // Trashbin header
  const TrashBinHeader = document.createElement("section");
  TrashBinHeader.id = "trash-bin-header";
  const TrashBinIcon = document.createElement("img");
  TrashBinIcon.id = "trash-bin-icon";
  TrashBinIcon.src = IconsSrc.TrashIcon[UserSettings.Theme];
  const TrashBinTitle = document.createElement("span");
  TrashBinTitle.id = "trash-bin-title";
  TrashBinTitle.innerText = Strings.TrashBinTitle[UserSettings.CurrentLang];
  TrashBinHeader.append(TrashBinIcon, TrashBinTitle);
  // Appending
  TrashBinSection.append(TrashBinHeader, ListSection);
  // Task Bar
  AppendTaskBar();
  AppendSelectAllSection();
  // Sort All trash button
  if (!DoesElementExist("sort-all-trash")) {
    const SortBar = document.getElementById("sort-bar");
    const SortAllTrash = document.createElement("button");
    SortAllTrash.className = "sort-buttons";
    SortAllTrash.id = "sort-all-trash";
    SortAllTrash.textContent = Strings.SortAllTrash[UserSettings.CurrentLang];
    SortAllTrash.addEventListener("click", () => {
      CurrentWindow = `Trash-All`;
      LoadTrashedTasks(ReturnTrashedTasks());
      HighLightSelectedSortButton("sort-all-trash");
    });
    SortBar.append(SortAllTrash);
  }
  // Sort today button
  if (!DoesElementExist("sort-today")) {
    const SortBar = document.getElementById("sort-bar");
    const SortToday = document.createElement("button");
    SortToday.className = "sort-buttons";
    SortToday.id = "sort-today";
    SortToday.textContent = Strings.SortTodayButton[UserSettings.CurrentLang];
    SortToday.addEventListener("click", () => {
      CurrentWindow = `Trash-Today`;
      LoadTrashedTasks(ReturnTodayTasks(ReturnTrashedTasks()));
      HighLightSelectedSortButton("sort-today");
    });
    SortBar.append(SortToday);
  }
  // Sort tomorrow button
  if (!DoesElementExist("sort-tomorrow")) {
    const SortBar = document.getElementById("sort-bar");
    const SortTomorrow = document.createElement("button");
    SortTomorrow.className = "sort-buttons";
    SortTomorrow.id = "sort-tomorrow";
    SortTomorrow.textContent = Strings.SortTomorrowButton[UserSettings.CurrentLang];
    SortTomorrow.addEventListener("click", () => {
      CurrentWindow = `Trash-Tomorrow`;
      LoadTrashedTasks(ReturnTomorrowTasks(ReturnTrashedTasks()));
      HighLightSelectedSortButton("sort-tomorrow");
    });
    SortBar.append(SortTomorrow);
  }
  // Sort in 2 days button
  if (!DoesElementExist("sort-in-2-days")) {
    const SortBar = document.getElementById("sort-bar");
    const SortIn2Days = document.createElement("button");
    SortIn2Days.className = "sort-buttons";
    SortIn2Days.id = "sort-in-2-days";
    SortIn2Days.textContent = Strings.SortIn2DaysButton[UserSettings.CurrentLang];
    SortIn2Days.addEventListener("click", () => {
      CurrentWindow = `Trash-In2Days`;
      LoadTrashedTasks(ReturnIn2DaysTasks(ReturnTrashedTasks()));
      HighLightSelectedSortButton("sort-in-2-days");
    });
    SortBar.append(SortIn2Days);
  }
  AppendSearchBar();
  LoadTrashedTasks(ReturnTrashedTasks());
  HighLightSelectedSortButton("sort-all-trash");
}
function ReturnTrashedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.IsTaskTrashed;
  });
}
function LoadTrashedTasks(TargetArray) {
  if (TargetArray.length === 0) {
    EmptyBox("You have no task in trash bin");
    return;
  }
  ClearListSection();
  AppendTrashedTaskContainer(TargetArray);
  DeselectAll();
}
function MoveToTrash(ID) {
  const SelectAllButton = document.getElementById("select-all-checkbox");
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      Task.IsTaskPinned = false;
      Task.IsTaskTrashed = true;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.IsTaskPinned = false;
    Task.IsTaskTrashed = true;
    Task.Selected = false;
  }
  localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
  if (SelectAllButton.checked) SelectAllButton.checked = false;
  UpdateInbox();
  ToggleSelectMode();
}
function AppendTrashedTaskContainer(TrashedTasks) {
  TrashedTasks.forEach((Task) => {
    const ListSection = document.getElementById("list-section");
    const TaskContainer = document.createElement("section");
    TaskContainer.className = "task-container";
    TaskContainer.id = Task.ID.toString();
    TaskContainer.draggable = "true";
    const CheckBoxContainer = document.createElement("label");
    CheckBoxContainer.className = "checkbox-container";
    CheckBoxContainer.style.display = "none";
    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";
    Checkbox.className = "checkbox task-checkbox";
    Checkbox.addEventListener("change", () => {
      if (Checkbox.checked) SelectTask(TaskContainer.id);
      else DeSelectTask(TaskContainer.id);
    });
    const CheckMark = document.createElement("div");
    CheckMark.className = "checkmark";
    const TaskTitle = document.createElement("section");
    TaskTitle.className = "task-title";
    TaskTitle.setAttribute("inert", "");
    const DateContainer = document.createElement("section");
    DateContainer.className = "date-container";
    DateContainer.inert = "true";
    const TaskDate = document.createElement("section");
    TaskDate.className = "task-date";
    const TaskTime = document.createElement("section");
    TaskTime.className = "task-time";
    TaskContainer.append(CheckBoxContainer);
    CheckBoxContainer.append(Checkbox);
    CheckBoxContainer.append(CheckMark);
    TaskContainer.append(TaskTitle);
    TaskContainer.append(DateContainer);
    DateContainer.append(TaskDate);
    DateContainer.append(TaskTime);
    const TrashedTaskBadge = document.createElement("span");
    TrashedTaskBadge.className = "trashed-task-badge";
    TrashedTaskBadge.innerHTML = Strings.TrashedTaskBadge[UserSettings.CurrentLang];
    TrashedTaskBadge.setAttribute("inert", "");
    TaskContainer.append(TrashedTaskBadge);
    TaskContainer.addEventListener("contextmenu", (Event) => {
      Event.preventDefault();
      DisplayTaskContextMenu(Event, "Trashed");
    });
    TaskContainer.addEventListener("click", (Event) => {
      if (!SelectMode) return;
      let Task = AllTasksArray[FindIndexOfTask(Event.target.id)];
      let TaskID = Event.target.id;
      if (Task.Selected) {
        DeSelectTask(TaskID);
      } else {
        SelectTask(TaskID);
      }
    });
    TaskContainer.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("DragableElementID", event.target.id);
      console.log(event.target.id);
    });
    TaskTitle.textContent = Task.Title;
    TaskDate.textContent = Task.DisplayDate;
    TaskTime.textContent = Task.DisplayTime;
    ListSection.append(TaskContainer);
  });
}
