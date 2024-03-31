// Sort buttons
function ReturnSortAllBtn() {
  const SortAllTrash = document.createElement("button");
  // Id and Class
  SortAllTrash.className = "sort-buttons";
  SortAllTrash.id = "sort-all-trash";
  // Innertext and other properties
  SortAllTrash.textContent = Strings.SortAllTrash[UserSettings.CurrentLang];
  // Events
  SortAllTrash.addEventListener("click", () => {
    ChangeWindow("Trash-All");
    UpdateInbox();
    HighLightSelectedSortButton("sort-all-trash");
  });
  // Final
  return SortAllTrash;
}
function ReturnSortUnfinishedBtn(TargetWindow) {
  const SortUnfinished = document.createElement("button");
  SortUnfinished.className = "sort-buttons";
  SortUnfinished.id = "sort-unfinished";
  SortUnfinished.textContent = Strings.SortUnfinished[UserSettings.CurrentLang];
  SortUnfinished.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Unfinished`);
    UpdateInbox();
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
    UpdateInbox();
    HighLightSelectedSortButton("sort-unfinished");
  });
  return SortUnfinished;
}
function ReturnSortTodayBtn(TargetWindow) {
  const SortToday = document.createElement("button");
  SortToday.className = "sort-buttons";
  SortToday.id = "sort-today";
  SortToday.textContent = Strings.SortTodayButton[UserSettings.CurrentLang];
  SortToday.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Today`);
    UpdateInbox();
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
    ChangeWindow(`${TargetWindow}-Today`);
    UpdateInbox();
    HighLightSelectedSortButton("sort-today");
  });
  return SortToday;
}
function ReturnSortTomorrowBtn(TargetWindow) {
  const SortTomorrow = document.createElement("button");
  SortTomorrow.className = "sort-buttons";
  SortTomorrow.id = "sort-tomorrow";
  SortTomorrow.textContent = Strings.SortTomorrowButton[UserSettings.CurrentLang];
  SortTomorrow.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Tomorrow`);
    UpdateInbox();
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
    ChangeWindow(`${TargetWindow}-Tomorrow`);
    UpdateInbox();
    HighLightSelectedSortButton("sort-tomorrow");
  });
  return SortTomorrow;
}
function ReturnSortIn2DaysBtn(TargetWindow) {
  const SortIn2Days = document.createElement("button");
  SortIn2Days.className = "sort-buttons";
  SortIn2Days.id = "sort-in-2-days";
  SortIn2Days.textContent = Strings.SortIn2DaysButton[UserSettings.CurrentLang];
  SortIn2Days.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-In2Days`);
    UpdateInbox();
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
    if (SelectMode) {
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
    UpdateInbox();
    HighLightSelectedSortButton("sort-in-2-days");
  });
  return SortIn2Days;
}
function ReturnSortCompletedBtn() {
  const SortCompleted = document.createElement("button");
  SortCompleted.className = "sort-buttons";
  SortCompleted.id = "sort-completed";
  SortCompleted.textContent = Strings.CategoryCompletedButton[UserSettings.CurrentLang];
  SortCompleted.addEventListener("click", () => {
    ChangeWindow("Home-Completed");
    UpdateInbox();
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
    ChangeWindow("Home-Completed");
    UpdateInbox();
    HighLightSelectedSortButton("sort-completed");
  });
  return SortCompleted;
}
function ReturnSortFailedBtn() {
  const SortFailed = document.createElement("button");
  SortFailed.className = "sort-buttons";
  SortFailed.id = "sort-failed";
  SortFailed.textContent = Strings.CategoryFailedButton[UserSettings.CurrentLang];
  SortFailed.addEventListener("click", () => {
    ChangeWindow("Home-Failed");
    UpdateInbox();
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
    ChangeWindow("Home-Failed");
    UpdateInbox();
    HighLightSelectedSortButton("sort-failed");
  });
  return SortFailed;
}
// App components
function ReturnTopBar() {
  const TopBar = document.createElement("section");
  const DisplayText = document.createElement("section");
  TopBar.id = "top-bar";
  DisplayText.id = "display-text";
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
  TaskBar.id = "task-bar";
  SelectAllSection.id = "select-all-section";
  CheckBoxLable.className = "checkbox-container";
  CheckBox.id = "select-all-checkbox";
  CheckBox.className = "checkbox";
  Checkmark.className = "checkmark";
  SearchBar.id = "search-bar";
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
    UserCategoryIcon.className = "user-category-icon";
    UserCategoryName.className = "user-category-name";
    UserCategoryButton.id = Category.ID;
    UserCategoryName.innerText = Category.Name;
    UserCategoryIcon.src = Category.Icon;
    // Other properties
    UserCategoryName.setAttribute("inert", "");
    UserCategoryIcon.setAttribute("inert", "");
    UserCategoryButton.style.backgroundColor = Category.Color;
    // Events
    UserCategoryButton.addEventListener("click", () => {
      SelectedUserCategory = Category.ID;
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
  HomeButton.addEventListener("click", DisplayHomeWindow);
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
  Calendar.addEventListener("click", () => HighLightSelectedSideBarItem(Calendar.id));
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
  Notes.addEventListener("click", DisplayNotesWindow);
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
  Alarms.addEventListener("click", () => HighLightSelectedSideBarItem(Alarms.id));
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
    if (SelectMode) {
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
  SettingsButton.addEventListener("click", DisplaySettings);
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
  // Final
  return SideBar;
}
function ReturnListSection() {
  const ListSection = document.createElement("section");
  ListSection.id = "list-section";
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
  SortBar.id = "sort-bar";
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
  SortBar.id = "sort-bar";
  // Final
  SortBar.append(SortAll, SortToday, SortTomorrow, SortIn2Days);
  return SortBar;
}
function ReturnUserCategorySortBar() {
  const SortBar = document.createElement("section");
  // Sort buttons
  const SortUnfinished = ReturnSortUnfinishedBtn("UserCategory");
  const SortToday = ReturnSortTodayBtn("UserCategory");
  const SortTomorrow = ReturnSortTomorrowBtn("UserCategory");
  const SortIn2Days = ReturnSortIn2DaysBtn("UserCategory");
  // Id and Class
  SortBar.id = "sort-bar";
  // Final
  SortBar.append(SortUnfinished, SortToday, SortTomorrow, SortIn2Days);
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
  WindowHeader.className = "window-header";
  WindowHeader.id = "notes-header";
  HeaderText.className = "header-title";
  HeaderIcon.className = "header-icon";
  NotesContainer.id = "notes-container";
  AddNotesBtn.id = "add-notes-btn";
  AddNotesBtnText.id = "add-notes-btn-text";
  AddNotesBtnIcon.id = "add-notes-btn-icon";
  // Innertext and Src
  HeaderText.innerText = Strings.NotesButton[UserSettings.CurrentLang];
  AddNotesBtnText.innerText = Strings.AddNote[UserSettings.CurrentLang];
  HeaderIcon.src = IconsSrc.MyNotesIcon[UserSettings.Theme];
  AddNotesBtnIcon.src = IconsSrc.AddNotesIcon[UserSettings.Theme];
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
  TrashBinIcon.className = "header-icon";
  TrashBinTitle.className = "header-title";
  // InnerText and other properties
  TrashBinIcon.src = IconsSrc.TrashIcon[UserSettings.Theme];
  TrashBinTitle.innerText = Strings.TrashBinTitle[UserSettings.CurrentLang];
  // Final
  TrashBinHeader.append(TrashBinIcon, TrashBinTitle);
  TrashBinWindow.append(TrashBinHeader, ListSection, TaskBar);
  return TrashBinWindow;
}
function ReturnUserCategoryWindow(ID) {
  // Find Usercategory info based on SelectedUserCategory variable
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
  UserCategoryPageTitle.className = "header-title";
  UserCategoryPageIcon.className = "header-icon";
  ListSection.id = "list-section";
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
    if (CurrentWindow.includes("Home")) return;
  }
  ChangeWindow("Home-Unfinished");
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnHomeWindow());
  HighLightSelectedSideBarItem("home-button");
  HighLightSelectedSortButton("sort-unfinished");
  UpdateInbox();
}
function DisplayNotesWindow() {
  if (CurrentWindow.includes("Notes")) return;
  ChangeWindow("Notes");
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnNotesWindow());
  HighLightSelectedSideBarItem("notes-button");
  UpdateInbox();
}
function DisplayTrashBinWindow() {
  if (CurrentWindow.includes("Trash")) return;
  ChangeWindow("Trash-All");
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnTrashBinWindow());
  HighLightSelectedSortButton("sort-all-trash");
  HighLightSelectedSideBarItem("trash-bin-button");
  UpdateInbox();
}
function DisplayUserCategoryWindow(ID) {
  // Go to UGCM file to find out what the fuck is going on
  ChangeWindow("UserCategory-Unfinished");
  const Window = document.querySelector(".window");
  if (Window) Window.remove();
  const UGCP = ReturnUserCategoryWindow(ID);
  document.body.append(UGCP);
  HighLightSelectedSortButton("sort-unfinished");
  UpdateInbox();
  // Unhover the sidebar items because the UGC are also in sidebar
  const SidebarItems = document.querySelectorAll(".side-bar-item");
  SidebarItems.forEach((Item) => {
    if (Item.className.includes("hovered")) Item.classList.remove("hovered");
  });
}
function DisplayUserCategories() {
  const UserCategoryContainer = document.getElementById("user-category-container");
  UserCategoryContainer.innerHTML = "";
  UserCategoryContainer.append(ReturnUserCategorise());
}
// Appens all the task containers including normal/failed/completed/trashed
function AppendTaskContainer(Tasks) {
  const ListSection = document.getElementById("list-section");
  let FragmentOfTaskContainers = document.createDocumentFragment();
  Tasks.forEach((Task) => {
    let { ID, Title, NumericDate } = Task;
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
    if (ReturnTaskState(ID) === "Unfinished") {
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Normal");
      });
    }
    if (ReturnTaskState(ID) === "Failed") {
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
    if (ReturnTaskState(ID) === "Completed") {
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
    if (ReturnTaskState(ID) === "Trashed") {
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
    if (Task.UserCategory !== "None" && ReturnTaskState(ID) === "Unfinished") {
      let { Color, ID, Icon, Name } = UserCategoriesArray.find((Category) => {
        return Category.ID === Task.UserCategory;
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
  let ListSection = document.getElementById("list-section");
  if (!ListSection) return;
  ListSection.innerHTML = "";
  ListSection.style = "";
}
// Functionalities
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
function HighLightSelectedSideBarItem(ID) {
  const SideBarItems = document.querySelectorAll(".side-bar-item");
  SideBarItems.forEach((Item) => {
    if (Item.id === ID) Item.classList.add("hovered");
    else Item.classList.remove("hovered");
  });
}
function DisplaySelectModeBar() {
  if (DoesElementExist("select-bar")) {
    const SelectedItemsElem = document.getElementById("selected-items");
    SelectedItemsElem.innerText = `${PlacePersianNumbers(ReturnSelectedTasks().length)} ${Strings.ItemsSelected[UserSettings.CurrentLang]}`;
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
  switch (CurrentWindow) {
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
  const SelectBar = document.getElementById("select-bar");
  const ListSection = document.getElementById("list-section");
  if (SelectBar) SelectBar.remove();
  if (ListSection) ListSection.classList.remove("padding-bottom");
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
