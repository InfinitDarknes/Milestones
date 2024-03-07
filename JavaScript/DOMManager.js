function HighLightSelectedSideBarItem(ID) {
  const SideBarItems = document.querySelectorAll(".side-bar-item");
  SideBarItems.forEach((Item) => {
    if (Item.id === ID) Item.classList.add("hovered");
    else Item.classList.remove("hovered");
  });
}
function FixDirection() {
  const MainStyleSheet = document.getElementById("main-style-sheet");
  switch (UserSettings.CurrentLang) {
    case "en":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "fa":
      MainStyleSheet.href = "Styles/Main/style_rtl.css";
      break;
  }
}
function AppendHTMLElements(Action) {
  if (Action === "AppendCategoryUnfinishedButton") {
    if (DoesElementExist("sort-unfinished")) return;
    const SortBar = document.getElementById("sort-bar");
    const SortUnfinished = document.createElement("button");
    SortUnfinished.className = "sort-buttons";
    SortUnfinished.id = "sort-unfinished";
    SortUnfinished.textContent = Strings.SortUnfinished[UserSettings.CurrentLang];
    SortUnfinished.addEventListener("click", () => {
      CurrentWindow = "Home-Unfinished";
      LoadUnfinishedTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-unfinished");
      DeselectAll();
    });
    SortUnfinished.addEventListener("dragover", (event) => {
      event.preventDefault();
      SortUnfinished.style.backgroundColor = HoverColor[UserSettings.Theme];
      SortUnfinished.style.transform = "scale(1.1)";
    });
    SortUnfinished.addEventListener("dragleave", () => {
      SortUnfinished.style.backgroundColor = "";
      SortUnfinished.style.transform = "";
    });
    SortUnfinished.addEventListener("drop", (event) => {
      SortUnfinished.style.backgroundColor = "";
      SortUnfinished.style.transform = "";
      if (SelectMode) {
        let DragableElements = ReturnSelectedTasks();
        let ValidDragableElements = DragableElements.filter((Task) => {
          return Task.IsTaskTrashed || Task.IsTaskCompleted || Task.IsTaskFailed;
        });
        ValidDragableElements.forEach((Task) => {
          Task.IsTaskFailed = false;
          Task.IsTaskCompleted = false;
          Task.IsTaskTrashed = false;
        });
      } else {
        let DraggedElementID = event.dataTransfer.getData("DragableElementID");
        let DragableElement = AllTasksArray.find((Task) => {
          return Task.ID === DraggedElementID;
        });
        if (!DragableElement.IsTaskTrashed && !DragableElement.IsTaskCompleted && !DragableElement.IsTaskFailed) return false;
        DragableElement.IsTaskFailed = false;
        DragableElement.IsTaskCompleted = false;
        DragableElement.IsTaskTrashed = false;
      }
      localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
      CurrentWindow = "Home-Unfinished";
      LoadUnfinishedTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-unfinished");
      DeselectAll();
    });
    SortBar.append(SortUnfinished);
  }
  if (Action === "AppendSortTodayButton") {
    if (DoesElementExist("sort-today")) return;
    const SortBar = document.getElementById("sort-bar");
    const SortToday = document.createElement("button");
    SortToday.className = "sort-buttons";
    SortToday.id = "sort-today";
    SortToday.textContent = Strings.SortTodayButton[UserSettings.CurrentLang];
    SortToday.addEventListener("click", () => {
      CurrentWindow = "Home-Today";
      LoadTodayTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-today");
      DeselectAll();
    });
    SortToday.addEventListener("dragover", (event) => {
      event.preventDefault();
      SortToday.style.backgroundColor = HoverColor[UserSettings.Theme];
      SortToday.style.transform = "scale(1.1)";
    });
    SortToday.addEventListener("dragleave", () => {
      SortToday.style.backgroundColor = "";
      SortToday.style.transform = "";
    });
    SortToday.addEventListener("drop", (event) => {
      SortToday.style.backgroundColor = "";
      SortToday.style.transform = "";
      if (SelectMode) {
        let DragableElements = ReturnSelectedTasks();
        let ValidDragableElements = DragableElements.filter((Task) => {
          return !Task.IsTaskTrashed && !Task.IsTaskCompleted && !Task.IsTaskFailed;
        });
        ValidDragableElements.forEach((Task) => {
          MoveToToday(Task.ID);
        });
      } else {
        let DraggedElementID = event.dataTransfer.getData("DragableElementID");
        let DragableElement = AllTasksArray.find((Task) => {
          return Task.ID === DraggedElementID;
        });
        if (DragableElement.IsTaskTrashed || DragableElement.IsTaskCompleted || DragableElement.IsTaskFailed) return false;
        MoveToToday(DraggedElementID);
      }
      CurrentWindow = "Home-Today";
      LoadTodayTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-today");
      DeselectAll();
    });
    SortBar.append(SortToday);
  }
  if (Action === "AppendSortTomorrowButton") {
    if (DoesElementExist("sort-tomorrow")) return;
    const SortBar = document.getElementById("sort-bar");
    const SortTomorrow = document.createElement("button");
    SortTomorrow.className = "sort-buttons";
    SortTomorrow.id = "sort-tomorrow";
    SortTomorrow.textContent = Strings.SortTomorrowButton[UserSettings.CurrentLang];
    SortTomorrow.addEventListener("click", () => {
      CurrentWindow = "Home-Tomorrow";
      LoadTomorrowTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-tomorrow");
      DeselectAll();
    });
    SortTomorrow.addEventListener("dragover", (event) => {
      event.preventDefault();
      SortTomorrow.style.backgroundColor = HoverColor[UserSettings.Theme];
      SortTomorrow.style.transform = "scale(1.1)";
    });
    SortTomorrow.addEventListener("dragleave", () => {
      SortTomorrow.style.backgroundColor = "";
      SortTomorrow.style.transform = "";
    });
    SortTomorrow.addEventListener("drop", (event) => {
      SortTomorrow.style.backgroundColor = "";
      SortTomorrow.style.transform = "";
      if (SelectMode) {
        let DragableElements = ReturnSelectedTasks();
        let ValidDragableElements = DragableElements.filter((Task) => {
          return !Task.IsTaskTrashed && !Task.IsTaskCompleted && !Task.IsTaskFailed;
        });
        ValidDragableElements.forEach((Task) => {
          MoveToTomorrow(Task.ID);
        });
      } else {
        let DraggedElementID = event.dataTransfer.getData("DragableElementID");
        let DragableElement = AllTasksArray.find((Task) => {
          return Task.ID === DraggedElementID;
        });
        if (DragableElement.IsTaskTrashed || DragableElement.IsTaskCompleted || DragableElement.IsTaskFailed) return false;
        MoveToTomorrow(DraggedElementID);
      }
      CurrentWindow = "Home-Tomorrow";
      LoadTomorrowTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-tomorrow");
      DeselectAll();
    });
    SortBar.append(SortTomorrow);
  }
  if (Action === "AppendCategorySortIn2DaysButton") {
    if (DoesElementExist("sort-in-2-days")) return;
    const SortBar = document.getElementById("sort-bar");
    const SortIn2Days = document.createElement("button");
    SortIn2Days.className = "sort-buttons";
    SortIn2Days.id = "sort-in-2-days";
    SortIn2Days.textContent = Strings.SortIn2DaysButton[UserSettings.CurrentLang];
    SortIn2Days.addEventListener("click", () => {
      CurrentWindow = "Home-In2Days";
      LoadIn2DaysTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-in-2-days");
      DeselectAll();
    });
    SortIn2Days.addEventListener("dragover", (event) => {
      event.preventDefault();
      SortIn2Days.style.backgroundColor = HoverColor[UserSettings.Theme];
      SortIn2Days.style.transform = "scale(1.1)";
    });
    SortIn2Days.addEventListener("dragleave", () => {
      SortIn2Days.style.backgroundColor = "";
      SortIn2Days.style.transform = "";
    });
    SortIn2Days.addEventListener("drop", (event) => {
      SortIn2Days.style.backgroundColor = "";
      SortIn2Days.style.transform = "";
      if (SelectMode) {
        let DragableElements = ReturnSelectedTasks();
        let ValidDragableElements = DragableElements.filter((Task) => {
          return !Task.IsTaskTrashed && !Task.IsTaskCompleted && !Task.IsTaskFailed;
        });
        ValidDragableElements.forEach((Task) => {
          MoveIn2Days(Task.ID);
        });
      } else {
        let DraggedElementID = event.dataTransfer.getData("DragableElementID");
        let DragableElement = AllTasksArray.find((Task) => {
          return Task.ID === DraggedElementID;
        });
        if (DragableElement.IsTaskTrashed || DragableElement.IsTaskCompleted || DragableElement.IsTaskFailed) return false;
        MoveIn2Days(DraggedElementID);
      }
      CurrentWindow = "Home-In2Days";
      LoadIn2DaysTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-in-2-days");
      DeselectAll();
    });
    SortBar.append(SortIn2Days);
  }
  if (Action === "AppendCategoryFailedButton") {
    if (DoesElementExist("sort-failed")) return;
    const SortBar = document.getElementById("sort-bar");
    const CategoryFailed = document.createElement("button");
    CategoryFailed.className = "sort-buttons";
    CategoryFailed.id = "sort-failed";
    CategoryFailed.textContent = Strings.CategoryFailedButton[UserSettings.CurrentLang];
    CategoryFailed.addEventListener("click", () => {
      CurrentWindow = "Home-Failed";
      LoadFailedTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-failed");
      DeselectAll();
    });
    CategoryFailed.addEventListener("dragover", (event) => {
      event.preventDefault();
      CategoryFailed.style.backgroundColor = HoverColor[UserSettings.Theme];
      CategoryFailed.style.transform = "scale(1.1)";
    });
    CategoryFailed.addEventListener("dragleave", () => {
      CategoryFailed.style.backgroundColor = "";
      CategoryFailed.style.transform = "";
    });
    CategoryFailed.addEventListener("drop", (event) => {
      CategoryFailed.style.backgroundColor = "";
      CategoryFailed.style.transform = "";
      if (SelectMode) {
        let DragableElements = ReturnSelectedTasks();
        let ValidDragableElements = DragableElements.filter((Task) => {
          return !Task.IsTaskTrashed && !Task.IsTaskFailed;
        });
        ValidDragableElements.forEach((Task) => {
          FailTask(Task.ID);
        });
      } else {
        let DraggedElementID = event.dataTransfer.getData("DragableElementID");
        let DragableElement = AllTasksArray.find((Task) => {
          return Task.ID === DraggedElementID;
        });
        if (DragableElement.IsTaskTrashed || DragableElement.IsTaskFailed) return false;
        FailTask(DraggedElementID);
      }
      CurrentWindow = "Home-Failed";
      LoadFailedTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-failed");
      DeselectAll();
    });
    SortBar.append(CategoryFailed);
  }
  if (Action === "AppendCategoryCompletedButton") {
    if (DoesElementExist("sort-completed")) return;
    const SortBar = document.getElementById("sort-bar");
    const CategoryCompleted = document.createElement("button");
    CategoryCompleted.className = "sort-buttons";
    CategoryCompleted.id = "sort-completed";
    CategoryCompleted.textContent = Strings.CategoryCompletedButton[UserSettings.CurrentLang];
    CategoryCompleted.addEventListener("click", () => {
      CurrentWindow = "Home-Completed";
      LoadCompletedTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-completed");
      DeselectAll();
    });
    CategoryCompleted.addEventListener("dragover", (event) => {
      event.preventDefault();
      CategoryCompleted.style.backgroundColor = HoverColor[UserSettings.Theme];
      CategoryCompleted.style.transform = "scale(1.1)";
    });
    CategoryCompleted.addEventListener("dragleave", () => {
      CategoryCompleted.style.backgroundColor = "";
      CategoryCompleted.style.transform = "";
    });
    CategoryCompleted.addEventListener("drop", (event) => {
      CategoryCompleted.style.backgroundColor = "";
      CategoryCompleted.style.transform = "";
      if (SelectMode) {
        let DragableElements = ReturnSelectedTasks();
        let ValidDragableElements = DragableElements.filter((Task) => {
          return !Task.IsTaskTrashed && !Task.IsTaskFailed && !Task.IsTaskCompleted;
        });
        ValidDragableElements.forEach((Task) => {
          CompleteTask(Task.ID);
        });
      } else {
        let DraggedElementID = event.dataTransfer.getData("DragableElementID");
        let DragableElement = AllTasksArray.find((Task) => {
          return Task.ID === DraggedElementID;
        });
        if (DragableElement.IsTaskTrashed || DragableElement.IsTaskFailed || DragableElement.IsTaskCompleted) return false;
        CompleteTask(DraggedElementID);
      }
      CurrentWindow = "Home-Completed";
      LoadCompletedTasks();
      ToggleSelectMode();
      HighLightSelectedSortButton("sort-completed");
      DeselectAll();
    });
    SortBar.append(CategoryCompleted);
  }
  if (Action === "AppendAllCategories") {
    AppendHTMLElements("AppendCategoryUnfinishedButton");
    AppendHTMLElements("AppendSortTodayButton");
    AppendHTMLElements("AppendSortTomorrowButton");
    AppendHTMLElements("AppendCategorySortIn2DaysButton");
    AppendHTMLElements("AppendCategoryFailedButton");
    AppendHTMLElements("AppendCategoryCompletedButton");
  }
}
function AppendTopBar() {
  if (DoesElementExist("top-bar")) return;
  const TopBar = document.createElement("section");
  TopBar.id = "top-bar";
  document.body.append(TopBar);
  const DisplayText = document.createElement("section");
  DisplayText.id = "display-text";
  TopBar.append(DisplayText);
}
function AppendTaskBar() {
  if (DoesElementExist("task-bar")) return;
  const UserCategoryPage = document.getElementById("user-category-page");
  const TrashBinSection = document.getElementById("trash-bin-section");
  const TasksSection = document.getElementById("tasks-section");
  const TaskBar = document.createElement("section");
  TaskBar.id = "task-bar";
  const SortBar = document.createElement("section");
  SortBar.id = "sort-bar";
  TaskBar.append(SortBar);
  if (CurrentWindow.includes("UserCategory")) UserCategoryPage.append(TaskBar);
  if (CurrentWindow.includes("Trash")) TrashBinSection.append(TaskBar);
  if (CurrentWindow.includes("Home")) TasksSection.append(TaskBar);
}
function AppendTaskSection() {
  if (DoesElementExist("tasks-section")) return;
  const TaskSection = document.createElement("section");
  const ListSection = document.createElement("section");
  TaskSection.id = "tasks-section";
  ListSection.id = "list-section";
  TaskSection.append(ListSection);
  document.body.append(TaskSection);
}
function AppendSelectAllSection() {
  if (DoesElementExist("select-all-section")) return;
  const TaskBar = document.getElementById("task-bar");
  const SelectAllSection = document.createElement("section");
  SelectAllSection.id = "select-all-section";
  const SpanElement = document.createElement("span");
  SpanElement.textContent = Strings.SelectAllCheckBox[UserSettings.CurrentLang];
  const CheckBoxLable = document.createElement("label");
  CheckBoxLable.className = "checkbox-container";
  const CheckBox = document.createElement("input");
  CheckBox.type = "checkbox";
  CheckBox.id = "select-all-checkbox";
  CheckBox.className = "checkbox";
  const Checkmark = document.createElement("div");
  Checkmark.className = "checkmark";
  CheckBoxLable.append(CheckBox, Checkmark);
  SelectAllSection.append(SpanElement, CheckBoxLable);
  CheckBox.addEventListener("change", (Event) => {
    if (Event.target.checked) SelectAll();
    else DeselectAll();
  });
  TaskBar.append(SelectAllSection);
}
function AppendSideBar() {
  if (DoesElementExist("side-bar")) return;
  // Defining Items (buttons)
  const SideBar = document.createElement("aside");
  SideBar.id = "side-bar";
  // Home button
  const HomeButton = document.createElement("button");
  HomeButton.id = "home-button";
  HomeButton.className = "side-bar-item";
  const HomeButtonIcon = document.createElement("img");
  HomeButtonIcon.className = "side-bar-item-icon";
  HomeButtonIcon.src = IconsSrc.HomeIcon[UserSettings.Theme];
  const HomeButtonText = document.createElement("span");
  HomeButtonText.id = "home-button-text";
  HomeButtonText.className = "side-bar-item-text";
  HomeButtonText.innerText = Strings.HomeButton[UserSettings.CurrentLang];
  HomeButton.addEventListener("click", () => {
    HighLightSelectedSideBarItem(HomeButton.id);
    DisplayHome();
  });
  HomeButton.append(HomeButtonIcon, HomeButtonText);
  // New task button
  const NewTaskButton = document.createElement("button");
  NewTaskButton.id = "new-task-button";
  NewTaskButton.className = "side-bar-item";
  const NewTaskButtonIcon = document.createElement("img");
  NewTaskButtonIcon.className = "side-bar-item-icon";
  const NewTaskButtonText = document.createElement("span");
  NewTaskButtonIcon.src = IconsSrc.NewTaskIcon[UserSettings.Theme];
  NewTaskButtonText.className = "side-bar-item-text";
  NewTaskButtonText.id = "new-task-button-text";
  NewTaskButtonText.innerText = Strings.NewTaskButton[UserSettings.CurrentLang];
  NewTaskButton.addEventListener("click", NewTaskModal);
  NewTaskButton.append(NewTaskButtonIcon, NewTaskButtonText);
  // New Category Button
  const NewCategoryButton = document.createElement("button");
  NewCategoryButton.id = "new-category-button";
  NewCategoryButton.className = "side-bar-item";
  NewCategoryButton.addEventListener("click", NewCategoryModal);
  const NewCategoryButtonIcon = document.createElement("img");
  NewCategoryButtonIcon.className = "side-bar-item-icon";
  NewCategoryButtonIcon.src = IconsSrc.NewCategoryIcon[UserSettings.Theme];
  const NewCategoryButtonText = document.createElement("span");
  NewCategoryButtonText.id = "new-category-button-text";
  NewCategoryButtonText.className = "side-bar-item-text";
  NewCategoryButtonText.innerText = Strings.NewCategoryButton[UserSettings.CurrentLang];
  NewCategoryButton.append(NewCategoryButtonIcon, NewCategoryButtonText);
  // Calendar Button
  const Calendar = document.createElement("button");
  Calendar.id = "calendar-button";
  Calendar.className = "side-bar-item";
  Calendar.addEventListener("click", () => {
    HighLightSelectedSideBarItem(Calendar.id);
  });
  const CalendarIcon = document.createElement("img");
  CalendarIcon.className = "side-bar-item-icon";
  CalendarIcon.src = IconsSrc.CalendarIcon[UserSettings.Theme];
  const CalendarText = document.createElement("span");
  CalendarText.id = "calendar-button-text";
  CalendarText.className = "side-bar-item-text";
  CalendarText.innerText = Strings.CalendarButton[UserSettings.CurrentLang];
  Calendar.append(CalendarIcon, CalendarText);
  // Notes Button
  const Notes = document.createElement("button");
  Notes.id = "notes-button";
  Notes.className = "side-bar-item";
  Notes.addEventListener("click", () => {
    HighLightSelectedSideBarItem(Notes.id);
  });
  const NotesIcon = document.createElement("img");
  NotesIcon.className = "side-bar-item-icon";
  NotesIcon.src = IconsSrc.MyNotesIcon[UserSettings.Theme];
  const NotesText = document.createElement("span");
  NotesText.id = "notes-button-text";
  NotesText.className = "side-bar-item-text";
  NotesText.innerText = Strings.NotesButton[UserSettings.CurrentLang];
  Notes.append(NotesIcon, NotesText);
  // Alarms Button
  const Alarms = document.createElement("button");
  Alarms.id = "alarms-button";
  Alarms.className = "side-bar-item";
  Alarms.addEventListener("click", () => {
    HighLightSelectedSideBarItem(Alarms.id);
  });
  const AlarmsIcon = document.createElement("img");
  AlarmsIcon.className = "side-bar-item-icon";
  AlarmsIcon.src = IconsSrc.MyAlarmsIcon[UserSettings.Theme];
  const AlarmsText = document.createElement("span");
  AlarmsText.id = "alarms-button-text";
  AlarmsText.className = "side-bar-item-text";
  AlarmsText.innerText = Strings.AlarmsButton[UserSettings.CurrentLang];
  Alarms.append(AlarmsIcon, AlarmsText);
  // Trash Bin Button
  const TrashBin = document.createElement("button");
  TrashBin.id = "trash-bin-button";
  TrashBin.className = "side-bar-item";
  TrashBin.addEventListener("click", () => {
    HighLightSelectedSideBarItem(TrashBin.id);
    DisplayTrashBin();
  });
  TrashBin.addEventListener("dragover", (event) => {
    event.preventDefault();
    TrashBin.style.backgroundColor = HoverColor[UserSettings.Theme];
    TrashBin.style.transform = "scale(1.1)";
  });
  TrashBin.addEventListener("dragleave", () => {
    TrashBin.style.backgroundColor = "";
    TrashBin.style.transform = "";
  });
  TrashBin.addEventListener("drop", (event) => {
    TrashBin.style.backgroundColor = "";
    TrashBin.style.transform = "";
    if (SelectMode) {
      let DragableElements = ReturnSelectedTasks();
      let ValidDragableElements = DragableElements.filter((Task) => {
        return !Task.IsTaskTrashed;
      });
      ValidDragableElements.forEach((Task) => {
        MoveToTrash(Task.ID);
      });
    } else {
      let DraggedElementID = event.dataTransfer.getData("DragableElementID");
      let DragableElement = AllTasksArray.find((Task) => {
        return Task.ID === DraggedElementID;
      });
      if (DragableElement.IsTaskTrashed) return false;
      MoveToTrash(DraggedElementID);
    }
  });
  const TrashBinIcon = document.createElement("img");
  TrashBinIcon.className = "side-bar-item-icon";
  TrashBinIcon.src = IconsSrc.TrashIcon[UserSettings.Theme];
  const TrashBinText = document.createElement("span");
  TrashBinText.id = "trash-bin-button-text";
  TrashBinText.className = "side-bar-item-text";
  TrashBinText.innerText = Strings.TrashBinButton[UserSettings.CurrentLang];
  TrashBin.append(TrashBinIcon, TrashBinText);
  // Settings Button
  const SettingsButton = document.createElement("button");
  SettingsButton.id = "settings-button";
  SettingsButton.className = "side-bar-item";
  SettingsButton.addEventListener("click", () => {
    DisplaySettings();
  });
  const SettingsButtonIcon = document.createElement("img");
  SettingsButtonIcon.className = "side-bar-item-icon";
  SettingsButtonIcon.src = IconsSrc.SettingsIcon[UserSettings.Theme];
  const SettingsButtonText = document.createElement("span");
  SettingsButtonText.id = "settings-button-text";
  SettingsButtonText.className = "side-bar-item-text";
  SettingsButtonText.innerText = Strings.SettingsButton[UserSettings.CurrentLang];
  SettingsButton.append(SettingsButtonIcon, SettingsButtonText);
  // User Category Container
  const UserCategoryContainer = document.createElement("div");
  UserCategoryContainer.id = "user-category-container";
  // Clock Section
  const Clock = document.createElement("div");
  Clock.id = "clock";
  const TimeIcon = document.createElement("img");
  TimeIcon.id = "time-icon";
  const Time = document.createElement("span");
  Time.id = "time";
  Time.setAttribute("inert", "");
  const FullDate = document.createElement("span");
  FullDate.id = "full-date";
  FullDate.setAttribute("inert", "");
  Clock.append(TimeIcon, Time);
  // Footer Section
  const SideBarFooter = document.createElement("div");
  SideBarFooter.id = "side-bar-footer";
  SideBarFooter.append(SettingsButton);
  // Appending elements to DOM
  SideBar.append(
    Clock,
    FullDate,
    HomeButton,
    NewTaskButton,
    NewCategoryButton,
    Calendar,
    Notes,
    Alarms,
    TrashBin,
    UserCategoryContainer,
    SideBarFooter
  );
  // Appending SideBar to DOM
  document.body.append(SideBar);
}
function AppendSearchBar() {
  if (DoesElementExist("search-bar")) return;
  const TaskBar = document.getElementById("task-bar");
  const SearchBar = document.createElement("input");
  SearchBar.id = "search-bar";
  SearchBar.placeholder = Strings.Search[UserSettings.CurrentLang];
  SearchBar.addEventListener("input", () => {
    Search(SearchBar.value);
  });
  TaskBar.append(SearchBar);
}
// Appens all the task containers including normal/failed/completed/trashed
function AppendTaskContainer(Tasks) {
  const ListSection = document.getElementById("list-section");
  let FragmentOfTaskContainers = document.createDocumentFragment();
  Tasks.forEach((Task) => {
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
    TaskContainer.append(CheckBoxContainer, TaskTitle, DateContainer);
    CheckBoxContainer.append(Checkbox, CheckMark);
    DateContainer.append(TaskDate, TaskTime);
    if (ReturnTaskState(Task.ID) === "Unfinished") {
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Normal");
      });
    }
    if (ReturnTaskState(Task.ID) === "Failed") {
      const FailedTaskBadge = document.createElement("span");
      FailedTaskBadge.className = "failed-task-badge";
      FailedTaskBadge.innerHTML = Strings.FailedTaskBadge[UserSettings.CurrentLang];
      FailedTaskBadge.setAttribute("inert", "");
      TaskContainer.append(FailedTaskBadge);
      //
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Failed");
      });
    }
    if (ReturnTaskState(Task.ID) === "Completed") {
      const CompletedTaskBadge = document.createElement("span");
      CompletedTaskBadge.className = "completed-task-badge";
      CompletedTaskBadge.innerHTML = Strings.CompletedTaskBadge[UserSettings.CurrentLang];
      CompletedTaskBadge.setAttribute("inert", "");
      TaskContainer.append(CompletedTaskBadge);
      //
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Completed");
      });
    }
    if (ReturnTaskState(Task.ID) === "Trashed") {
      const TrashedTaskBadge = document.createElement("span");
      TrashedTaskBadge.className = "trashed-task-badge";
      TrashedTaskBadge.innerHTML = Strings.TrashedTaskBadge[UserSettings.CurrentLang];
      TrashedTaskBadge.setAttribute("inert", "");
      TaskContainer.append(TrashedTaskBadge);
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Trashed");
      });
    }
    if (Task.UserCategory !== "None" && ReturnTaskState(Task.ID) === "Unfinished") {
      let Color, Name, Icon;
      UserCategoriesArray.forEach((Category) => {
        if (Category.ID !== Task.UserCategory) return;
        Color = Category.Color;
        Name = Category.Name;
        Icon = Category.Icon;
      });
      const CategoryBadge = document.createElement("section");
      const CategoryBadgeName = document.createElement("span");
      const CategoryBadgeIcon = document.createElement("img");
      CategoryBadge.className = "category-badge";
      CategoryBadgeName.className = "category-badge-name";
      CategoryBadgeIcon.className = "category-badge-icon";
      CategoryBadge.style.backgroundColor = Color;
      CategoryBadge.setAttribute("inert", "");
      CategoryBadgeName.innerText = Name;
      CategoryBadgeIcon.src = Icon;
      CategoryBadge.append(CategoryBadgeIcon, CategoryBadgeName);
      TaskContainer.append(CategoryBadge);
    }
    TaskContainer.addEventListener("click", (Event) => {
      if (!SelectMode || !Event.target.id.includes("Task")) return;
      let Task = AllTasksArray[FindIndexOfTask(Event.target.id)];
      let TaskID = Event.target.id;
      if (Task.Selected) {
        DeSelectTask(TaskID);
      } else {
        SelectTask(TaskID);
      }
    });
    TaskContainer.addEventListener("dblclick", (Event) => {
      let TaskID = Event.target.id;
      if (!SelectMode) SelectTask(TaskID);
    });
    TaskContainer.addEventListener("dragstart", (Event) => {
      Event.dataTransfer.setData("DragableElementID", Event.target.id);
    });
    TaskContainer.addEventListener("mouseover", (Event) => {
      if (SelectMode) Event.target.style.cursor = "pointer";
      else Event.target.style.cursor = "";
    });

    if (Task.IsTaskPinned) {
      const PinBadge = document.createElement("img");
      PinBadge.className = "pinned-task-badge";
      PinBadge.inert = "true";
      PinBadge.src = IconsSrc.PaperClipIcon[UserSettings.Theme];
      TaskContainer.append(PinBadge);
    }
    TaskTitle.textContent = Task.Title;
    TaskDate.textContent = Task.DisplayDate;
    TaskTime.textContent = Task.DisplayTime;
    FragmentOfTaskContainers.append(TaskContainer);
  });
  ListSection.append(FragmentOfTaskContainers);
}
function ClearListSection() {
  let ListSection = document.getElementById("list-section");
  if (!ListSection) return;
  ListSection.innerHTML = "";
  ListSection.style = "";
}
function EmptyBox(Text) {
  const ListSection = document.getElementById("list-section");
  const EmptyBoxIconContainer = document.createElement("section");
  EmptyBoxIconContainer.id = "empty-box-container";
  // Empty box icon
  const EmptyBoxIcon = document.createElement("img");
  EmptyBoxIcon.src = IconsSrc.EmptyBoxIcon[UserSettings.Theme];
  // Empty box text
  const EmptyBoxText = document.createElement("p");
  EmptyBoxText.id = "empty-box-text";
  EmptyBoxText.innerText = Text;
  // Modifing List Section
  ClearListSection();
  ListSection.style.display = "flex";
  ListSection.style.alignItems = "center";
  ListSection.style.justifyContent = "center";
  // Appending to DOM
  EmptyBoxIconContainer.append(EmptyBoxIcon, EmptyBoxText);
  ListSection.append(EmptyBoxIconContainer);
}
function DisplayHome() {
  const TrashBinSection = document.getElementById("trash-bin-section");
  const UserCategoryPage = document.getElementById("user-category-page");
  if (DoesElementExist("settings-container")) HideSettings();
  if (CurrentWindow.includes("Trash")) TrashBinSection.remove();
  if (CurrentWindow.includes("UserCategory")) {
    UserCategoryPage.remove();
    SelectedUserCategory = "";
  }
  CurrentWindow = "Home-Unfinished";
  AppendTaskSection();
  AppendTaskBar();
  AppendSelectAllSection();
  AppendHTMLElements("AppendAllCategories");
  AppendSearchBar();
  UpdateInbox();
  HighLightSelectedSideBarItem("home-button");
  HighLightSelectedSortButton("sort-unfinished");
}
function ScrollRight(ID) {
  const Target = document.getElementById(ID);
  Target.scrollLeft += 100;
}
function ScrollLeft(ID) {
  const Target = document.getElementById(ID);
  Target.scrollLeft -= 100;
}
function HighLightSelectedSortButton(ID) {
  const SortButton = document.querySelectorAll(".sort-buttons");
  SortButton.forEach((Button) => {
    if (Button.id === ID) Button.classList.add("hovered");
    else Button.classList.remove("hovered");
  });
}
function DisplaySelectModeBar() {
  if (DoesElementExist("select-bar")) {
    const SelectedItemsElem = document.getElementById("selected-items");
    SelectedItemsElem.innerText = `${ReturnSelectedTasks().length} ${Strings.ItemsSelected[UserSettings.CurrentLang]}`;
    return;
  }
  const ListSection = document.getElementById("list-section");
  ListSection.classList.add("padding-bottom");
  const SelectBar = document.createElement("div");
  const SelectedItemsElem = document.createElement("span");
  const ExistSelectModeButton = document.createElement("button");
  const DeleteButton = document.createElement("button");
  const MoveToTrashButton = document.createElement("button");
  const FailButton = document.createElement("button");
  const CompleteButton = document.createElement("button");
  const RestoreButton = document.createElement("button");
  // ID
  SelectBar.id = "select-bar";
  SelectedItemsElem.id = "selected-items";
  ExistSelectModeButton.id = "exit-select-mode-btn";
  // Class
  DeleteButton.className = "select-bar-task-btn";
  MoveToTrashButton.className = "select-bar-task-btn";
  FailButton.className = "select-bar-task-btn";
  CompleteButton.className = "select-bar-task-btn";
  RestoreButton.className = "select-bar-task-btn";
  ListSection.classList.add("padding-bottom");
  //InnerHTML
  SelectedItemsElem.innerText = `${ReturnSelectedTasks().length} ${Strings.ItemsSelected[UserSettings.CurrentLang]}`;
  ExistSelectModeButton.innerText = Strings.DeSelect[UserSettings.CurrentLang];
  DeleteButton.innerText = Strings.Delete[UserSettings.CurrentLang];
  MoveToTrashButton.innerText = Strings.MoveToTrash[UserSettings.CurrentLang];
  FailButton.innerText = Strings.FailTask[UserSettings.CurrentLang];
  CompleteButton.innerText = Strings.CompleteTask[UserSettings.CurrentLang];
  RestoreButton.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
  // Event listener
  ExistSelectModeButton.addEventListener("click", DeselectAll);
  MoveToTrashButton.addEventListener("click", MoveToTrash);
  FailButton.addEventListener("click", FailTask);
  CompleteButton.addEventListener("click", CompleteTask);
  // Append
  SelectBar.append(ExistSelectModeButton, SelectedItemsElem, DeleteButton);
  switch (CurrentWindow) {
    case "Trash-All":
    case "Trash-Today":
    case "Trash-Tomorrow":
    case "Trash-In2Days":
      SelectBar.append(RestoreButton);
      RestoreButton.addEventListener("click", RestoreFromTrash);
      DeleteButton.addEventListener("click", () => {
        DeleteModal("Trashed");
      });
      break;
    case "Home-Unfinished":
    case "Home-Today":
    case "Home-Tomorrow":
    case "Home-In2Days":
    case "UserCategory-Unfinished":
    case "UserCategory-Today":
    case "UserCategory-Tomorrow":
    case "UserCategory-In2Days":
      SelectBar.append(MoveToTrashButton, FailButton, CompleteButton);
      DeleteButton.addEventListener("click", () => {
        DeleteModal("Normal");
      });
      break;
    case "Home-Failed":
      SelectBar.append(MoveToTrashButton, RestoreButton);
      RestoreButton.addEventListener("click", RestoreFromFailed);
      DeleteButton.addEventListener("click", () => {
        DeleteModal("Failed");
      });
      break;
    case "Home-Completed":
      SelectBar.append(MoveToTrashButton, FailButton, RestoreButton);
      RestoreButton.addEventListener("click", RestoreFromCompleted);
      DeleteButton.addEventListener("click", () => {
        DeleteModal("Completed");
      });
      break;
  } //Append
  document.body.append(SelectBar);
}
function HideSelectModeBar() {
  const SelectBar = document.getElementById("select-bar");
  const ListSection = document.getElementById("list-section");
  if (SelectBar) SelectBar.remove();
  if (ListSection) ListSection.classList.remove("padding-bottom");
}
