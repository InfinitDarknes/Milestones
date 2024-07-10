// Sort buttons
function ReturnSortAllBtn() {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-all-trash";
  Btn.textContent = Strings.SortAllTrash[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow("Trash-All");
  });
  return Btn;
}
function ReturnSortUnfinishedBtn(TargetWindow) {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-unfinished";
  Btn.textContent = Strings.SortUnfinished[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Unfinished`);
  });
  AddDragAndDropEvents(Btn, `${TargetWindow}-Unfinished`, "Unfinished");
  return Btn;
}
function ReturnSortTodayBtn(TargetWindow) {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-today";
  Btn.textContent = Strings.SortTodayButton[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Today`);
  });
  AddDragAndDropEvents(Btn, `${TargetWindow}-Today`, "Today");
  return Btn;
}
function ReturnSortTomorrowBtn(TargetWindow) {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-tomorrow";
  Btn.textContent = Strings.SortTomorrowButton[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Tomorrow`);
  });
  AddDragAndDropEvents(Btn, `${TargetWindow}-Tomorrow`, "Tomorrow");
  return Btn;
}
function ReturnSortIn2DaysBtn(TargetWindow) {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-in-2-days";
  Btn.textContent = Strings.SortIn2DaysButton[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-In2Days`);
  });
  AddDragAndDropEvents(Btn, `${TargetWindow}-In2Days`, "In2Days");
  return Btn;
}
function ReturnSortCompletedBtn(TargetWindow) {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-completed";
  Btn.textContent = Strings.CategoryCompletedButton[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Completed`);
  });
  AddDragAndDropEvents(Btn, `${TargetWindow}-Completed`, "Completed");
  return Btn;
}
function ReturnSortFailedBtn(TargetWindow) {
  const Btn = document.createElement("button");
  Btn.className = "sort-buttons text";
  Btn.id = "sort-failed";
  Btn.textContent = Strings.CategoryFailedButton[UserSettings.CurrentLang];
  Btn.addEventListener("click", () => {
    ChangeWindow(`${TargetWindow}-Failed`);
  });
  AddDragAndDropEvents(Btn, `${TargetWindow}-Failed`, "Failed");
  return Btn;
}
function AddDragAndDropEvents(Element, TargetWindow, Type, UserCategoryID) {
  /*
  Element : that element we want to set the drag events on.

  TargetWindow : When you drag-drop a to do element to an element such as Today sort button , 
  not only we need to change information about that to do but we also need to switch the window
  to Home-Today or if it is in a category to UserCategory-[some number]-Today.

  Type : What is this ? we do not mean the type of the to do , either it is unfinished or failed or completed etc..
  we mean the type of the element that the drop event happens on for example type of Completed sort button is "Completed"
  or type of Today sort button is "Today" , with this we can figure what operation we want to do on our dropped to do.

  */
  Element.addEventListener("dragover", (Event) => {
    Event.preventDefault();
    if (Type !== "UserCategory") Element.style.backgroundColor = ThemeObj.Hovered.Themes[UserSettings.Theme].BgColor;
    Element.style.transform = "scale(1.1)";
  });
  Element.addEventListener("dragleave", () => {
    if (Type !== "UserCategory") Element.style.backgroundColor = "";
    Element.style.transform = "";
  });
  Element.addEventListener("drop", (Event) => {
    if (Type !== "UserCategory") Element.style.backgroundColor = "";
    Element.style.transform = "";
    // This part is for single task getting drag and dropped
    let DraggedElementID = Event.dataTransfer.getData("DragableElementID");
    let DragableElement = AllTasksArray.find((Task) => {
      return Task.ID === DraggedElementID;
    });
    // but if there are multiple tasks selected we use ReturnSelectedTasks() func
    let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [DragableElement];
    if (!SelectedTasks) {
      DisplayMessage("Error", "Invalid element detected. Only your tasks can be dragged and dropped");
      return;
    }
    SelectedTasks.forEach((Task) => {
      switch (Type) {
        case "Unfinished":
          Task.IsTaskFailed = false;
          Task.IsTaskCompleted = false;
          Task.IsTaskTrashed = false;
          break;
        case "Today":
          Task.IsTaskFailed = false;
          Task.IsTaskCompleted = false;
          Task.IsTaskTrashed = false;
          MoveToToday(Task.ID);
          break;
        case "Tomorrow":
          Task.IsTaskFailed = false;
          Task.IsTaskCompleted = false;
          Task.IsTaskTrashed = false;
          MoveToTomorrow(Task.ID);
          break;
        case "In2Days":
          Task.IsTaskFailed = false;
          Task.IsTaskCompleted = false;
          Task.IsTaskTrashed = false;
          MoveIn2Days(Task.ID);
          break;
        case "Completed":
          CompleteTask(Task.ID);
          break;
        case "Failed":
          FailTask(Task.ID);
          break;
        case "Trash":
          MoveToTrash(Task.ID);
          break;
        case "UserCategory":
          Task.UserCategory = UserCategoryID;
          Task.IsTaskTrashed = false;
          break;
      }
    });
    if (Type === "UserCategory") {
      AppObj.SelectedUserCategory = UserCategoryID;
    } else {
      ChangeWindow(TargetWindow);
    }
    Save("Tasks");
  });
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
  SearchBar.title = "ShortCut : CTRL + F";
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
      ChangeWindow(`${Category.ID}-Unfinished`);
    });
    UserCategoryButton.addEventListener("contextmenu", (Event) => {
      Event.preventDefault();
      DisplayUserCategoryContextMenu(Event);
    });
    AddDragAndDropEvents(UserCategoryButton, `${Category.ID}-Unfinished`, "UserCategory", Category.ID);
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
  HomeButtonText.innerText = Strings.Home[UserSettings.CurrentLang];
  HomeButton.addEventListener("click", () => {
    ChangeWindow("Home-Unfinished");
  });
  HomeButton.append(HomeButtonIcon, HomeButtonText);
  // New task button
  const NewTaskButton = document.createElement("button");
  const NewTaskButtonIcon = document.createElement("img");
  const NewTaskButtonText = document.createElement("span");

  NewTaskButton.className = "new-task-button side-bar-item";
  NewTaskButtonIcon.className = "side-bar-item-icon icon";
  NewTaskButtonText.className = "side-bar-item-text text";

  NewTaskButtonIcon.src = "../Icons/task-line.svg";
  NewTaskButtonText.innerText = Strings.NewTask[UserSettings.CurrentLang];
  NewTaskButton.title = "ShortCut : F1";

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
  NewCategoryButtonText.innerText = Strings.NewCategory[UserSettings.CurrentLang];
  NewCategoryButton.title = "ShortCut : F2";

  NewCategoryButton.append(NewCategoryButtonIcon, NewCategoryButtonText);
  // Calendar Button
  const Analysis = document.createElement("button");
  const AnalysisIcon = document.createElement("img");
  const AnalysisText = document.createElement("span");

  Analysis.className = "analysis-button side-bar-item";
  AnalysisIcon.className = "side-bar-item-icon icon";
  AnalysisText.className = "side-bar-item-text text";

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

  Notes.addEventListener("click", () => {
    ChangeWindow("Notes");
  });
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

  TrashBin.addEventListener("click", () => {
    ChangeWindow("Trash-All");
  });
  AddDragAndDropEvents(TrashBin, "Trash-All", "Trash");
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
  SettingsButton.title = "ShortCut : F5";

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
  let { Name, Icon } = SelectedCategory;
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

/*
Reason we pass a boolen value of FirstTime to this funcions is as follows:
if you click on home-button multiple times while you are already in the home-window
we need to check this and avoid unnecessary creation and appending new element right ? 
how do we do that ? by checking the localStorage.getItem("LastWindow") so if your last window
is the same one you are reqesting right now we just ignore your reqest 
there is one problem though , what if your last window is home but then you refresh the page
and though to the my app new feature we keep your last window in mind and load that after refresh
the app proceeds to load the home page but the home-page we are reqesting is also our last window
this causes our reqest to be ignored so we need to make an exception for the times you reload the page
*/
function DisplayHomeWindow(FirstTime) {
  if (!FirstTime) {
    if (AppObj.CurrentWindow.includes("Home")) return;
  }
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnHomeWindow());
}
function DisplayNotesWindow(FirstTime) {
  if (!FirstTime) {
    if (AppObj.CurrentWindow.includes("Notes")) return;
  }
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnNotesWindow());
}
function DisplayTrashBinWindow(FirstTime) {
  if (!FirstTime) {
    if (AppObj.CurrentWindow.includes("Trash")) return;
  }
  const WindowElem = document.querySelector(".window");
  if (WindowElem) WindowElem.remove();
  document.body.append(ReturnTrashBinWindow());
}
function DisplayUserCategoryWindow(ID) {
  // Go to UGCM file to find out what the fuck is going on
  const Window = document.querySelector(".window");
  if (Window) Window.remove();
  const UGCP = ReturnUserCategoryWindow(ID);
  document.body.append(UGCP);
  // Unhover the sidebar items because the UGC are also in sidebar
  const SidebarItems = document.querySelectorAll(".side-bar-item");
  SidebarItems.forEach((Item) => {
    if (Item.className.includes("hovered")) Item.classList.remove("hovered");
  });
}
function DisplayUserCategories() {
  /*The elements in sidebar above settings button are called UserCategories or UGC witch 
  stands for "User Generated Category" when you edit/delete/create on of them the 
  ".user-category-container" needs to be updated */
  const UserCategoryContainer = document.querySelector(".user-category-container");
  UserCategoryContainer.innerHTML = "";
  UserCategoryContainer.append(ReturnUserCategorise());
}
// Appens all the task containers including normal/failed/completed/trashed
function AppendTaskContainer(Tasks) {
  /*Functions inside TaskManager.js that usally start with "Load" filter the AllTasksArray variable 
  and splice a new array that they will pass to this function , those functions that start with "Load"
  are mostly triggered by UpdateInbox() function*/
  const ListSection = document.querySelector(".list-section");
  let FragmentOfTaskContainers = document.createDocumentFragment();
  PrioritizePinnedTasks(Tasks).forEach((Task) => {
    let { ID, Title, NumericDate, UserCategory, OnlyShowInCategory, CompletedAt, FailedAt, TrashedAt } = Task;
    if (OnlyShowInCategory && AppObj.SelectedUserCategory !== UserCategory && !AppObj.CurrentWindow.includes("Trash")) return;

    const TaskContainer = document.createElement("section");
    const CheckBoxContainer = document.createElement("label");
    const Checkbox = document.createElement("input");
    const CheckMark = document.createElement("div");
    const TaskTitle = document.createElement("section");
    const TaskExtraInfo = document.createElement("section");

    TaskContainer.className = "task-container";
    CheckBoxContainer.className = "checkbox-container";
    Checkbox.className = "checkbox task-checkbox";
    CheckMark.className = "checkmark";
    TaskTitle.className = "task-title text";
    TaskExtraInfo.className = "task-extra-info text";
    TaskContainer.id = ID;

    TaskContainer.draggable = "true";
    CheckBoxContainer.style.display = "none";
    Checkbox.type = "checkbox";
    TaskExtraInfo.inert = "true";

    TaskTitle.setAttribute("inert", "");
    // TaskContainer.setAttribute("data-dis-type", "simultaneous");
    // TaskContainer.setAttribute("data-dis-particle-type", "Wind");
    // TaskContainer.setAttribute("data-dis-reduction-factor", "35");

    TaskContainer.append(CheckBoxContainer, TaskTitle, TaskExtraInfo);
    CheckBoxContainer.append(Checkbox, CheckMark);
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
    Checkbox.addEventListener("change", () => {
      if (Checkbox.checked) SelectTask(ID);
      else DeSelectTask(ID);
    });
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
    if (Task.Pinned && AppObj.CurrentWindow.includes("Home") && ReturnTaskState(ID) === "Unfinished") {
      const PinBadge = document.createElement("img");
      PinBadge.className = "pinned-task-badge icon";
      PinBadge.inert = "true";
      PinBadge.src = "../Icons/attachment-line.svg";
      TaskContainer.append(PinBadge);
    }
    if (Task.PinnedInCategory && Task.UserCategory === AppObj.SelectedUserCategory && ReturnTaskState(ID) === "Unfinished") {
      const PinBadge = document.createElement("img");
      PinBadge.className = "pinned-task-badge icon";
      PinBadge.inert = "true";
      PinBadge.src = "../Icons/attachment-line.svg";
      TaskContainer.append(PinBadge);
    }
    TaskTitle.textContent = Title;
    if (UserSettings.Calendar === "Solar") {
      TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(NumericDate))}`;
      if (Task.CompletedAt) {
        TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(NumericDate))}\u00A0\u00A0${
          Strings.CompletedAt[UserSettings.CurrentLang]
        }\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(CompletedAt))}\u00A0\u00A0${NumericToTime(CompletedAt)}`;
      } else if (Task.FailedAt) {
        TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(NumericDate))}\u00A0\u00A0${
          Strings.FailedAt[UserSettings.CurrentLang]
        }\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(FailedAt))}\u00A0\u00A0${NumericToTime(FailedAt)}`;
      } else if (Task.TrashedAt) {
        TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(NumericDate))}\u00A0\u00A0${
          Strings.TrashedAt[UserSettings.CurrentLang]
        }\u00A0\u00A0${PlacePersianNumbers(NumericToSolar(TrashedAt))}\u00A0\u00A0${NumericToTime(TrashedAt)}`;
      }
    }
    if (UserSettings.Calendar === "Gregorian") {
      TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(NumericDate))}`;
      if (Task.CompletedAt) {
        TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(NumericDate))}\u00A0\u00A0${
          Strings.CompletedAt[UserSettings.CurrentLang]
        }\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(CompletedAt))}\u00A0\u00A0${NumericToTime(CompletedAt)}`;
      } else if (Task.FailedAt) {
        TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(NumericDate))}\u00A0\u00A0${
          Strings.FailedAt[UserSettings.CurrentLang]
        }\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(FailedAt))}\u00A0\u00A0${NumericToTime(FailedAt)}`;
      } else if (Task.TrashedAt) {
        TaskExtraInfo.textContent = `${PlacePersianNumbers(NumericToTime(NumericDate))}\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(NumericDate))}\u00A0\u00A0${
          Strings.TrashedAt[UserSettings.CurrentLang]
        }\u00A0\u00A0${PlacePersianNumbers(NumericToGregorian(TrashedAt))}\u00A0\u00A0${NumericToTime(TrashedAt)}`;
      }
    }
    FragmentOfTaskContainers.append(TaskContainer);
  });
  ListSection.append(FragmentOfTaskContainers);
}
function ClearListSection() {
  /* Clearing list section or the html element that contains to do element happens 
  very often so it make sense to have a function for it */
  let ListSection = document.querySelector(".list-section");
  if (!ListSection) return;
  ListSection.innerHTML = "";
}
// Functionalities
function EmptyBox(Text, TargetSelector) {
  /* Look into functions that Start with Load and End with Tasks inside TaskManager.js to trace proces of this function.
  It fires when you choose a window but there are not data avaiable for it for example if you choose Home-Today
  but you have no tasks for today! */
  if (!TargetSelector) {
    DisplayMessage("Error", "DOMManager.js > EmptyBox(). No selector passed to emptybox");
    return;
  }
  const TargetElem = document.querySelector(TargetSelector);
  const EmptyBoxIconContainer = document.createElement("section");
  EmptyBoxIconContainer.className = "empty-box-container";
  // Empty box icon
  const EmptyBoxIcon = document.createElement("img");
  EmptyBoxIcon.src = IconsSrc.EmptyBoxIcon[UserSettings.Theme];
  // Empty box text
  const EmptyBoxText = document.createElement("p");
  EmptyBoxText.className = "empty-box-text text";
  EmptyBoxText.innerText = Text;
  // Modifing Target
  TargetElem.innerHTML = "";
  // Appending to DOM
  EmptyBoxIconContainer.append(EmptyBoxIcon, EmptyBoxText);
  TargetElem.append(EmptyBoxIconContainer);
}
function HighLightSelectedSortButton() {
  const SortButton = document.querySelectorAll(".sort-buttons");
  SortButton.forEach((Button) => {
    // We first un-hover everything before deciding witch element needs to be hovered based on AppoObj.CurrentWindow
    Button.classList.remove("hovered");
  });
  if (AppObj.CurrentWindow.includes("All")) {
    document.querySelector("#sort-all-trash").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Unfinished")) {
    document.querySelector("#sort-unfinished").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Today")) {
    document.querySelector("#sort-today").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Tomorrow")) {
    document.querySelector("#sort-tomorrow").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("In2Days")) {
    document.querySelector("#sort-in-2-days").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Completed")) {
    document.querySelector("#sort-completed").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Failed")) {
    document.querySelector("#sort-failed").classList.add("hovered");
  }
}
function HighLightSelectedSideBarItem() {
  /* the sidebar items and open up a seperate window need to get highlighted so you know where you are
  this does not include items such is New task or New category witch only open up a modal*/
  const SidebarItem = document.querySelectorAll(".side-bar-item");
  SidebarItem.forEach((Item) => {
    // We first un-hover everything before deciding witch element needs to be hovered based on AppoObj.CurrentWindow
    Item.classList.remove("hovered");
  });
  if (AppObj.CurrentWindow.includes("Home")) {
    document.querySelector(".home-button").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Trash")) {
    document.querySelector(".trash-bin-button").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("Notes")) {
    document.querySelector(".notes-button").classList.add("hovered");
  }
  if (AppObj.CurrentWindow.includes("UserCategory")) {
    SidebarItem.forEach((Item) => {
      Item.classList.remove("hovered");
    });
  }
}
function DisplaySelectModeBar() {
  // When you select a task a bar shows up at bottom showing you a Clear selection button and a text
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
  RestoreButton.addEventListener("click", RestoreTasks);
  // Append
  SelectBar.append(ExistSelectModeButton, SelectedItemsElem, DeleteButton);
  if (AppObj.CurrentWindow.includes("UserCategory") || ["Home-Unfinished", "Home-Today", "Home-Tomorrow", "Home-In2Days"].includes(AppObj.CurrentWindow)) {
    SelectBar.append(MoveToTrashButton, FailButton, CompleteButton);
    DeleteButton.addEventListener("click", () => DeleteModal("Normal"));
  }
  if (AppObj.CurrentWindow.includes("Trash")) {
    SelectBar.append(RestoreButton);
    DeleteButton.addEventListener("click", () => DeleteModal("Trashed"));
  }
  if (AppObj.CurrentWindow === "Home-Failed") {
    DeleteButton.addEventListener("click", () => DeleteModal("Failed"));
    SelectBar.append(MoveToTrashButton, RestoreButton);
  }
  if (AppObj.CurrentWindow === "Home-Completed") {
    SelectBar.append(MoveToTrashButton, FailButton, RestoreButton);
    DeleteButton.addEventListener("click", () => DeleteModal("Completed"));
  }
  document.body.append(SelectBar);
}
function HideSelectModeBar() {
  const SelectBar = document.querySelector(".select-bar");
  const ListSection = document.querySelector(".list-section");
  if (SelectBar) SelectBar.remove();
  if (ListSection) ListSection.classList.remove("padding-bottom");
}

