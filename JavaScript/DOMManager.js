function HighLightSelectedSideBarItem(ID) {
  return new Promise((Resolve, Reject) => {
    localStorage.setItem("SelectedSideBarItem", ID.toString());
    let SideBarItems = document.querySelectorAll(".side-bar-item");
    for (n in SideBarItems) {
      if (SideBarItems[n].id === ID) {
        SideBarItems[n].style.backgroundColor = "#40C057";
      } else {
        SideBarItems[n].style = "";
        SideBarItems[n].style = "";
      }
    }
    Resolve();
  });
}
function FixDirection() {
  return new Promise((resolve, reject) => {
    let MainStyleSheet = document.getElementById("main-style-sheet");
    switch (UserSettings.CurrentLang) {
      case "en":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "fa":
        MainStyleSheet.href = "Styles/Main/style_rtl.css";
        break;
      case "ar":
        MainStyleSheet.href = "Styles/Main/style_rtl.css";
        break;
      case "es":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "fr":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "de":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "ru":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "zh":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "hi":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "ja":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "kr":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "pt":
        MainStyleSheet.href = "Styles/Main/style_ltr.css";
        break;
      case "ur":
        MainStyleSheet.href = "Styles/Main/style_rtl.css";
        break;
    }
    resolve();
  });
}
function AppendHTMLElements(Action, Array) {
  let TaskArray = Array;
  if (Action === "AppendTopBar") {
    if (DoesElementExist("top-bar")) return;
    const TopBar = document.createElement("section");
    TopBar.id = "top-bar";
    const DisplayText = document.createElement("section");
    DisplayText.id = "display-text";
    TopBar.appendChild(DisplayText);
    document.body.appendChild(TopBar);
  }
  if (Action === "AppendTaskSection") {
    if (DoesElementExist("tasks-section")) return;
    const TaskSection = document.createElement("section");
    const ListSection = document.createElement("section");
    TaskSection.id = "tasks-section";
    ListSection.id = "list-section";
    TaskSection.appendChild(ListSection);
    document.body.appendChild(TaskSection);
  }
  if (Action === "AppendTaskBar") {
    if (DoesElementExist("task-bar")) return;
    const TaskBar = document.createElement("section");
    const SelectAllSection = document.createElement("section");
    const TaskButtonContainer = document.createElement("section");
    const CategoryBar = document.createElement("section");
    TaskBar.id = "task-bar";
    SelectAllSection.id = "select-all-section";
    TaskButtonContainer.id = "task-buttons-container";
    CategoryBar.id = "category-bar";
    TaskBar.appendChild(SelectAllSection);
    TaskBar.appendChild(TaskButtonContainer);
    TaskBar.appendChild(CategoryBar);
    if (DoesElementExist("trash-bin-section")) document.getElementById("trash-bin-section").appendChild(TaskBar);
    if (DoesElementExist("tasks-section")) document.getElementById("tasks-section").appendChild(TaskBar);
  }
  if (Action === "AppendSideBar") {
    if (DoesElementExist("side-bar")) return;
    // Defining Items (buttons)
    const SideBar = document.createElement("aside");
    const SideBarFooter = document.createElement("footer");
    const UserCategoryContainer = document.createElement("section");
    const Clock = document.createElement("section");
    const TimeIcon = document.createElement("span");
    const Time = document.createElement("span");
    const FullDate = document.createElement("section");
    const HomeButton = document.createElement("button");
    const NewTaskButton = document.createElement("button");
    const NewCategoryButton = document.createElement("button");
    const Calendar = document.createElement("button");
    const Notes = document.createElement("button");
    const Alarms = document.createElement("button");
    const TrashBin = document.createElement("button");
    const SettingsButton = document.createElement("button");
    // Defining Icons
    const HomeButtonIcon = document.createElement("img");
    const NewTaskButtonIcon = document.createElement("img");
    const NewCategoryButtonIcon = document.createElement("img");
    const CalendarIcon = document.createElement("img");
    const NotesIcon = document.createElement("img");
    const AlarmsIcon = document.createElement("img");
    const TrashBinIcon = document.createElement("img");
    const SettingsButtonIcon = document.createElement("img");
    // Defining Items Text
    const HomeButtonText = document.createElement("span");
    const NewTaskButtonText = document.createElement("span");
    const NewCategoryButtonText = document.createElement("span");
    const CalendarText = document.createElement("span");
    const NotesText = document.createElement("span");
    const AlarmsText = document.createElement("span");
    const TrashBinText = document.createElement("span");
    const SettingsButtonText = document.createElement("span");
    // Assing classNames to Items
    HomeButton.className = "side-bar-item";
    NewTaskButton.className = "side-bar-item";
    NewCategoryButton.className = "side-bar-item";
    Calendar.className = "side-bar-item";
    Notes.className = "side-bar-item";
    Alarms.className = "side-bar-item";
    TrashBin.className = "side-bar-item";
    SettingsButton.className = "side-bar-item";
    // Assining classNames to icons
    HomeButtonIcon.className = "side-bar-item-icon";
    NewTaskButtonIcon.className = "side-bar-item-icon";
    NewCategoryButtonIcon.className = "side-bar-item-icon";
    CalendarIcon.className = "side-bar-item-icon";
    NotesIcon.className = "side-bar-item-icon";
    AlarmsIcon.className = "side-bar-item-icon";
    TrashBinIcon.className = "side-bar-item-icon";
    SettingsButtonIcon.className = "side-bar-item-icon";
    // Assining classNames to Texts
    HomeButtonText.className = "side-bar-item-text";
    NewTaskButtonText.className = "side-bar-item-text";
    NewCategoryButtonText.className = "side-bar-item-text";
    CalendarText.className = "side-bar-item-text";
    NotesText.className = "side-bar-item-text";
    AlarmsText.className = "side-bar-item-text";
    TrashBinText.className = "side-bar-item-text";
    SettingsButtonText.className = "side-bar-item-text";
    // Assign sources to icons
    HomeButtonIcon.src = `Icons/HomeIcon.png`;
    NewTaskButtonIcon.src = `Icons/NewTaskIcon.png`;
    NewCategoryButtonIcon.src = `Icons/NewCategoryIcon.png`;
    CalendarIcon.src = `Icons/CalendarIcon.png`;
    NotesIcon.src = `Icons/NotesIcon.png`;
    AlarmsIcon.src = `Icons/AlarmsIcon.png`;
    TrashBinIcon.src = `Icons/TrashBinIcon.png`;
    SettingsButtonIcon.src = `Icons/SettingsIcon.png`;
    // Assidn ID to Items
    SideBar.id = "side-bar";
    SideBarFooter.id = "side-bar-footer";
    UserCategoryContainer.id = "user-category-container";
    Clock.id = "clock";
    TimeIcon.id = "time-icon";
    Time.id = "time";
    Time.setAttribute("inert", "");
    FullDate.id = "full-date";
    FullDate.setAttribute("inert", "");
    HomeButton.id = "home-button";
    NewTaskButton.id = "new-task-button";
    NewCategoryButton.id = "new-category-button";
    Calendar.id = "calendar-button";
    Notes.id = "notes-button";
    Alarms.id = "alarms-button";
    TrashBin.id = "trash-bin-button";
    SettingsButton.id = "settings-button";
    // Assign ID to Texts
    HomeButtonText.id = "home-button-text";
    NewTaskButtonText.id = "new-task-button-text";
    NewCategoryButtonText.id = "new-category-button-text";
    CalendarText.id = "calendar-button-text";
    NotesText.id = "notes-button-text";
    AlarmsText.id = "alarms-button-text";
    TrashBinText.id = "trash-bin-button-text";
    SettingsButtonText.id = "settings-button-text";
    // Assining InnerText
    HomeButtonText.innerText = Strings.HomeButton[UserSettings.CurrentLang];
    NewTaskButtonText.innerText = Strings.NewTaskButton[UserSettings.CurrentLang];
    NewCategoryButtonText.innerText = Strings.NewCategoryButton[UserSettings.CurrentLang];
    CalendarText.innerText = Strings.CalendarButton[UserSettings.CurrentLang];
    NotesText.innerText = Strings.NotesButton[UserSettings.CurrentLang];
    AlarmsText.innerText = Strings.AlarmsButton[UserSettings.CurrentLang];
    TrashBinText.innerText = Strings.TrashBinButton[UserSettings.CurrentLang];
    SettingsButtonText.innerText = Strings.SettingsButton[UserSettings.CurrentLang];
    // Event Listeners
    HomeButton.addEventListener("click", () => {
      HighLightSelectedSideBarItem(HomeButton.id);
      DisplayHome();
    });
    NewTaskButton.addEventListener("click", () => {
      NewTaskPopUp();
    });
    NewCategoryButton.addEventListener("click", () => {
      NewCategoryPopUp();
    });
    Calendar.addEventListener("click", () => {
      HighLightSelectedSideBarItem(Calendar.id);
    });
    Notes.addEventListener("click", () => {
      HighLightSelectedSideBarItem(Notes.id);
    });
    Alarms.addEventListener("click", () => {
      HighLightSelectedSideBarItem(Alarms.id);
    });
    TrashBin.addEventListener("click", () => {
      HighLightSelectedSideBarItem(TrashBin.id);
      DisplayTrashBin();
    });
    SettingsButton.addEventListener("click", () => {
      DisplaySettings();
    });
    // Appending icons
    HomeButton.appendChild(HomeButtonIcon);
    NewTaskButton.appendChild(NewTaskButtonIcon);
    NewCategoryButton.appendChild(NewCategoryButtonIcon);
    Calendar.appendChild(CalendarIcon);
    Notes.appendChild(NotesIcon);
    Alarms.appendChild(AlarmsIcon);
    TrashBin.appendChild(TrashBinIcon);
    SettingsButton.appendChild(SettingsButtonIcon);
    // Appending texts
    // Append spans to buttons
    HomeButton.appendChild(HomeButtonText);
    NewTaskButton.appendChild(NewTaskButtonText);
    NewCategoryButton.appendChild(NewCategoryButtonText);
    Calendar.appendChild(CalendarText);
    Notes.appendChild(NotesText);
    Alarms.appendChild(AlarmsText);
    TrashBin.appendChild(TrashBinText);
    SettingsButton.appendChild(SettingsButtonText);
    // Appending buttons to side bar
    SideBar.appendChild(Clock);
    Clock.appendChild(TimeIcon);
    Clock.appendChild(Time);
    SideBar.appendChild(FullDate);
    SideBar.appendChild(HomeButton);
    SideBar.appendChild(NewTaskButton);
    SideBar.appendChild(NewCategoryButton);
    SideBar.appendChild(Calendar);
    SideBar.appendChild(Notes);
    SideBar.appendChild(Alarms);
    SideBar.appendChild(TrashBin);
    SideBar.appendChild(UserCategoryContainer);
    SideBarFooter.appendChild(SettingsButton);
    SideBar.appendChild(SideBarFooter);
    // Appending to DOM
    document.body.appendChild(SideBar);
  }
  if (Action === "AppendDeleteTaskButton") {
    if (DoesElementExist("delete-task-button")) return;
    let DeleteTaskButton = document.createElement("button");
    let DeleteTaskButtonIcon = document.createElement("img");
    DeleteTaskButton.id = "delete-task-button";
    DeleteTaskButtonIcon.id = "delete-task-button-icon";
    DeleteTaskButtonIcon.src = "Icons/TrashBinIcon.png";
    DeleteTaskButton.appendChild(DeleteTaskButtonIcon);
    DeleteTaskButton.addEventListener("click", () => {
      if (DoesElementExist("trash-bin-section")) DeletePopUp("DeleteTrash");
      if (DoesElementExist("tasks-section")) DeletePopUp("Delete");
    });
    document.getElementById("task-buttons-container").appendChild(DeleteTaskButton);
  }
  if (Action === "AppendCompleteTaskButton") {
    if (document.getElementById("restore-task-button")) {
      document.getElementById("restore-task-button").remove();
    }
    if (document.getElementById("task-completed-button")) return;
    let CompleteTaskButton = document.createElement("button");
    let CompletedTaskButtonIcon = document.createElement("img");
    CompleteTaskButton.id = "task-completed-button";
    CompletedTaskButtonIcon.id = "task-completed-button-icon";
    CompletedTaskButtonIcon.src = "Icons/DoneIcon.png";
    CompleteTaskButton.appendChild(CompletedTaskButtonIcon);
    CompleteTaskButton.addEventListener("click", CompleteTask);
    document.getElementById("task-buttons-container").appendChild(CompleteTaskButton);
  }
  if (Action === "AppendRestoreTaskButton") {
    if (DoesElementExist("task-completed-button")) {
      document.getElementById("task-completed-button").remove();
    }
    if (DoesElementExist("restore-task-button")) return;
    let RestoreTasksButton = document.createElement("button");
    RestoreTasksButton.id = "restore-task-button";
    let RestoreTasksButtonIcon = document.createElement("img");
    RestoreTasksButtonIcon.id = "restore-task-button-icon";
    RestoreTasksButtonIcon.src = "Icons/RestoreIcon.png";
    RestoreTasksButton.appendChild(RestoreTasksButtonIcon);
    RestoreTasksButton.addEventListener("click", function () {
      RestoreTasks();
    });
    document.getElementById("task-buttons-container").appendChild(RestoreTasksButton);
  }
  if (Action === "AppendFailTaskButton") {
    if (DoesElementExist("fail-task-button")) return;
    const FailTaskButton = document.createElement("button");
    FailTaskButton.id = "fail-task-button";
    const FailTaskButtonIcon = document.createElement("img");
    FailTaskButtonIcon.id = "fail-task-button-icon";
    FailTaskButtonIcon.src = "Icons/FailedIcon.png";
    FailTaskButton.appendChild(FailTaskButtonIcon);
    FailTaskButton.addEventListener("click", function () {
      FailTask();
    });
    document.getElementById("task-buttons-container").appendChild(FailTaskButton);
  }
  if (Action === "AppendSelectAllButton") {
    if (document.getElementById("select-all-button")) return;
    let SpanElement = document.createElement("span");
    SpanElement.textContent = Strings.SelectAllCheckBox[UserSettings.CurrentLang];
    let CheckBoxLable = document.createElement("label");
    CheckBoxLable.className = "checkbox-container";
    let CheckBox = document.createElement("input");
    CheckBox.type = "checkbox";
    CheckBox.id = "select-all-checkbox";
    CheckBox.className = "checkbox";
    let Checkmark = document.createElement("div");
    Checkmark.className = "checkmark";
    CheckBoxLable.appendChild(CheckBox);
    CheckBoxLable.appendChild(Checkmark);
    document.getElementById("select-all-section").innerHTML = "";
    document.getElementById("select-all-section").appendChild(SpanElement);
    document.getElementById("select-all-section").appendChild(CheckBoxLable);
    document.getElementById("select-all-checkbox").addEventListener("change", SelectAll);
  }
  if (Action === "AppendCategoryToDoButton") {
    if (document.getElementById("category-to-do")) return;
    const CategoryToDo = document.createElement("button");
    CategoryToDo.className = "category-buttons";
    CategoryToDo.id = "category-to-do";
    CategoryToDo.textContent = Strings.CategoryToDoButton[UserSettings.CurrentLang];
    CategoryToDo.addEventListener("click", () => {
      CategoriesTasks("category-to-do");
    });
    document.getElementById("category-bar").appendChild(CategoryToDo);
  }
  if (Action === "AppendCategoryTodayButton") {
    if (document.getElementById("category-today")) return;
    const CategoryToday = document.createElement("button");
    CategoryToday.className = "category-buttons";
    CategoryToday.id = "category-today";
    CategoryToday.textContent = Strings.CategoryTodayButton[UserSettings.CurrentLang];
    CategoryToday.addEventListener("click", () => {
      CategoriesTasks("category-today");
    });
    document.getElementById("category-bar").appendChild(CategoryToday);
  }
  if (Action === "AppendCategoryTomorrowButton") {
    if (document.getElementById("category-tomorrow")) return;
    const CategoryTomorrow = document.createElement("button");
    CategoryTomorrow.className = "category-buttons";
    CategoryTomorrow.id = "category-tomorrow";
    CategoryTomorrow.textContent = Strings.CategoryTomorrowButton[UserSettings.CurrentLang];
    CategoryTomorrow.addEventListener("click", () => {
      CategoriesTasks("category-tomorrow");
    });
    document.getElementById("category-bar").appendChild(CategoryTomorrow);
  }
  if (Action === "AppendCategoryCategoryIn2DaysButton") {
    if (document.getElementById("category-in-2-days")) return;
    const CategoryIn2Days = document.createElement("button");
    CategoryIn2Days.className = "category-buttons";
    CategoryIn2Days.id = "category-in-2-days";
    CategoryIn2Days.textContent = Strings.CategoryIn2DaysButton[UserSettings.CurrentLang];
    CategoryIn2Days.addEventListener("click", () => {
      CategoriesTasks("category-in-2-days");
    });
    document.getElementById("category-bar").appendChild(CategoryIn2Days);
  }
  if (Action === "AppendCategoryFailedButton") {
    if (document.getElementById("category-failed")) return;
    const CategoryFailed = document.createElement("button");
    CategoryFailed.className = "category-buttons";
    CategoryFailed.id = "category-failed";
    CategoryFailed.textContent = Strings.CategoryFailedButton[UserSettings.CurrentLang];
    CategoryFailed.addEventListener("click", () => {
      CategoriesTasks("category-failed");
    });
    document.getElementById("category-bar").appendChild(CategoryFailed);
  }
  if (Action === "AppendCategoryCompletedButton") {
    if (document.getElementById("category-completed")) return;
    const CategoryCompleted = document.createElement("button");
    CategoryCompleted.className = "category-buttons";
    CategoryCompleted.id = "category-completed";
    CategoryCompleted.textContent = Strings.CategoryCompletedButton[UserSettings.CurrentLang];
    CategoryCompleted.addEventListener("click", () => {
      CategoriesTasks("category-completed");
    });
    document.getElementById("category-bar").appendChild(CategoryCompleted);
  }
  if (Action === "AppendAllCategories") {
    AppendHTMLElements("AppendCategoryToDoButton");
    AppendHTMLElements("AppendCategoryTodayButton");
    AppendHTMLElements("AppendCategoryTomorrowButton");
    AppendHTMLElements("AppendCategoryCategoryIn2DaysButton");
    AppendHTMLElements("AppendCategoryFailedButton");
    AppendHTMLElements("AppendCategoryCompletedButton");
  }
  if (Action === "AppendFailedTaskContainer") {
    for (n of TaskArray) {
      let FailedTask = document.createElement("section");
      FailedTask.className = "task-container";
      FailedTask.id = n.ID.toString();
      let CheckBoxContainer = document.createElement("label");
      CheckBoxContainer.className = "checkbox-container";
      let Checkbox = document.createElement("input");
      Checkbox.type = "checkbox";
      Checkbox.className = "checkbox";
      Checkbox.addEventListener("change", CheckForSelectedTasks);
      let CheckMark = document.createElement("div");
      CheckMark.className = "checkmark";
      let FailedTaskTitle = document.createElement("strike");
      FailedTaskTitle.className = "task-title";
      FailedTaskTitle.setAttribute("inert", "");
      let DateContainer = document.createElement("section");
      DateContainer.className = "date-container";
      DateContainer.classList.add("disabled");
      let FailedTaskDate = document.createElement("section");
      FailedTaskDate.className = "task-date";
      let FailedTaskTime = document.createElement("section");
      FailedTaskTime.className = "task-time";
      let FailedTaskBadge = document.createElement("span");
      FailedTaskBadge.className = "failed-task-badge";
      FailedTaskBadge.innerHTML = Strings.FailedTaskBadge[UserSettings.CurrentLang];
      FailedTaskBadge.setAttribute("inert", "");
      FailedTask.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Failed");
      });
      FailedTask.appendChild(CheckBoxContainer);
      CheckBoxContainer.appendChild(Checkbox);
      CheckBoxContainer.appendChild(CheckMark);
      FailedTask.appendChild(FailedTaskTitle);
      FailedTask.appendChild(FailedTaskBadge);
      FailedTask.appendChild(DateContainer);
      DateContainer.appendChild(FailedTaskDate);
      DateContainer.appendChild(FailedTaskTime);
      FailedTaskTitle.textContent = n.Title;
      FailedTaskDate.textContent = n.DisplayDate;
      FailedTaskTime.textContent = n.DisplayTime;
      document.getElementById("list-section").appendChild(FailedTask);
    }
  }
  if (Action === "AppendCompletedTaskContainer") {
    for (CompletedTaskCounter = 0; CompletedTaskCounter < TaskArray.length; CompletedTaskCounter++) {
      let CompletedTask = document.createElement("section");
      CompletedTask.className = "task-container";
      CompletedTask.id = TaskArray[CompletedTaskCounter].ID.toString();
      let CheckBoxContainer = document.createElement("label");
      CheckBoxContainer.className = "checkbox-container";
      let Checkbox = document.createElement("input");
      Checkbox.type = "checkbox";
      Checkbox.className = "checkbox";
      Checkbox.addEventListener("change", CheckForSelectedTasks);
      let CheckMark = document.createElement("div");
      CheckMark.className = "checkmark";
      let TaskTitle = document.createElement("section");
      TaskTitle.className = "task-title";
      TaskTitle.setAttribute("inert", "");
      let DateContainer = document.createElement("section");
      DateContainer.className = "date-container";
      DateContainer.classList.add("disabled");
      let TaskDate = document.createElement("section");
      TaskDate.className = "task-date";
      let TaskTime = document.createElement("section");
      TaskTime.className = "task-time";
      let CompletedTaskBadge = document.createElement("span");
      CompletedTaskBadge.className = "completed-task-badge";
      CompletedTaskBadge.innerHTML = Strings.CompletedTaskBadge[UserSettings.CurrentLang];
      CompletedTaskBadge.setAttribute("inert", "");
      CompletedTask.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Completed");
      });
      CompletedTask.appendChild(CheckBoxContainer);
      CheckBoxContainer.appendChild(Checkbox);
      CheckBoxContainer.appendChild(CheckMark);
      CompletedTask.appendChild(TaskTitle);
      CompletedTask.appendChild(DateContainer);
      DateContainer.appendChild(TaskDate);
      DateContainer.appendChild(TaskTime);
      TaskTitle.textContent = TaskArray[CompletedTaskCounter].Title;
      TaskDate.textContent = TaskArray[CompletedTaskCounter].DisplayDate;
      TaskTime.textContent = TaskArray[CompletedTaskCounter].DisplayTime;
      CompletedTask.appendChild(CompletedTaskBadge);
      document.getElementById("list-section").appendChild(CompletedTask);
    }
  }
  if (Action === "AppendTaskContainer") {
    for (n of TaskArray) {
      const TaskContainer = document.createElement("section");
      TaskContainer.className = "task-container";
      TaskContainer.id = n.ID.toString();
      const CheckBoxContainer = document.createElement("label");
      CheckBoxContainer.className = "checkbox-container";
      const Checkbox = document.createElement("input");
      Checkbox.type = "checkbox";
      Checkbox.className = "checkbox";
      Checkbox.addEventListener("change", CheckForSelectedTasks);
      const CheckMark = document.createElement("div");
      CheckMark.className = "checkmark";
      const TaskTitle = document.createElement("section");
      TaskTitle.className = "task-title";
      TaskTitle.setAttribute("inert", "");
      const DateContainer = document.createElement("section");
      DateContainer.className = "date-container";
      const TaskDate = document.createElement("section");
      TaskDate.className = "task-date";
      const TaskTime = document.createElement("section");
      TaskTime.className = "task-time";
      TaskContainer.addEventListener("contextmenu", (Event) => {
        Event.preventDefault();
        DisplayTaskContextMenu(Event, "Normal");
      });
      TaskContainer.appendChild(CheckBoxContainer);
      CheckBoxContainer.appendChild(Checkbox);
      CheckBoxContainer.appendChild(CheckMark);
      TaskContainer.appendChild(TaskTitle);
      TaskContainer.appendChild(DateContainer);
      DateContainer.appendChild(TaskDate);
      DateContainer.appendChild(TaskTime);
      if (n.UserCategory !== "None") {
        let Color;
        let Name;
        let Icon;
        UserCategoriesArray.forEach((Category) => {
          if (Category.ID === n.UserCategory) {
            Color = Category.Color;
            Name = Category.Name;
            Icon = Category.Icon;
          }
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
        CategoryBadge.appendChild(CategoryBadgeIcon);
        CategoryBadge.appendChild(CategoryBadgeName);
        TaskContainer.appendChild(CategoryBadge);
      }
      TaskTitle.textContent = n.Title;
      TaskDate.textContent = n.DisplayDate;
      TaskTime.textContent = n.DisplayTime;
      document.getElementById("list-section").appendChild(TaskContainer);
    }
  }
}
function ClearListSection() {
  document.getElementById("list-section").innerHTML = "";
  document.getElementById("list-section").style = "";
}
function EmptyBox(Text) {
  const EmptyBoxIconContainer = document.createElement("section");
  EmptyBoxIconContainer.id = "empty-box-container";
  // Empty box icon
  const EmptyBoxIcon = document.createElement("img");
  EmptyBoxIcon.src = "Icons/EmptyIcon.png";
  EmptyBoxIconContainer.appendChild(EmptyBoxIcon);
  // Empty box text
  const EmptyBoxText = document.createElement("p");
  EmptyBoxText.id = "empty-box-text";
  EmptyBoxIconContainer.appendChild(EmptyBoxText);
  EmptyBoxText.innerText = Text;
  // Modifing List Section
  ClearListSection();
  document.getElementById("list-section").style.display = "flex";
  document.getElementById("list-section").style.alignItems = "center";
  document.getElementById("list-section").style.justifyContent = "center";
  // Appending to DOM
  document.getElementById("list-section").appendChild(EmptyBoxIconContainer);
}
function CheckForSelectedTasks() {
  let CheckBoxes = document.querySelectorAll(".task-container input[type='checkbox']");
  let CheckedBoxes = [];
  CheckBoxes.forEach(function (CheckBox) {
    if (CheckBox.checked) {
      CheckedBoxes.push(CheckBox);
    }
  });
  if (CheckedBoxes.length < 1) {
    if (DoesElementExist("select-all-checkbox") && document.getElementById("select-all-checkbox").checked) {
      document.getElementById("select-all-checkbox").checked = false;
    }
    DisableTaskBarButtons();
  } else {
    EnableTaskBarButtons();
  }
}
function SelectAll() {
  let CheckBoxes = document.getElementById("list-section").querySelectorAll(".checkbox");
  if (document.getElementById("select-all-checkbox").checked) {
    for (n of CheckBoxes) {
      n.checked = true;
    }
    CheckForSelectedTasks();
  } else {
    for (n of CheckBoxes) {
      n.checked = false;
    }
    CheckForSelectedTasks();
  }
}
function DisplayHome() {
  HighLightSelectedSideBarItem("home-button");
  if (DoesElementExist("settings-container")) {
    HideSettings();
  }
  if (DoesElementExist("trash-bin-section")) {
    document.getElementById("trash-bin-section").remove();
  }
  if (DoesElementExist("user-category-page")) {
    document.getElementById("user-category-page").remove();
  }
  AppendHTMLElements("AppendTaskSection");
  AppendHTMLElements("AppendTaskBar");
  AppendHTMLElements("AppendSelectAllButton");
  AppendHTMLElements("AppendDeleteTaskButton");
  AppendHTMLElements("AppendCompleteTaskButton");
  AppendHTMLElements("AppendFailTaskButton");
  AppendHTMLElements("AppendAllCategories");
  if (localStorage.getItem("SelectedCategory").includes("UserCategory")) {
    CategoriesTasks("category-to-do");
  }
  // includes category- indiciates the selected category is one of main 5 categories and not a user generated one
  if (localStorage.getItem("SelectedCategory").includes("category-")) {
    CategoriesTasks(localStorage.getItem("SelectedCategory"));
  }
}
function DisableSelectAllOption() {
  document.getElementById("select-all-checkbox") && document.getElementById("select-all-checkbox").disabled === false
    ? ((document.getElementById("select-all-checkbox").disabled = true),
      document.querySelector("#select-all-section span").classList.add("disabled"),
      document.querySelector("#select-all-section .checkbox-container").classList.add("disabled"))
    : undefined;
}
function EnableSelectAllOption() {
  document.getElementById("select-all-checkbox") && document.getElementById("select-all-checkbox").disabled === true
    ? ((document.getElementById("select-all-checkbox").disabled = false),
      document.querySelector("#select-all-section span").classList.remove("disabled"),
      document.querySelector("#select-all-section .checkbox-container").classList.remove("disabled"))
    : undefined;
}
function DisableTaskBarButtons() {
  DoesElementExist("delete-task-button") && document.getElementById("delete-task-button").disabled === false
    ? ((document.getElementById("delete-task-button").disabled = true),
      document.getElementById("delete-task-button").classList.add("disabled"))
    : undefined;
  DoesElementExist("restore-task-button") && document.getElementById("restore-task-button").disabled === false
    ? ((document.getElementById("restore-task-button").disabled = true),
      document.getElementById("restore-task-button").classList.add("disabled"))
    : undefined;
  DoesElementExist("fail-task-button") && document.getElementById("fail-task-button").disabled === false
    ? ((document.getElementById("fail-task-button").disabled = true),
      document.getElementById("fail-task-button").classList.add("disabled"))
    : undefined;
  DoesElementExist("task-completed-button") && document.getElementById("task-completed-button").disabled === false
    ? ((document.getElementById("task-completed-button").disabled = true),
      document.getElementById("task-completed-button").classList.add("disabled"))
    : undefined;
}
function EnableTaskBarButtons() {
  DoesElementExist("delete-task-button") && document.getElementById("delete-task-button").disabled === true
    ? ((document.getElementById("delete-task-button").disabled = false),
      document.getElementById("delete-task-button").classList.remove("disabled"))
    : undefined;
  DoesElementExist("restore-task-button") && document.getElementById("restore-task-button").disabled === true
    ? ((document.getElementById("restore-task-button").disabled = false),
      document.getElementById("restore-task-button").classList.remove("disabled"))
    : undefined;
  DoesElementExist("fail-task-button") && document.getElementById("fail-task-button").disabled === true
    ? ((document.getElementById("fail-task-button").disabled = false),
      document.getElementById("fail-task-button").classList.remove("disabled"))
    : undefined;
  DoesElementExist("task-completed-button") && document.getElementById("task-completed-button").disabled === true
    ? ((document.getElementById("task-completed-button").disabled = false),
      document.getElementById("task-completed-button").classList.remove("disabled"))
    : undefined;
}
function RefreshItemsInnerText() {
  // Side Bar
  if (DoesElementExist("home-button-text"))
    document.getElementById("home-button-text").innerText = Strings.HomeButton[UserSettings.CurrentLang];

  if (DoesElementExist("new-task-button-text"))
    document.getElementById("new-task-button-text").innerText = Strings.NewTaskButton[UserSettings.CurrentLang];

  if (DoesElementExist("new-category-button-text"))
    document.getElementById("new-category-button-text").innerText = Strings.NewCategoryButton[UserSettings.CurrentLang];

  if (DoesElementExist("calendar-button-text"))
    document.getElementById("calendar-button-text").innerText = Strings.CalendarButton[UserSettings.CurrentLang];

  if (DoesElementExist("notes-button-text"))
    document.getElementById("notes-button-text").innerText = Strings.NotesButton[UserSettings.CurrentLang];

  if (DoesElementExist("alarms-button-text"))
    document.getElementById("alarms-button-text").innerText = Strings.AlarmsButton[UserSettings.CurrentLang];

  if (DoesElementExist("trash-bin-button-text"))
    document.getElementById("trash-bin-button-text").innerText = Strings.TrashBinButton[UserSettings.CurrentLang];

  if (DoesElementExist("generate-backup-button-text"))
    document.getElementById("generate-backup-button-text").innerText =
      Strings.GenerateBackUpButton[UserSettings.CurrentLang];

  if (DoesElementExist("cloud-storge-button-text"))
    document.getElementById("cloud-storge-button-text").innerText = Strings.CouldStorgeButton[UserSettings.CurrentLang];

  if (DoesElementExist("settings-button-text"))
    document.getElementById("settings-button-text").innerText = Strings.SettingsButton[UserSettings.CurrentLang];

  // Setting
  if (DoesElementExist("settings-title"))
    document.getElementById("settings-title").innerText = Strings.SettingTitle[UserSettings.CurrentLang];

  if (DoesElementExist("language-setting-title"))
    document.getElementById("language-setting-title").innerText = Strings.LanguageSetting[UserSettings.CurrentLang];

  if (DoesElementExist("sidebar-setting-title"))
    document.getElementById("sidebar-setting-title").innerText = Strings.SideBarSetting[UserSettings.CurrentLang];

  if (DoesElementExist("topbar-setting-title"))
    document.getElementById("topbar-setting-title").innerText = Strings.TopBarSetting[UserSettings.CurrentLang];

  if (DoesElementExist("auto-writer-setting-title"))
    document.getElementById("auto-writer-setting-title").innerText =
      Strings.AutoWriterSetting[UserSettings.CurrentLang];

  if (DoesElementExist("auto-backup-setting-title"))
    document.getElementById("auto-backup-setting-title").innerText =
      Strings.AutoBackupSetting[UserSettings.CurrentLang];

  if (DoesElementExist("date-picker-setting-title"))
    document.getElementById("date-picker-setting-title").innerText =
      Strings.DatePickerSetting[UserSettings.CurrentLang];

  if (DoesElementExist("clock-setting-title"))
    document.getElementById("clock-setting-title").innerText = Strings.ClockSetting[UserSettings.CurrentLang];

  if (DoesElementExist("theme-setting-title"))
    document.getElementById("theme-setting-title").innerText = Strings.ThemeSetting[UserSettings.CurrentLang];

  // Option
  if (DoesElementExist("show-sidebar-option"))
    document.getElementById("show-sidebar-option").innerText = Strings.ShowSideBarOption[UserSettings.CurrentLang];

  if (DoesElementExist("hide-sidebar-option"))
    document.getElementById("hide-sidebar-option").innerText = Strings.HideSideBarOption[UserSettings.CurrentLang];

  if (DoesElementExist("disable-topbar-option"))
    document.getElementById("disable-topbar-option").innerText = Strings.DisableOption[UserSettings.CurrentLang];

  if (DoesElementExist("enable-topbar-option"))
    document.getElementById("enable-topbar-option").innerText = Strings.EnableOption[UserSettings.CurrentLang];

  if (DoesElementExist("disable-auto-writer-option"))
    document.getElementById("disable-auto-writer-option").innerText = Strings.DisableOption[UserSettings.CurrentLang];

  if (DoesElementExist("enable-auto-writer-option"))
    document.getElementById("enable-auto-writer-option").innerText = Strings.EnableOption[UserSettings.CurrentLang];

  if (DoesElementExist("disable-auto-backup-option"))
    document.getElementById("disable-auto-backup-option").innerText = Strings.DisableOption[UserSettings.CurrentLang];

  if (DoesElementExist("enable-auto-backup-option"))
    document.getElementById("enable-auto-backup-option").innerText = Strings.EnableOption[UserSettings.CurrentLang];

  if (DoesElementExist("lunar-option"))
    document.getElementById("lunar-option").innerText = Strings.LunarOption[UserSettings.CurrentLang];

  if (DoesElementExist("solar-option"))
    document.getElementById("solar-option").innerText = Strings.SolarOption[UserSettings.CurrentLang];

  if (DoesElementExist("gregorian-option"))
    document.getElementById("gregorian-option").innerText = Strings.GregorianOption[UserSettings.CurrentLang];

  if (DoesElementExist("dark-theme-option"))
    document.getElementById("dark-theme-option").innerText = Strings.DarkThemeOption[UserSettings.CurrentLang];

  if (DoesElementExist("light-theme-option"))
    document.getElementById("light-theme-option").innerText = Strings.LightThemeOption[UserSettings.CurrentLang];

  if (DoesElementExist("neon-theme-option"))
    document.getElementById("neon-theme-option").innerText = Strings.NeonThemeOption[UserSettings.CurrentLang];

  // Category Bar
  if (DoesElementExist("category-to-do"))
    document.getElementById("category-to-do").innerText = Strings.CategoryToDoButton[UserSettings.CurrentLang];

  if (DoesElementExist("category-today"))
    document.getElementById("category-today").innerText = Strings.CategoryTodayButton[UserSettings.CurrentLang];

  if (DoesElementExist("category-tomorrow"))
    document.getElementById("category-tomorrow").innerText = Strings.CategoryTomorrowButton[UserSettings.CurrentLang];

  if (DoesElementExist("category-in-2-days"))
    document.getElementById("category-in-2-days").innerText = Strings.CategoryIn2DaysButton[UserSettings.CurrentLang];

  if (DoesElementExist("category-failed"))
    document.getElementById("category-failed").innerText = Strings.CategoryFailedButton[UserSettings.CurrentLang];

  if (DoesElementExist("category-completed"))
    document.getElementById("category-completed").innerText = Strings.CategoryCompletedButton[UserSettings.CurrentLang];

  // Task Bar
  if (document.querySelector("#select-all-section span"))
    document.querySelector("#select-all-section span").innerText = Strings.SelectAllCheckBox[UserSettings.CurrentLang];

  // List Section
  if (document.querySelectorAll(".completed-task-badge").length >= 1) {
    let Badges = document.querySelectorAll(".completed-task-badge");
    for (n of Badges) {
      n.innerText = Strings.CompletedTaskBadge[UserSettings.CurrentLang];
    }
  }
  if (document.querySelectorAll(".failed-task-badge").length >= 1) {
    let Badges = document.querySelectorAll(".failed-task-badge");
    for (n of Badges) {
      n.innerText = Strings.CompletedTaskBadge[UserSettings.CurrentLang];
    }
  }
  // Task Section
  if (document.querySelectorAll(".trashed-task-badge").length >= 1) {
    let Badges = document.querySelectorAll(".trashed-task-badge");
    for (n of Badges) {
      n.innerText = Strings.TrashedTaskBadge[UserSettings.CurrentLang];
    }
  }
}
