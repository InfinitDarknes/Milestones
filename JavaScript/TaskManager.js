"use strict";
let AllTasksArray = [];
let SelectMode = false;
let EditMode = false;
// CurrentPage => Home-SortOption | TrashBin-SortOption | UserCategory-SortOption | Notes | Calendar
let CurrentWindow = "Home-Unfinished";
// Add/Delete/Complete/Fail
function NewTaskConstructor(ID, Title, NumericDate, UserCategory) {
  this.ID = ID;
  this.Title = Title;
  this.NumericDate = NumericDate;
  this.Descryption = false;
  this.UserCategory = UserCategory;
  this.IsTaskPinned = false;
  this.IsTaskCompleted = false;
  this.IsTaskFailed = false;
  this.IsTaskTrashed = false;
  this.Selected = false;
}
function AddTask() {
  let ID = "Task-" + GenerateUniqeID(5);
  let Title = document.getElementById("task-title-input").value;
  let NumericDate = ExtractDate("Numeric");
  let SelectBox = document.getElementById("select-category-select-box");
  let UserCategory = SelectBox.dataset.value;
  let NewTask = new NewTaskConstructor(ID, Title, NumericDate, UserCategory);
  AllTasksArray.push(NewTask);
  SaveAll();
  UpdateInbox();
}
function DeleteTask(ID) {
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      const Element = document.getElementById(Task.ID);
      Element.style.animation = "DeleteAnimation 700ms";
      AllTasksArray.splice(FindIndexOfTask(Task.ID), 1);
      Task.Selected = false;
    });
  } else {
    const Element = document.getElementById(ID);
    Element.style.animation = "DeleteAnimation 700ms";
    let Index = FindIndexOfTask(ID);
    AllTasksArray.splice(Index, 1);
  }
  SaveAll();
  setTimeout(() => {
    UpdateInbox();
  }, 500);
}
function FailTask(ID) {
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      Task.IsTaskPinned = false;
      Task.IsTaskCompleted = false;
      Task.IsTaskFailed = true;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.IsTaskPinned = false;
    Task.IsTaskCompleted = false;
    Task.IsTaskFailed = true;
    Task.Selected = false;
  }
  SaveAll();
  UpdateInbox();
}
function CompleteTask(ID) {
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      Task.IsTaskPinned = false;
      Task.IsTaskCompleted = true;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.IsTaskPinned = false;
    Task.IsTaskCompleted = true;
    Task.Selected = false;
  }
  SaveAll();
  UpdateInbox();
}
function MoveToTrash(ID) {
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
  SaveAll();
  UpdateInbox();
}
// Restore Tasks
function RestoreFromCompleted(ID) {
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      Task.IsTaskCompleted = false;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.IsTaskCompleted = false;
    Task.Selected = false;
  }
  SaveAll();
  UpdateInbox();
}
function RestoreFromFailed(ID) {
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      Task.IsTaskFailed = false;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.IsTaskFailed = false;
    Task.Selected = false;
  }
  SaveAll();
  UpdateInbox();
}
function RestoreFromTrash(ID) {
  if (SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      Task.IsTaskTrashed = false;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.IsTaskTrashed = false;
    Task.Selected = false;
  }
  SaveAll();
  UpdateInbox();
}
// sort and show user-categorized tasks and category page
function ReturnUserCategorisedTasks(TargetArray = ReturnUnfinishedTasks()) {
  return TargetArray.filter((Task) => {
    if (Task.UserCategory === SelectedUserCategory) return Task;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function LoadUserCategorisedTasks(TargetArray = ReturnUnfinishedTasks()) {
  if (ReturnUserCategorisedTasks(TargetArray).length >= 1) {
    ClearListSection();
    AppendTaskContainer(ReturnUserCategorisedTasks(TargetArray));
  } else {
    EmptyBox(Strings.NoTaskInUserCategory[UserSettings.CurrentLang]);
  }
}
// sort and return tasks
function ReturnUnfinishedTasks() {
  return AllTasksArray.filter((Task) => {
    return !Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function ReturnTodayTasks(TargetArray = ReturnUnfinishedTasks()) {
  let Today = new Date().getDate();
  return TargetArray.filter((Task) => {
    let TaskDate = new Date(Task.NumericDate).getDate();
    return TaskDate === Today;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function ReturnTomorrowTasks(TargetArray = ReturnUnfinishedTasks()) {
  let NumericTomorrow = new Date().getTime() + 86400000;
  let Tomorrow = new Date(NumericTomorrow).getDate();
  return TargetArray.filter((Task) => {
    let TaskDate = new Date(Task.NumericDate).getDate();
    return TaskDate === Tomorrow;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function ReturnIn2DaysTasks(TargetArray = ReturnUnfinishedTasks()) {
  let NumericIn2Days = new Date().getTime() + 172800000;
  let In2Days = new Date(NumericIn2Days).getDate();
  return TargetArray.filter((Task) => {
    let TaskDate = new Date(Task.NumericDate).getDate();
    return TaskDate === In2Days;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function ReturnCompletedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.IsTaskCompleted && !Task.IsTaskTrashed && !Task.IsTaskFailed;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function ReturnFailedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.IsTaskFailed && !Task.IsTaskTrashed && !Task.IsTaskCompleted;
  }).sort((taskA, taskB) => taskB.IsTaskPinned - taskA.IsTaskPinned);
}
function ReturnTrashedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.IsTaskTrashed;
  });
}
// show sorted tasks in DOM
function LoadUnfinishedTasks() {
  if (ReturnUnfinishedTasks().length === 0) {
    EmptyBox(Strings.NoTaskToDoMessage[UserSettings.CurrentLang]);
    return;
  }
  ClearListSection();
  AppendTaskContainer(ReturnUnfinishedTasks());
}
function LoadTodayTasks() {
  if (ReturnTodayTasks().length === 0) {
    EmptyBox(Strings.NoTaskForTodayMessage[UserSettings.CurrentLang]);
    return;
  }
  ClearListSection();
  AppendTaskContainer(ReturnTodayTasks());
}
function LoadTomorrowTasks() {
  if (ReturnTomorrowTasks().length === 0) {
    EmptyBox(Strings.NoTaskForTomorrowMessage[UserSettings.CurrentLang]);
    return;
  }
  ClearListSection();
  AppendTaskContainer(ReturnTomorrowTasks());
}
function LoadIn2DaysTasks() {
  if (ReturnIn2DaysTasks().length === 0) {
    EmptyBox(Strings.NoTaskIn2DaysMessage[UserSettings.CurrentLang]);
    return;
  }
  ClearListSection();
  AppendTaskContainer(ReturnIn2DaysTasks());
}
function LoadCompletedTasks() {
  if (ReturnCompletedTasks().length === 0) {
    EmptyBox(Strings.NoCompletedTaskMessage[UserSettings.CurrentLang]);
    return;
  }
  ClearListSection();
  AppendTaskContainer(ReturnCompletedTasks());
}
function LoadFailedTasks() {
  if (ReturnFailedTasks().length === 0) {
    EmptyBox(Strings.NoFailedTaskMessage[UserSettings.CurrentLang]);
    return;
  }
  ClearListSection();
  AppendTaskContainer(ReturnFailedTasks());
}
function LoadTrashedTasks(TargetArray) {
  if (TargetArray.length === 0) {
    EmptyBox("You have no task in trash bin");
    return;
  }
  ClearListSection();
  AppendTaskContainer(TargetArray);
}
//
function MoveToPreviousDay(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let TaskNumericDate = Task.NumericDate;
  let NumericPreviousDay = TaskNumericDate - 24 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericPreviousDay;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericPreviousDay;
  SaveAll();
  UpdateInbox();
}
function MoveToNextDay(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let TaskNumericDate = Task.NumericDate;
  let NumericNextDay = TaskNumericDate + 24 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericNextDay;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericNextDay;
  SaveAll();
  UpdateInbox();
}
function MoveToToday(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericToday;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericToday;
  UpdateInbox();
  SaveAll();
}
function MoveToTomorrow(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let NumericTomorrow = NumericToday + 24 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericTomorrow;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericTomorrow;
  SaveAll();
  UpdateInbox();
}
function MoveIn2Days(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let NumericIn2Days = NumericToday + 48 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericIn2Days;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericIn2Days;
  SaveAll();
  UpdateInbox();
}
// Select/Deselect
function ReturnSelectedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.Selected;
  });
}
function SelectTask(ID) {
  AllTasksArray[FindIndexOfTask(ID)].Selected = true;
  const TaskContainer = document.getElementById(ID);
  const CheckBoxContainer = document.querySelector(`#${ID} .checkbox-container`);
  const CheckBox = document.querySelector(`#${ID} .task-checkbox`);
  TaskContainer.classList.add("selected-task");
  CheckBoxContainer.style.display = "block";
  CheckBox.checked = true;
  ToggleSelectMode();
}
function DeSelectTask(ID) {
  AllTasksArray[FindIndexOfTask(ID)].Selected = false;
  const TaskContainer = document.getElementById(ID);
  const CheckBoxContainer = document.querySelector(`#${ID} .checkbox-container`);
  const CheckBox = document.querySelector(`#${ID} .task-checkbox`);
  TaskContainer.classList.add("selected-task");
  CheckBoxContainer.style.display = "none";
  CheckBox.checked = false;
  ToggleSelectMode();
}
function SelectAll() {
  const CheckBoxes = document.querySelectorAll(`.task-checkbox`);
  GetCurrentlyLoadedTasks().forEach((Task) => {
    Task.Selected = true;
  });
  CheckBoxes.forEach((CheckBox) => {
    CheckBox.checked = true;
    CheckBox.parentElement.style.display = "block";
    CheckBox.parentElement.parentElement.classList.add("selected-task");
  });
  ToggleSelectMode();
}
function DeSelectAll() {
  const CheckBoxes = document.querySelectorAll(`.task-checkbox`);
  AllTasksArray.forEach((Task) => {
    Task.Selected = false;
  });
  CheckBoxes.forEach((CheckBox) => {
    CheckBox.checked = false;
    CheckBox.parentElement.style.display = "none";
    CheckBox.parentElement.parentElement.classList.remove("selected-task");
  });
  ToggleSelectMode();
}
function ExitSelectMode() {
  if (!SelectMode) return;
  console.log("Exiting select mode");
  SelectMode = false;
  const SelectAllSection = document.getElementById("select-all-section");
  const SelectAllCheckBox = document.getElementById("select-all-checkbox");
  const CheckBoxContainers = document.querySelectorAll(`.task-checkbox`);
  SelectAllCheckBox.checked = false;
  SelectAllSection.style.display = "none";
  AllTasksArray.forEach((Task) => {
    Task.Selected = false;
  });
  CheckBoxContainers.forEach((CheckBox) => {
    CheckBox.checked = false;
    CheckBox.parentElement.style.display = "none";
    CheckBox.parentElement.parentElement.classList.remove("selected-task");
  });
  CheckBoxContainers.forEach((CheckBoxContainer) => {
    CheckBoxContainer.style.display = "none";
  });
  HideSelectModeBar();
}
function ToggleSelectMode() {
  const SelectAllSection = document.getElementById("select-all-section");
  const SelectAllCheckBox = document.getElementById("select-all-checkbox");
  const CheckBoxContainers = document.querySelectorAll(`.task-container .checkbox-container`);
  if (ReturnSelectedTasks().length !== 0) {
    SelectMode = true;
    SelectAllSection.style.display = "flex";
    CheckBoxContainers.forEach((CheckBoxContainer) => {
      CheckBoxContainer.style.display = "block";
    });
    DisplaySelectModeBar();
  }
  if (ReturnSelectedTasks().length === GetCurrentlyLoadedTasks().length) {
    SelectAllCheckBox.checked = true;
  }
  if (ReturnSelectedTasks().length < GetCurrentlyLoadedTasks().length) {
    SelectAllCheckBox.checked = false;
  }
  if (ReturnSelectedTasks().length === 0) {
    ExitSelectMode();
  }
}
// Pin/Unpin
function PinTask(ID) {
  let NumberOfPinnedTasks = AllTasksArray.filter((Task) => {
    return Task.IsTaskPinned;
  }).length;
  if (NumberOfPinnedTasks > 5) return;
  AllTasksArray[FindIndexOfTask(ID)].IsTaskPinned = true;
  SaveAll();
  UpdateInbox();
}
function UnPinTask(ID) {
  AllTasksArray[FindIndexOfTask(ID)].IsTaskPinned = false;
  SaveAll();
  UpdateInbox();
}
// other
function FindIndexOfTask(ID) {
  return AllTasksArray.findIndex((Task) => {
    return Task.ID === ID;
  });
}
function GetCurrentlyLoadedTasks() {
  switch (CurrentWindow) {
    case "Home-Unfinished":
      return ReturnUnfinishedTasks();
    case "Home-Today":
      return ReturnTodayTasks();
    case "Home-Tomorrow":
      return ReturnTomorrowTasks();
    case "Home-In2Days":
      return ReturnIn2DaysTasks();
    case "Home-Failed":
      return ReturnFailedTasks();
    case "Home-Completed":
      return ReturnCompletedTasks();
    case "UserCategory-Unfinished":
      return ReturnUserCategorisedTasks(ReturnUnfinishedTasks());
    case "UserCategory-Today":
      return ReturnUserCategorisedTasks(ReturnTodayTasks());
    case "UserCategory-Tomorrow":
      return ReturnUserCategorisedTasks(ReturnTomorrowTasks());
    case "UserCategory-In2Days":
      return ReturnUserCategorisedTasks(ReturnIn2DaysTasks());
    case "Trash-All":
      return ReturnTrashedTasks();
    case "Trash-Today":
      return ReturnTodayTasks(ReturnTrashedTasks());
    case "Trash-Tomorrow":
      return ReturnTomorrowTasks(ReturnTrashedTasks());
    case "Trash-In2Days":
      return ReturnIn2DaysTasks(ReturnTrashedTasks());
    case "Notes":
      return [];
    default:
      return "GetCurrentLoadedTasks failed to return any task because CurrentWindow value is invalid";
  }
}
function UpdateInbox() {
  switch (CurrentWindow) {
    case "Trash-All":
      LoadTrashedTasks(ReturnTrashedTasks());
      break;
    case "Trash-Today":
      LoadTrashedTasks(ReturnTodayTasks(ReturnTrashedTasks()));
      break;
    case "Trash-Tomorrow":
      LoadTrashedTasks(ReturnTomorrowTasks(ReturnTrashedTasks()));
      break;
    case "Trash-In2Days":
      LoadTrashedTasks(ReturnIn2DaysTasks(ReturnTrashedTasks()));
      break;
    case "Home-Unfinished":
      LoadUnfinishedTasks();
      break;
    case "Home-Today":
      LoadTodayTasks();
      break;
    case "Home-Tomorrow":
      LoadTomorrowTasks();
      break;
    case "Home-In2Days":
      LoadIn2DaysTasks();
      break;
    case "Home-Failed":
      LoadFailedTasks();
      break;
    case "Home-Completed":
      LoadCompletedTasks();
      break;
    case "UserCategory-Unfinished":
      LoadUserCategorisedTasks(ReturnUnfinishedTasks());
      break;
    case "UserCategory-Today":
      LoadUserCategorisedTasks(ReturnTodayTasks());
      break;
    case "UserCategory-Tomorrow":
      LoadUserCategorisedTasks(ReturnTomorrowTasks());
      break;
    case "UserCategory-In2Days":
      LoadUserCategorisedTasks(ReturnIn2DaysTasks());
      break;
    case "Notes":
      DisplayNotesIntoDOM();
      break;
    default:
      return "Inbox failed to update because CurrentWindow value is invalid";
  }
  ExitSelectMode();
}
// Saving
function SaveAll() {
  localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
  localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
}
// Searching
function Search(KeyWord) {
  if (!KeyWord) {
    ExitFromSearchMode();
    return;
  }
  ExitSelectMode();
  KeyWord = KeyWord.toLowerCase();
  let TargetArray = GetCurrentlyLoadedTasks();
  TargetArray.forEach((Task) => {
    const TaskElement = document.querySelector(`#${Task.ID}`);
    let TaskTitle = Task.Title.toLowerCase();
    if (TaskTitle.includes(KeyWord)) TaskElement.style.display = "flex";
    else TaskElement.style.display = "none";
  });
}
function ExitFromSearchMode() {
  let TaskElements = document.querySelectorAll(`.task-container`);
  TaskElements.forEach((TaskElement) => {
    TaskElement.style.display = "flex";
  });
}
//
function ReturnTaskState(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  if (!Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed) return "Unfinished";
  if (Task.IsTaskCompleted && !Task.IsTaskTrashed) return "Completed";
  if (Task.IsTaskFailed && !Task.IsTaskTrashed) return "Failed";
  if (Task.IsTaskTrashed) return "Trashed";
}
// Restoring
function RestoreFromText(Text) {
  let TextObject = JSON.parse(Text);
  for (let n in TextObject) {
    localStorage.setItem(n.toString(), TextObject[n]);
  }
  location.reload();
}
// Window manager => we have different windows such as Home-Unfinished or Trash-All we use it to load tasks accordingly
function ChangeWindow(Window) {
  if (CurrentWindow === Window) return;
  if (DoesElementExist("settings-container")) HideSettings();
  ExitSelectMode();
  let ValidInputs = [
    "Trash-All",
    "Trash-Today",
    "Trash-Tomorrow",
    "Trash-In2Days",
    "Home-Unfinished",
    "Home-Today",
    "Home-Tomorrow",
    "Home-In2Days",
    "Home-Failed",
    "Home-Completed",
    "UserCategory-Unfinished",
    "UserCategory-Today",
    "UserCategory-Tomorrow",
    "UserCategory-In2Days",
    "Notes",
  ];
  if (!ValidInputs.includes(Window.toString())) {
    console.error(`unvalid argument passed to ChangeWindow ${Window} is not part of existing windows in the app`);
    return;
  }
  CurrentWindow = Window.toString();
  console.log(`Current window : ${CurrentWindow}`);
}