function FixDirection() {
  // Based on the language being RTL or LTR we load different css files
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
here through insertRule() and the values are stored inside Json/Theme.json 
*/

function HexToFilter(hex) {
  // SVG icons can not get color property directly this function will turn a hex code into a css filter property
  class Color {
    constructor(r, g, b) {
      this.set(r, g, b);
    }

    toString() {
      return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    set(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
      angle = (angle / 180) * Math.PI;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      this.multiply([
        0.213 + cos * 0.787 - sin * 0.213,
        0.715 - cos * 0.715 - sin * 0.715,
        0.072 - cos * 0.072 + sin * 0.928,
        0.213 - cos * 0.213 + sin * 0.143,
        0.715 + cos * 0.285 + sin * 0.14,
        0.072 - cos * 0.072 - sin * 0.283,
        0.213 - cos * 0.213 - sin * 0.787,
        0.715 - cos * 0.715 + sin * 0.715,
        0.072 + cos * 0.928 + sin * 0.072,
      ]);
    }

    grayscale(value = 1) {
      this.multiply([
        0.2126 + 0.7874 * (1 - value),
        0.7152 - 0.7152 * (1 - value),
        0.0722 - 0.0722 * (1 - value),
        0.2126 - 0.2126 * (1 - value),
        0.7152 + 0.2848 * (1 - value),
        0.0722 - 0.0722 * (1 - value),
        0.2126 - 0.2126 * (1 - value),
        0.7152 - 0.7152 * (1 - value),
        0.0722 + 0.9278 * (1 - value),
      ]);
    }

    sepia(value = 1) {
      this.multiply([
        0.393 + 0.607 * (1 - value),
        0.769 - 0.769 * (1 - value),
        0.189 - 0.189 * (1 - value),
        0.349 - 0.349 * (1 - value),
        0.686 + 0.314 * (1 - value),
        0.168 - 0.168 * (1 - value),
        0.272 - 0.272 * (1 - value),
        0.534 - 0.534 * (1 - value),
        0.131 + 0.869 * (1 - value),
      ]);
    }

    saturate(value = 1) {
      this.multiply([
        0.213 + 0.787 * value,
        0.715 - 0.715 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 + 0.285 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 - 0.715 * value,
        0.072 + 0.928 * value,
      ]);
    }

    multiply(matrix) {
      const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    }

    brightness(value = 1) {
      this.linear(value);
    }
    contrast(value = 1) {
      this.linear(value, -(0.5 * value) + 0.5);
    }

    linear(slope = 1, intercept = 0) {
      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
      this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
    }

    hsl() {
      // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
      const r = this.r / 255;
      const g = this.g / 255;
      const b = this.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return {
        h: h * 100,
        s: s * 100,
        l: l * 100,
      };
    }

    clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }
      return value;
    }
  }

  class Solver {
    constructor(target, baseColor) {
      this.target = target;
      this.targetHSL = target.hsl();
      this.reusedColor = new Color(0, 0, 0);
    }

    solve() {
      const result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values),
      };
    }

    solveWide() {
      const A = 5;
      const c = 15;
      const a = [60, 180, 18000, 600, 1.2, 1.2];

      let best = { loss: Infinity };
      for (let i = 0; best.loss > 25 && i < 3; i++) {
        const initial = [50, 20, 3750, 50, 100, 100];
        const result = this.spsa(A, a, c, initial, 1000);
        if (result.loss < best.loss) {
          best = result;
        }
      }
      return best;
    }

    solveNarrow(wide) {
      const A = wide.loss;
      const c = 2;
      const A1 = A + 1;
      const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
      const alpha = 1;
      const gamma = 0.16666666666666666;

      let best = null;
      let bestLoss = Infinity;
      const deltas = new Array(6);
      const highArgs = new Array(6);
      const lowArgs = new Array(6);

      for (let k = 0; k < iters; k++) {
        const ck = c / Math.pow(k + 1, gamma);
        for (let i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }

        const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
        for (let i = 0; i < 6; i++) {
          const g = (lossDiff / (2 * ck)) * deltas[i];
          const ak = a[i] / Math.pow(A + k + 1, alpha);
          values[i] = fix(values[i] - ak * g, i);
        }

        const loss = this.loss(values);
        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }
      return { values: best, loss: bestLoss };

      function fix(value, idx) {
        let max = 100;
        if (idx === 2 /* saturate */) {
          max = 7500;
        } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
          max = 200;
        }

        if (idx === 3 /* hue-rotate */) {
          if (value > max) {
            value %= max;
          } else if (value < 0) {
            value = max + (value % max);
          }
        } else if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }
        return value;
      }
    }

    loss(filters) {
      // Argument is array of percentages.
      const color = this.reusedColor;
      color.set(0, 0, 0);

      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);

      const colorHSL = color.hsl();
      return (
        Math.abs(color.r - this.target.r) +
        Math.abs(color.g - this.target.g) +
        Math.abs(color.b - this.target.b) +
        Math.abs(colorHSL.h - this.targetHSL.h) +
        Math.abs(colorHSL.s - this.targetHSL.s) +
        Math.abs(colorHSL.l - this.targetHSL.l)
      );
    }

    css(filters) {
      function fmt(idx, multiplier = 1) {
        return Math.round(filters[idx] * multiplier);
      }
      return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
    }
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  }
  let color = new Color(...hexToRgb(hex));
  let solver = new Solver(color);
  let result = solver.solve();
  let filterCSS = result.filter;
  // if (+result.loss.toFixed(1) > 0.9) {
  //   return HexToFilter(hex);
  // } else {
  //   return filterCSS;
  // }
  return filterCSS;
}
function HexToRgba(Hex, Opacity) {
  /* Since i added the ability for user to change color and background-color 
  of elements with an opacity this function is made to make the job easy */
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(Hex)) {
    c = Hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + `,${Opacity})`;
  }
  throw new Error("Bad Hex");
}
function InsertRules() {
  for (let i in ThemeObj) {
    if (i === "Hovered") {
      const HoveredRule = `
       .hovered {
         background-color : ${ThemeObj.Hovered.Themes[UserSettings.Theme].BgColor} !important;    
        }    
    `;
      document.styleSheets[0].insertRule(HoveredRule);
      continue;
    }
    if (i === "Icons") {
      let SvgIconColorRule = `
      .icon{
       ${HexToFilter(ThemeObj[i].Themes[UserSettings.Theme].Color)}
      }
      `;
      if (SvgIconColorRule) document.styleSheets[0].insertRule(SvgIconColorRule);
      continue;
    }
    const BgColorRule = () => {
      const BgColor = ThemeObj[i].Themes[UserSettings.Theme]?.BgColor;
      if (!BgColor) return null;
      return `
    ${ThemeObj[i].Selector} {
    background-color : ${HexToRgba(
      ThemeObj[i].Themes[UserSettings.Theme].BgColor,
      ThemeObj[i].Themes[UserSettings.Theme]?.Opacity ? ThemeObj[i].Themes[UserSettings.Theme].Opacity / 100 : 1
    )};    
    }
    `;
    };
    const ColorRule = () => {
      const Color = ThemeObj[i].Themes[UserSettings.Theme]?.Color;
      if (!Color) return null;
      return `
         ${ThemeObj[i].Selector} {
           color : ${HexToRgba(
             ThemeObj[i].Themes[UserSettings.Theme].Color,
             ThemeObj[i].Themes[UserSettings.Theme]?.TextOpacity ? ThemeObj[i].Themes[UserSettings.Theme].TextOpacity / 100 : 1
           )};    
          }    
          `;
    };
    const HoverBgColorRule = () => {
      let HoverBgColor = ThemeObj[i].Themes[UserSettings.Theme]?.Hover?.BgColor;
      if (HoverBgColor === "") {
        return `
        ${ThemeObj[i].Selector}:hover {
          background-color : transparent !important;    
        }    
        `;
      } else if (HoverBgColor === undefined) {
        return null;
      } else {
        return `
        ${ThemeObj[i].Selector}:hover {
          background-color : ${ThemeObj[i].Themes[UserSettings.Theme].Hover.BgColor}  !important;    
        }    
        `;
      }
    };
    const BorderRule = () => {
      let Border = ThemeObj[i].Themes[UserSettings.Theme]?.Border;
      if (Border) {
        if (Border[1] && Border[2] && Border[3] && Border[4]) {
          if (Border[0]) {
            return `
             ${ThemeObj[i].Selector} {
                border-${Border[0].toLowerCase()} : ${Border[1]}px ${Border[2]} ${HexToRgba(Border[3], Border[4] / 100)};    
              }    
              `;
          } else {
            return `
             ${ThemeObj[i].Selector} {
                border: ${Border[1]}px ${Border[2]} ${HexToRgba(Border[3], Border[4] / 100)};    
              }    
              `;
          }
        } else return null;
      }
    };
    if (BgColorRule()) document.styleSheets[0].insertRule(BgColorRule());
    if (ColorRule()) document.styleSheets[0].insertRule(ColorRule());
    if (HoverBgColorRule()) document.styleSheets[0].insertRule(HoverBgColorRule());
    if (BorderRule()) document.styleSheets[0].insertRule(BorderRule());
  }
}
// Window manager => we have different windows such as Home-Unfinished or Trash-All we use it to load tasks accordingly
function ChangeWindow(Window, FirstTime) {
  if (document.querySelector(".settings-container")) HideSettings();
  function ReplaceText(String) {
    // Regular expression to match the pattern
    const RegEx = /(UserCategory-\d+)|(.*?)-.*/;
    // Match the pattern in the string
    const Match = String.match(RegEx);
    if (Match) {
      // If the match starts with 'UserCategory-', return it as is
      if (Match[1] !== undefined) {
        return Match[1];
      } else {
        // Otherwise, return the matched group 2
        return Match[2];
      }
    }

    return String;
  }
  ExitSelectMode();
  if (!localStorage.getItem("LastWindow").includes(ReplaceText(Window)) || FirstTime) {
    /*
    In here we only need to know if we are eithr in Home/Trash/Notes or any category window
    we don't need to know if we are in Home-Today or UserCategory-42441243-In2Days
    because either way we need to create the DOM elements for that window. the usecase for this
    is further explained in second comment.
    */

    /*
    Very Important
    !localStorage.getItem("LastWindow").includes(ReplaceText(Window)) || FirstTime
    what is this condition and what is its use ? 
    well this condition checks if the change of window is Internal or External 
    for exmaple switching from Home-Today to Trash-All or Notes is External 
    because you completly get rid of on window element and append new one
    but switching from Home-Today to HomeIn2Days is internal because you still
    use same DOM elements you just Update the content witch are the to dos 
    if this condition is not checked everytime you do an Intenal switcing you 
    unneccesarilly append new element and this is nor efficient nor user-friendly
    so we only come inside this block if the app is loaded for first time or page is reloaded
    or the change of window is external , for Internal changes we use UpdateInbox()
    */

    if (Window.includes("Home")) {
      DisplayHomeWindow(true);
    }
    if (Window.includes("Notes")) {
      DisplayNotesWindow(true);
    }
    if (Window.includes("Trash")) {
      DisplayTrashBinWindow(true);
    }
    if (Window.includes("UserCategory")) {
      let CategoryID = Window.slice(0, 21);
      AppObj.SelectedUserCategory = CategoryID;
      DisplayUserCategoryWindow(CategoryID);
    }
  }
  AppObj.CurrentWindow = Window.toString();
  localStorage.setItem("LastWindow", Window);
  /* Do not make a mistak SelectedUserCategory variable and CurrentWindow are not duplicate
  they each have their own usecase alot of times we need to find out witch category is now open
  but if we just want to rely on CurrentWindow variable we need to do some regex on it everytime */
  if (!Window.includes("UserCategory")) AppObj.SelectedUserCategory = "";
  /* When you switch categories while having the New task modal open it is convinient to
  change the value of category select box for the user */
  if (AppObj.CurrentWindow.includes("UserCategory-") && DoesElementExist("new-task-modal")) {
    SwitchValueOfCategorySelectBox(AppObj.SelectedUserCategory);
  }
  UpdateInbox();
  HighLightSelectedSortButton();
  HighLightSelectedSideBarItem();
}
