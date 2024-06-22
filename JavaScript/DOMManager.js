// Sort buttons
function ReturnSortAllBtn() {
  const SortAllTrash = document.createElement("button");
  // Id and Class
  SortAllTrash.className = "sort-buttons text";
  SortAllTrash.id = "sort-all-trash";
  // Innertext and other properties
  SortAllTrash.textContent = Strings.SortAllTrash[UserSettings.CurrentLang];
  // Events
  SortAllTrash.addEventListener("click", () => {
    ChangeWindow("Trash-All");
    HighLightSelectedSortButton("sort-all-trash");
  });
  // Final
  return SortAllTrash;
}
function ReturnSortUnfinishedBtn(TargetWindow) {
  const SortUnfinished = document.createElement("button");
  SortUnfinished.className = "sort-buttons text";
  SortUnfinished.id = "sort-unfinished";
  SortUnfinished.textContent = Strings.SortUnfinished[UserSettings.CurrentLang];
  SortUnfinished.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Unfinished`);
    HighLightSelectedSortButton("sort-unfinished");
  });
  SortUnfinished.addEventListener("dragover", (Event) => {
    Event.preventDefault();
    SortUnfinished.style.backgroundColor = HoverColor[UserSettings.Theme];
    SortUnfinished.style.transform = "scale(1.1)";
  });
  SortUnfinished.addEventListener("dragleave", () => {
    SortUnfinished.style.backgroundColor = "";
    SortUnfinished.style.transform = "";
  });
  SortUnfinished.addEventListener("drop", (Event) => {
    SortUnfinished.style.backgroundColor = "";
    SortUnfinished.style.transform = "";
    if (AppObj.SelectMode) {
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
      let DraggedElementID = Event.dataTransfer.getData("DragableElementID");
      let DragableElement = AllTasksArray.find((Task) => {
        return Task.ID === DraggedElementID;
      });
      if (!DragableElement.IsTaskTrashed && !DragableElement.IsTaskCompleted && !DragableElement.IsTaskFailed) return false;
      DragableElement.IsTaskFailed = false;
      DragableElement.IsTaskCompleted = false;
      DragableElement.IsTaskTrashed = false;
    }
    SaveAll();
    ChangeWindow(`${TargetWindow}-Unfinished`);
    HighLightSelectedSortButton("sort-unfinished");
  });
  return SortUnfinished;
}
function ReturnSortTodayBtn(TargetWindow) {
  const SortToday = document.createElement("button");
  SortToday.className = "sort-buttons text";
  SortToday.id = "sort-today";
  SortToday.textContent = Strings.SortTodayButton[UserSettings.CurrentLang];
  SortToday.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Today`);
    HighLightSelectedSortButton("sort-today");
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
    if (AppObj.SelectMode) {
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
    ChangeWindow(`${TargetWindow}-Today`);
    HighLightSelectedSortButton("sort-today");
  });
  return SortToday;
}
function ReturnSortTomorrowBtn(TargetWindow) {
  const SortTomorrow = document.createElement("button");
  SortTomorrow.className = "sort-buttons text";
  SortTomorrow.id = "sort-tomorrow";
  SortTomorrow.textContent = Strings.SortTomorrowButton[UserSettings.CurrentLang];
  SortTomorrow.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Tomorrow`);
    HighLightSelectedSortButton("sort-tomorrow");
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
    if (AppObj.SelectMode) {
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
    ChangeWindow(`${TargetWindow}-Tomorrow`);
    HighLightSelectedSortButton("sort-tomorrow");
  });
  return SortTomorrow;
}
function ReturnSortIn2DaysBtn(TargetWindow) {
  const SortIn2Days = document.createElement("button");
  SortIn2Days.className = "sort-buttons text";
  SortIn2Days.id = "sort-in-2-days";
  SortIn2Days.textContent = Strings.SortIn2DaysButton[UserSettings.CurrentLang];
  SortIn2Days.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-In2Days`);
    HighLightSelectedSortButton("sort-in-2-days");
  });
  SortIn2Days.addEventListener("dragover", (Event) => {
    Event.preventDefault();
    SortIn2Days.style.backgroundColor = HoverColor[UserSettings.Theme];
    SortIn2Days.style.transform = "scale(1.1)";
  });
  SortIn2Days.addEventListener("dragleave", () => {
    SortIn2Days.style.backgroundColor = "";
    SortIn2Days.style.transform = "";
  });
  SortIn2Days.addEventListener("drop", (Event) => {
    SortIn2Days.style.backgroundColor = "";
    SortIn2Days.style.transform = "";
    if (AppObj.SelectMode) {
      let DragableElements = ReturnSelectedTasks();
      let ValidDragableElements = DragableElements.filter((Task) => {
        return !Task.IsTaskTrashed && !Task.IsTaskCompleted && !Task.IsTaskFailed;
      });
      ValidDragableElements.forEach((Task) => {
        MoveIn2Days(Task.ID);
      });
    } else {
      let DraggedElementID = Event.dataTransfer.getData("DragableElementID");
      let DragableElement = AllTasksArray.find((Task) => {
        return Task.ID === DraggedElementID;
      });
      if (DragableElement.IsTaskTrashed || DragableElement.IsTaskCompleted || DragableElement.IsTaskFailed) return false;
      MoveIn2Days(DraggedElementID);
    }
    ChangeWindow(`${TargetWindow}-In2Days`);
    HighLightSelectedSortButton("sort-in-2-days");
  });
  return SortIn2Days;
}
function ReturnSortCompletedBtn(TargetWindow) {
  const SortCompleted = document.createElement("button");
  SortCompleted.className = "sort-buttons text";
  SortCompleted.id = "sort-completed";
  SortCompleted.textContent = Strings.CategoryCompletedButton[UserSettings.CurrentLang];
  SortCompleted.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Completed`);
    HighLightSelectedSortButton("sort-completed");
  });
  SortCompleted.addEventListener("dragover", (event) => {
    event.preventDefault();
    SortCompleted.style.backgroundColor = HoverColor[UserSettings.Theme];
    SortCompleted.style.transform = "scale(1.1)";
  });
  SortCompleted.addEventListener("dragleave", () => {
    SortCompleted.style.backgroundColor = "";
    SortCompleted.style.transform = "";
  });
  SortCompleted.addEventListener("drop", (event) => {
    SortCompleted.style.backgroundColor = "";
    SortCompleted.style.transform = "";
    if (AppObj.SelectMode) {
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
    ChangeWindow(`${TargetWindow}-Completed`);
    HighLightSelectedSortButton("sort-completed");
  });
  return SortCompleted;
}
function ReturnSortFailedBtn(TargetWindow) {
  const SortFailed = document.createElement("button");
  SortFailed.className = "sort-buttons text";
  SortFailed.id = "sort-failed";
  SortFailed.textContent = Strings.CategoryFailedButton[UserSettings.CurrentLang];
  SortFailed.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Failed`);
    HighLightSelectedSortButton("sort-failed");
  });
  SortFailed.addEventListener("dragover", (event) => {
    event.preventDefault();
    SortFailed.style.backgroundColor = HoverColor[UserSettings.Theme];
    SortFailed.style.transform = "scale(1.1)";
  });
  SortFailed.addEventListener("dragleave", () => {
    SortFailed.style.backgroundColor = "";
    SortFailed.style.transform = "";
  });
  SortFailed.addEventListener("drop", (event) => {
    SortFailed.style.backgroundColor = "";
    SortFailed.style.transform = "";
    if (AppObj.SelectMode) {
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
    ChangeWindow(`${TargetWindow}-Failed`);
    HighLightSelectedSortButton("sort-failed");
  });
  return SortFailed;
}
// App components
function ReturnTopBar() {
  // Define
  const TopBar = document.createElement("section");
  const DisplayText = document.createElement("section");
  // ID & Class
  TopBar.className = "top-bar";
  DisplayText.className = "display-text text";
  // Final
  TopBar.append(DisplayText);
  return TopBar;
}
function ReturnTaskBar(Type) {
  const TaskBar = document.createElement("section");
  const SelectAllSection = document.createElement("section");
  const SpanElement = document.createElement("span");
  const CheckBoxLable = document.createElement("label");
  const CheckBox = document.createElement("input");
  const Checkmark = document.createElement("div");
  const SearchBar = document.createElement("input");
  let SortBar;
  // Id and Class
  TaskBar.className = "task-bar";
  SelectAllSection.className = "select-all-section";
  CheckBoxLable.className = "checkbox-container";
  CheckBox.className = "select-all-checkbox checkbox";
  Checkmark.className = "checkmark";
  SpanElement.className = "text";
  SearchBar.className = "search-bar text";
  // InnerText and other properties
  SpanElement.textContent = Strings.SelectAllCheckBox[UserSettings.CurrentLang];
  CheckBox.type = "checkbox";
  SearchBar.placeholder = Strings.Search[UserSettings.CurrentLang];
  //Events
  CheckBox.addEventListener("change", (Event) => {
    if (Event.target.checked) SelectAll();
    else DeSelectAll();
  });
  SearchBar.addEventListener("input", () => Search(SearchBar.value));
  // Final
  switch (Type) {
    case "Home":
      SortBar = ReturnHomeWindowSortBar();
      break;
    case "Trash":
      SortBar = ReturnTrashBinSortBar();
      break;
    case "UserCategory":
      SortBar = ReturnUserCategorySortBar("UserCategory");
      break;
    default:
      "";
  }
  CheckBoxLable.append(CheckBox, Checkmark);
  SelectAllSection.append(CheckBoxLable, SpanElement);
  TaskBar.append(SortBar, SelectAllSection, SearchBar);
  return TaskBar;
}
function ReturnUserCategorise() {
  // Appending UGC buttons to sidebar
  if (!CheckForSave("UserCategories")) return "";
  const UGCFragment = document.createDocumentFragment();
  UserCategoriesArray.forEach((Category) => {
    const UserCategoryButton = document.createElement("button");
    const UserCategoryIcon = document.createElement("img");
    const UserCategoryName = document.createElement("span");
    // Class and ID
    UserCategoryButton.className = "user-category-item";
    UserCategoryIcon.className = "user-category-icon icon";
    UserCategoryName.className = "user-category-name text";
    UserCategoryButton.id = Category.ID;
    UserCategoryName.innerText = Category.Name;
    UserCategoryIcon.src = Category.Icon;
    // Other properties
    UserCategoryName.setAttribute("inert", "");
    UserCategoryIcon.setAttribute("inert", "");
    UserCategoryButton.style.backgroundColor = Category.Color;
    // Events
    UserCategoryButton.addEventListener("click", () => {
      AppObj.SelectedUserCategory = Category.ID;
      DisplayUserCategoryWindow(Category.ID);
    });
    UserCategoryButton.addEventListener("contextmenu", (Event) => {
      Event.preventDefault();
      DisplayUserCategoryContextMenu(Event);
    });
    // Final
    UserCategoryButton.append(UserCategoryIcon, UserCategoryName);
    UGCFragment.append(UserCategoryButton);
  });
  return UGCFragment;
}
function ReturnSidebar() {
  // Defining Items (buttons)
  const SideBar = document.createElement("aside");
  SideBar.className = "side-bar";
  // Home button
  const HomeButton = document.createElement("button");
  const HomeButtonIcon = document.createElement("img");
  const HomeButtonText = document.createElement("span");

  HomeButton.className = "home-button side-bar-item";
  HomeButtonIcon.className = "side-bar-item-icon icon";
  HomeButtonText.className = "side-bar-item-text text";

  HomeButtonIcon.src = "../Icons/home-line.svg";
  HomeButtonText.innerText = Strings.HomeButton[UserSettings.CurrentLang];
  HomeButton.addEventListener("click", DisplayHomeWindow);
  HomeButton.append(HomeButtonIcon, HomeButtonText);
  // New task button
  const NewTaskButton = document.createElement("button");
  const NewTaskButtonIcon = document.createElement("img");
  const NewTaskButtonText = document.createElement("span");

  NewTaskButton.className = "new-task-button side-bar-item";
  NewTaskButtonIcon.className = "side-bar-item-icon icon";
  NewTaskButtonText.className = "side-bar-item-text text";

  NewTaskButtonIcon.src = "../Icons/task-line.svg";
  NewTaskButtonText.innerText = Strings.NewTaskButton[UserSettings.CurrentLang];

  NewTaskButton.addEventListener("click", NewTaskModal);
  NewTaskButton.append(NewTaskButtonIcon, NewTaskButtonText);
  // New Category Button
  const NewCategoryButton = document.createElement("button");
  const NewCategoryButtonIcon = document.createElement("img");
  const NewCategoryButtonText = document.createElement("span");

  NewCategoryButton.className = "new-category-button side-bar-item";
  NewCategoryButtonIcon.className = "side-bar-item-icon icon";
  NewCategoryButtonText.className = "side-bar-item-text text";

  NewCategoryButton.addEventListener("click", NewCategoryModal);
  NewCategoryButtonIcon.src = "../Icons/apps-2-add-line.svg";
  NewCategoryButtonText.innerText = Strings.NewCategoryButton[UserSettings.CurrentLang];
  NewCategoryButton.append(NewCategoryButtonIcon, NewCategoryButtonText);
  // Calendar Button
  const Analysis = document.createElement("button");
  const AnalysisIcon = document.createElement("img");
  const AnalysisText = document.createElement("span");

  Analysis.className = "analysis-button side-bar-item";
  AnalysisIcon.className = "side-bar-item-icon icon";
  AnalysisText.className = "side-bar-item-text text";

  Analysis.addEventListener("click", () => HighLightSelectedSideBarItem(Analysis.className));
  AnalysisIcon.src = "../Icons/bar-chart-line.svg";
  AnalysisText.innerText = Strings.Analysis[UserSettings.CurrentLang];
  Analysis.append(AnalysisIcon, AnalysisText);
  // Notes Button
  const Notes = document.createElement("button");
  const NotesIcon = document.createElement("img");
  const NotesText = document.createElement("span");

  Notes.className = "notes-button side-bar-item";
  NotesIcon.className = "side-bar-item-icon icon";
  NotesText.className = "side-bar-item-text text";

  Notes.addEventListener("click", DisplayNotesWindow);
  NotesIcon.src = "../Icons/sticky-note-line.svg";
  NotesText.innerText = Strings.NotesButton[UserSettings.CurrentLang];
  Notes.append(NotesIcon, NotesText);
  // Alarms Button
  const Alarms = document.createElement("button");
  const AlarmsIcon = document.createElement("img");
  const AlarmsText = document.createElement("span");

  Alarms.className = "alarms-button side-bar-item";
  AlarmsIcon.className = "side-bar-item-icon icon";
  AlarmsText.className = "side-bar-item-text text";

  Alarms.addEventListener("click", () => HighLightSelectedSideBarItem(Alarms.className));
  AlarmsIcon.src = "../Icons/time-line.svg";
  AlarmsText.innerText = Strings.AlarmsButton[UserSettings.CurrentLang];
  Alarms.append(AlarmsIcon, AlarmsText);
  // Trash Bin Button
  const TrashBin = document.createElement("button");
  const TrashBinIcon = document.createElement("img");
  const TrashBinText = document.createElement("span");

  TrashBin.className = "trash-bin-button side-bar-item";
  TrashBinIcon.className = "side-bar-item-icon icon";
  TrashBinText.className = "side-bar-item-text text";

  TrashBin.addEventListener("click", DisplayTrashBinWindow);
  TrashBin.addEventListener("dragover", (Event) => {
    Event.preventDefault();
    TrashBin.style.backgroundColor = HoverColor[UserSettings.Theme];
    TrashBin.style.transform = "scale(1.1)";
  });
  TrashBin.addEventListener("dragleave", () => {
    TrashBin.style.backgroundColor = "";
    TrashBin.style.transform = "";
  });
  TrashBin.addEventListener("drop", (Event) => {
    TrashBin.style.backgroundColor = "";
    TrashBin.style.transform = "";
    if (AppObj.SelectMode) {
      let DragableElements = ReturnSelectedTasks();
      let ValidDragableElements = DragableElements.filter((Task) => {
        return !Task.IsTaskTrashed;
      });
      ValidDragableElements.forEach((Task) => {
        MoveToTrash(Task.ID);
      });
    } else {
      let DraggedElementID = Event.dataTransfer.getData("DragableElementID");
      let DragableElement = AllTasksArray.find((Task) => {
        return Task.ID === DraggedElementID;
      });
      if (DragableElement.IsTaskTrashed) return false;
      MoveToTrash(DraggedElementID);
    }
  });
  TrashBinIcon.src = "../Icons/delete-bin-7-line.svg";
  TrashBinText.innerText = Strings.TrashBinButton[UserSettings.CurrentLang];
  TrashBin.append(TrashBinIcon, TrashBinText);
  // Settings Button
  const SettingsButton = document.createElement("button");
  const SettingsButtonIcon = document.createElement("img");
  const SettingsButtonText = document.createElement("span");

  SettingsButton.className = "settings-button side-bar-item";
  SettingsButtonIcon.className = "side-bar-item-icon icon";
  SettingsButtonText.className = "side-bar-item-text text";

  SettingsButton.addEventListener("click", DisplaySettings);
  SettingsButtonIcon.src = "../Icons/settings-5-line.svg";
  SettingsButtonText.innerText = Strings.SettingsButton[UserSettings.CurrentLang];
  SettingsButton.append(SettingsButtonIcon, SettingsButtonText);
  // User Category Container
  const UserCategoryContainer = document.createElement("div");
  UserCategoryContainer.className = "user-category-container";
  // Clock Section
  const Clock = document.createElement("div");
  const TimeIcon = document.createElement("img");
  const FullDate = document.createElement("span");
  const Time = document.createElement("span");

  FullDate.className = "full-date text";
  TimeIcon.className = "time-icon icon";
  Clock.className = "clock";
  Time.className = "time text";

  Time.setAttribute("inert", "");
  FullDate.setAttribute("inert", "");
  Clock.append(TimeIcon, Time);
  // Footer Section
  const SideBarFooter = document.createElement("div");
  SideBarFooter.className = "side-bar-footer";
  SideBarFooter.append(SettingsButton);
  // Appending elements to DOM
  SideBar.append(Clock, FullDate, HomeButton, NewTaskButton, NewCategoryButton, Analysis, Notes, Alarms, TrashBin, UserCategoryContainer, SideBarFooter);
  // Final
  return SideBar;
}
function ReturnListSection() {
  const ListSection = document.createElement("section");
  ListSection.className = "list-section";
  ListSection.addEventListener("wheel", (Event) => {
    FreezScroll(Event);
  });
  return ListSection;
}
// Sort bars
function ReturnHomeWindowSortBar() {
  const SortBar = document.createElement("section");
  // Sort buttons
  const SortUnfinished = ReturnSortUnfinishedBtn("Home");
  const SortToday = ReturnSortTodayBtn("Home");
  const SortTomorrow = ReturnSortTomorrowBtn("Home");
  const SortIn2Days = ReturnSortIn2DaysBtn("Home");
  const SortCompleted = ReturnSortCompletedBtn("Home");
  const SortFailed = ReturnSortFailedBtn("Home");
  // Id and Class
  SortBar.className = "sort-bar";
  // Final
  SortBar.append(SortUnfinished, SortToday, SortTomorrow, SortIn2Days, SortCompleted, SortFailed);
  return SortBar;
}
function ReturnTrashBinSortBar() {
  const SortBar = document.createElement("section");
  // Sort buttons
  const SortAll = ReturnSortAllBtn();
  const SortToday = ReturnSortTodayBtn("Trash");
  const SortTomorrow = ReturnSortTomorrowBtn("Trash");
  const SortIn2Days = ReturnSortIn2DaysBtn("Trash");
  // Id and Class
  SortBar.className = "sort-bar";
  // Final
  SortBar.append(SortAll, SortToday, SortTomorrow, SortIn2Days);
  return SortBar;
}
function ReturnUserCategorySortBar() {
  const SortBar = document.createElement("section");
  // Sort buttons
  const SortUnfinished = ReturnSortUnfinishedBtn(AppObj.SelectedUserCategory);
  const SortToday = ReturnSortTodayBtn(AppObj.SelectedUserCategory);
  const SortTomorrow = ReturnSortTomorrowBtn(AppObj.SelectedUserCategory);
  const SortIn2Days = ReturnSortIn2DaysBtn(AppObj.SelectedUserCategory);
  const SortCompleted = ReturnSortCompletedBtn(AppObj.SelectedUserCategory);
  const SortFailed = ReturnSortFailedBtn(AppObj.SelectedUserCategory);
  // Id and Class
  SortBar.className = "sort-bar";
  // Final
  SortBar.append(SortUnfinished, SortToday, SortTomorrow, SortIn2Days, SortCompleted, SortFailed);
  return SortBar;
}
// Return the fragment of each window
function ReturnHomeWindow() {
  const Window = document.createElement("section");
  const TaskBar = ReturnTaskBar("Home");
  const ListSection = ReturnListSection();
  // Id and Class
  Window.id = "home-window";
  Window.className = "window";
  // Final
  Window.append(TaskBar, ListSection);
  return Window;
}
function ReturnNotesWindow() {
  const NotesWindow = document.createElement("section");
  const WindowHeader = document.createElement("header");
  const HeaderText = document.createElement("span");
  const HeaderIcon = document.createElement("img");
  const NotesContainer = document.createElement("section");
  const AddNotesBtn = document.createElement("button");
  const AddNotesBtnText = document.createElement("span");
  const AddNotesBtnIcon = document.createElement("img");
  // Id and Class
  NotesWindow.id = "notes-window";
  NotesWindow.className = "window";
  WindowHeader.className = "window-header notes-header";
  HeaderText.className = "header-title text";
  HeaderIcon.className = "header-icon icon";
  NotesContainer.className = "notes-container";
  AddNotesBtn.className = "add-notes-btn green-btn";
  AddNotesBtnText.className = "add-notes-btn-text text";
  AddNotesBtnIcon.className = "add-notes-btn-icon icon";
  // Innertext and Src
  HeaderText.innerText = Strings.NotesButton[UserSettings.CurrentLang];
  AddNotesBtnText.innerText = Strings.AddNote[UserSettings.CurrentLang];
  HeaderIcon.src = "../Icons/sticky-note-line.svg";
  AddNotesBtnIcon.src = "../Icons/sticky-note-add-line.svg";
  // Events
  AddNotesBtn.addEventListener("click", AddNoteModal);
  // Final
  AddNotesBtn.append(AddNotesBtnText, AddNotesBtnIcon);
  WindowHeader.append(AddNotesBtn, HeaderIcon, HeaderText);
  NotesWindow.append(WindowHeader, NotesContainer);
  return NotesWindow;
}
function ReturnTrashBinWindow() {
  const TrashBinWindow = document.createElement("section");
  const TrashBinHeader = document.createElement("section");
  const TrashBinIcon = document.createElement("img");
  const TrashBinTitle = document.createElement("span");
  const ListSection = ReturnListSection();
  const TaskBar = ReturnTaskBar("Trash");
  // Id and Class
  TrashBinWindow.id = "trash-bin-window";
  TrashBinWindow.className = "window";
  TrashBinHeader.className = "window-header";
  TrashBinIcon.className = "header-icon icon";
  TrashBinTitle.className = "header-title text";
  // InnerText and other properties
  TrashBinIcon.src = "../Icons/delete-bin-7-line.svg";
  TrashBinTitle.innerText = Strings.TrashBinTitle[UserSettings.CurrentLang];
  // Final
  TrashBinHeader.append(TrashBinIcon, TrashBinTitle);
  TrashBinWindow.append(TrashBinHeader, ListSection, TaskBar);
  return TrashBinWindow;
}
function ReturnUserCategoryWindow(ID) {
  // Find Usercategory info based on AppObj.SelectedUserCategory property
  let SelectedCategory = UserCategoriesArray.find((Category) => {
    return Category.ID === ID;
  });
  let Name = SelectedCategory.Name;
  let Icon = SelectedCategory.Icon;
  // Define elements
  const UserCategoryPage = document.createElement("section");
  const UserCategoryPageHeader = document.createElement("header");
  const UserCategoryPageTitle = document.createElement("span");
  const UserCategoryPageIcon = document.createElement("img");
  const ListSection = document.createElement("section");
  const TaskBar = ReturnTaskBar("UserCategory");
  // Id and Class
  UserCategoryPage.id = "user-category-page";
  UserCategoryPage.className = "window";
  UserCategoryPageHeader.className = "window-header";
  UserCategoryPageTitle.className = "header-title text";
  UserCategoryPageIcon.className = "header-icon icon";
  ListSection.className = "list-section";
  // InnerText and other properties
  UserCategoryPageTitle.innerText = Name;
  UserCategoryPageIcon.src = Icon;
  // Final
  UserCategoryPageHeader.append(UserCategoryPageIcon, UserCategoryPageTitle);
  UserCategoryPage.append(UserCategoryPageHeader, ListSection, TaskBar);
  return UserCategoryPage;
}
// Display each window
function DisplayHomeWindow(FirstTime) {
  if (!FirstTime) {
    if (AppObj.CurrentWindow.includes("Home")) return;
  }
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnHomeWindow());
  HighLightSelectedSideBarItem("home-button");
  HighLightSelectedSortButton("sort-unfinished");
  ChangeWindow("Home-Unfinished");
}
function DisplayNotesWindow() {
  if (AppObj.CurrentWindow.includes("Notes")) return;
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnNotesWindow());
  HighLightSelectedSideBarItem("notes-button");
  ChangeWindow("Notes");
}
function DisplayTrashBinWindow() {
  if (AppObj.CurrentWindow.includes("Trash")) return;
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnTrashBinWindow());
  HighLightSelectedSortButton("sort-all-trash");
  HighLightSelectedSideBarItem("trash-bin-button");
  ChangeWindow("Trash-All");
}
function DisplayUserCategoryWindow(ID) {
  // Go to UGCM file to find out what the fuck is going on
  const Window = document.querySelector(".window");
  if (Window) Window.remove();
  const UGCP = ReturnUserCategoryWindow(ID);
  document.body.append(UGCP);
  HighLightSelectedSortButton("sort-unfinished");
  ChangeWindow(`${AppObj.SelectedUserCategory}-Unfinished`);
  // Unhover the sidebar items because the UGC are also in sidebar
  const SidebarItems = document.querySelectorAll(".side-bar-item");
  SidebarItems.forEach((Item) => {
    if (Item.className.includes("hovered")) Item.classList.remove("hovered");
  });
}
function DisplayUserCategories() {
  const UserCategoryContainer = document.querySelector(".user-category-container");
  UserCategoryContainer.innerHTML = "";
  UserCategoryContainer.append(ReturnUserCategorise());
}
// Appens all the task containers including normal/failed/completed/trashed
function AppendTaskContainer(Tasks) {
  const ListSection = document.querySelector(".list-section");
  let FragmentOfTaskContainers = document.createDocumentFragment();
  Tasks.forEach((Task) => {
    let { ID, Title, NumericDate, UserCategory, OnlyShowInCategory } = Task;
    if (OnlyShowInCategory && (AppObj.SelectedUserCategory !== UserCategory || !AppObj.CurrentWindow.includes("UserCategory"))) return;
    const TaskContainer = document.createElement("section");
    TaskContainer.className = "task-container";
    TaskContainer.id = ID;
    TaskContainer.draggable = "true";
    const CheckBoxContainer = document.createElement("label");
    CheckBoxContainer.className = "checkbox-container";
    CheckBoxContainer.style.display = "none";
    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";
    Checkbox.className = "checkbox task-checkbox";
    Checkbox.addEventListener("change", () => {
      if (Checkbox.checked) SelectTask(ID);
      else DeSelectTask(ID);
    });
    const CheckMark = document.createElement("div");
    CheckMark.className = "checkmark";
    const TaskTitle = document.createElement("section");
    TaskTitle.className = "task-title text";
    TaskTitle.setAttribute("inert", "");
    const DateContainer = document.createElement("section");
    DateContainer.className = "date-container";
    DateContainer.inert = "true";
    const TaskDate = document.createElement("section");
    TaskDate.className = "task-date text";
    const TaskTime = document.createElement("section");
    TaskTime.className = "task-time text";
    TaskContainer.append(CheckBoxContainer, TaskTitle, DateContainer);
    CheckBoxContainer.append(Checkbox, CheckMark);
    DateContainer.append(TaskDate, TaskTime);
    if (ReturnTaskState(ID) === "Unfinished") {
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Normal");
      });
    }
    if (ReturnTaskState(ID) === "Failed") {
      const FailedTaskBadge = document.createElement("span");
      FailedTaskBadge.className = "failed-task-badge text";
      FailedTaskBadge.innerHTML = Strings.FailedTaskBadge[UserSettings.CurrentLang];
      FailedTaskBadge.setAttribute("inert", "");
      TaskContainer.append(FailedTaskBadge);
      //
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Failed");
      });
    }
    if (ReturnTaskState(ID) === "Completed") {
      const CompletedTaskBadge = document.createElement("span");
      CompletedTaskBadge.className = "completed-task-badge text";
      CompletedTaskBadge.innerHTML = Strings.CompletedTaskBadge[UserSettings.CurrentLang];
      CompletedTaskBadge.setAttribute("inert", "");
      TaskContainer.append(CompletedTaskBadge);
      //
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Completed");
      });
    }
    if (ReturnTaskState(ID) === "Trashed") {
      const TrashedTaskBadge = document.createElement("span");
      TrashedTaskBadge.className = "trashed-task-badge text";
      TrashedTaskBadge.innerHTML = Strings.TrashedTaskBadge[UserSettings.CurrentLang];
      TrashedTaskBadge.setAttribute("inert", "");
      TaskContainer.append(TrashedTaskBadge);
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Trashed");
      });
    }
    if (Task.UserCategory !== "None" && ReturnTaskState(ID) === "Unfinished") {
      let Category = UserCategoriesArray.find((Category) => {
        return Category.ID === Task.UserCategory;
      });
      if (!Category) {
        Task.UserCategory = "None";
      } else {
        let { Color, ID, Name, Icon } = Category;
        const CategoryBadge = document.createElement("section");
        const CategoryBadgeName = document.createElement("span");
        const CategoryBadgeIcon = document.createElement("img");
        CategoryBadge.className = "category-badge";
        CategoryBadgeName.className = "category-badge-name text";
        CategoryBadgeIcon.className = "category-badge-icon icon";
        CategoryBadge.style.backgroundColor = Color;
        CategoryBadge.setAttribute("inert", "");
        CategoryBadgeName.innerText = Name;
        CategoryBadgeIcon.src = Icon;
        CategoryBadge.append(CategoryBadgeIcon, CategoryBadgeName);
        TaskContainer.append(CategoryBadge);
      }
    }
    TaskContainer.addEventListener("click", (Event) => {
      if (!AppObj.SelectMode || !Event.target.id.includes("Task")) return;
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
      if (!AppObj.SelectMode) SelectTask(TaskID);
    });
    TaskContainer.addEventListener("dragstart", (Event) => {
      Event.dataTransfer.setData("DragableElementID", Event.target.id);
    });
    TaskContainer.addEventListener("mouseover", (Event) => {
      if (AppObj.SelectMode) Event.target.style.cursor = "pointer";
      else Event.target.style.cursor = "";
    });
    if (Task.IsTaskPinned) {
      const PinBadge = document.createElement("img");
      PinBadge.className = "pinned-task-badge icon";
      PinBadge.inert = "true";
      PinBadge.src = "../Icons/attachment-line.svg";
      TaskContainer.append(PinBadge);
    }
    TaskTitle.textContent = Title;
    if (UserSettings.Calendar === "Solar") {
      TaskDate.textContent = PlacePersianNumbers(NumericToSolar(NumericDate));
    }
    if (UserSettings.Calendar === "Gregorian") {
      TaskDate.textContent = PlacePersianNumbers(NumericToGregorian(NumericDate));
    }
    TaskTime.textContent = PlacePersianNumbers(NumericToTime(NumericDate));
    FragmentOfTaskContainers.append(TaskContainer);
  });
  ListSection.append(FragmentOfTaskContainers);
}
function ClearListSection() {
  let ListSection = document.querySelector(".list-section");
  if (!ListSection) return;
  ListSection.innerHTML = "";
}
// Functionalities
function EmptyBox(Text) {
  // Look into functions that Start with Load and End with Tasks inside TaskManager.js to trace proces of this function.
  const ListSection = document.querySelector(".list-section");
  const EmptyBoxIconContainer = document.createElement("section");
  EmptyBoxIconContainer.className = "empty-box-container";
  // Empty box icon
  const EmptyBoxIcon = document.createElement("img");
  EmptyBoxIcon.src = IconsSrc.EmptyBoxIcon[UserSettings.Theme];
  // Empty box text
  const EmptyBoxText = document.createElement("p");
  EmptyBoxText.className = "empty-box-text text";
  EmptyBoxText.innerText = Text;
  // Modifing List Section
  ClearListSection();
  // Appending to DOM
  EmptyBoxIconContainer.append(EmptyBoxIcon, EmptyBoxText);
  ListSection.append(EmptyBoxIconContainer);
}
function DisplayNoResultBox(Text) {
  const ListSection = document.querySelector(".list-section");
  const EmptyBoxIconContainer = document.createElement("section");
  EmptyBoxIconContainer.id = "empty-box-container";
  // Empty box icon
  const EmptyBoxIcon = document.createElement("img");
  EmptyBoxIcon.src = IconsSrc.NoResultFoundIcon[UserSettings.Theme];
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
function ScrollRight(Selector) {
  const Target = document.querySelector(Selector);
  Target.scrollLeft += 100;
}
function ScrollLeft(Selector) {
  const Target = document.querySelector(Selector);
  Target.scrollLeft -= 100;
}
function HighLightSelectedSortButton(ID) {
  const SortButton = document.querySelectorAll(".sort-buttons");
  SortButton.forEach((Button) => {
    if (Button.id === ID) Button.classList.add("hovered");
    else Button.classList.remove("hovered");
  });
}
function HighLightSelectedSideBarItem(Class) {
  const SideBarItems = document.querySelectorAll(".side-bar-item");
  SideBarItems.forEach((Item) => {
    if (Item.className.includes(Class)) Item.classList.add("hovered");
    else Item.classList.remove("hovered");
  });
}
function DisplaySelectModeBar() {
  if (document.querySelector(".select-bar")) {
    const SelectedItemsElem = document.querySelector(".selected-items");
    SelectedItemsElem.innerText = `${PlacePersianNumbers(ReturnSelectedTasks().length)} ${Strings.ItemsSelected[UserSettings.CurrentLang]}`;
    return;
  }
  const ListSection = document.querySelector(".list-section");
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
  SelectBar.className = "select-bar";
  SelectedItemsElem.className = "selected-items text";
  ExistSelectModeButton.className = "exit-select-mode-btn text";
  // Class
  DeleteButton.className = "select-bar-task-btn text";
  MoveToTrashButton.className = "select-bar-task-btn text";
  FailButton.className = "select-bar-task-btn text";
  CompleteButton.className = "select-bar-task-btn text";
  RestoreButton.className = "select-bar-task-btn text";
  ListSection.classList.add("padding-bottom");
  //InnerHTML
  SelectedItemsElem.innerText = `${PlacePersianNumbers(ReturnSelectedTasks().length)} ${Strings.ItemsSelected[UserSettings.CurrentLang]}`;
  ExistSelectModeButton.innerText = Strings.DeSelect[UserSettings.CurrentLang];
  DeleteButton.innerText = Strings.Delete[UserSettings.CurrentLang];
  MoveToTrashButton.innerText = Strings.MoveToTrash[UserSettings.CurrentLang];
  FailButton.innerText = Strings.FailTask[UserSettings.CurrentLang];
  CompleteButton.innerText = Strings.CompleteTask[UserSettings.CurrentLang];
  RestoreButton.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
  // Event listener
  ExistSelectModeButton.addEventListener("click", ExitSelectMode);
  MoveToTrashButton.addEventListener("click", MoveToTrash);
  FailButton.addEventListener("click", FailTask);
  CompleteButton.addEventListener("click", CompleteTask);
  // Append
  SelectBar.append(ExistSelectModeButton, SelectedItemsElem, DeleteButton);
  switch (AppObj.CurrentWindow) {
    case "Trash-All":
    case "Trash-Today":
    case "Trash-Tomorrow":
    case "Trash-In2Days":
      SelectBar.append(RestoreButton);
      RestoreButton.addEventListener("click", RestoreFromTrash);
      DeleteButton.addEventListener("click", () => DeleteModal("Trashed"));
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
      DeleteButton.addEventListener("click", () => DeleteModal("Normal"));
      break;
    case "Home-Failed":
      SelectBar.append(MoveToTrashButton, RestoreButton);
      RestoreButton.addEventListener("click", RestoreFromFailed);
      DeleteButton.addEventListener("click", () => DeleteModal("Failed"));
      break;
    case "Home-Completed":
      SelectBar.append(MoveToTrashButton, FailButton, RestoreButton);
      RestoreButton.addEventListener("click", RestoreFromCompleted);
      DeleteButton.addEventListener("click", () => DeleteModal("Completed"));
      break;
  } //Append
  document.body.append(SelectBar);
}
function HideSelectModeBar() {
  const SelectBar = document.querySelector(".select-bar");
  const ListSection = document.querySelector(".list-section");
  if (SelectBar) SelectBar.remove();
  if (ListSection) ListSection.classList.remove("padding-bottom");
}
function FixDirection() {
  const MainStyleSheet = document.querySelector(".main-style-sheet");
  switch (UserSettings.CurrentLang) {
    case "en":
      MainStyleSheet.href = "Styles/Main/style_ltr.css";
      break;
    case "fa":
      MainStyleSheet.href = "Styles/Main/style_rtl.css";
      break;
  }
}
// Styling and Colors and UI
/* Note for dummies : all the styling around colors and background colors etc... is inserted dynamically
here through insertRule() and the values are stored inside DevTools.js > AppElementsObj object.
*/
function InsertRules() {
  for (let i in AppElementsObj) {
    if (i === "Hovered") {
      const HoveredRule = `
       .hovered {
         background-color : ${AppElementsObj.Hovered.Themes[UserSettings.Theme].BgColor} !important;    
        }    
    `;
      document.styleSheets[0].insertRule(HoveredRule);
      continue;
    }
    if (i === "Icons") {
      let SvgIconColorRule = `
      .icon{
       ${HexToFilter(AppElementsObj[i].Themes[UserSettings.Theme].Color)}
      }
      `;
      if (SvgIconColorRule) document.styleSheets[0].insertRule(SvgIconColorRule);
      continue;
    }
    const BgColorRule = AppElementsObj[i].Themes[UserSettings.Theme]?.BgColor
      ? `
    ${AppElementsObj[i].Selector} {
    background-color : ${AppElementsObj[i].Themes[UserSettings.Theme].BgColor};    
    }
    `
      : null;
    const ColorRule = AppElementsObj[i].Themes[UserSettings.Theme]?.Color
      ? `
    ${AppElementsObj[i].Selector} {
    color : ${AppElementsObj[i].Themes[UserSettings.Theme].Color};    
    }    
    `
      : null;
    const HoverBgColorRule = AppElementsObj[i].Themes[UserSettings.Theme]?.Hover?.BgColor
      ? `
        ${AppElementsObj[i].Selector}:hover {
    background-color : ${AppElementsObj[i].Themes[UserSettings.Theme].Hover.BgColor}  !important;    
    }    
    `
      : null;
    const BorderColorRule = AppElementsObj[i].Themes[UserSettings.Theme]?.BorderColor
      ? `
    ${AppElementsObj[i].Selector} {
    border-color : ${AppElementsObj[i].Themes[UserSettings.Theme].BorderColor};    
    }    
    `
      : null;

    if (BgColorRule) document.styleSheets[0].insertRule(BgColorRule);
    if (ColorRule) document.styleSheets[0].insertRule(ColorRule);
    if (HoverBgColorRule) document.styleSheets[0].insertRule(HoverBgColorRule);
    if (BorderColorRule) document.styleSheets[0].insertRule(BorderColorRule);
  }
}
