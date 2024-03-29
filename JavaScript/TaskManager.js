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
  DeSelectAll();
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
    ToggleSelectMode();
  }, 500);
}
function FailTask(ID) {
  const SelectAllButton = document.getElementById("select-all-checkbox");
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
  ToggleSelectMode();
}
function CompleteTask(ID) {
  const SelectAllButton = document.getElementById("select-all-checkbox");
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
  ToggleSelectMode();
}
// Restore Tasks
function RestoreFromCompleted(ID) {
  const SelectAllButton = document.getElementById("select-all-checkbox");
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
  ToggleSelectMode();
}
function RestoreFromFailed(ID) {
  const SelectAllButton = document.getElementById("select-all-checkbox");
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
  ToggleSelectMode();
}
function RestoreFromTrash(ID) {
  const SelectAllButton = document.getElementById("select-all-checkbox");
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
  ToggleSelectMode();
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
// show sorted tasks in DOM
function LoadUnfinishedTasks() {
  if (ReturnUnfinishedTasks().length === 0) EmptyBox(Strings.NoTaskToDoMessage[UserSettings.CurrentLang]);
  else {
    ClearListSection();
    AppendTaskContainer(ReturnUnfinishedTasks());
  }
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
  if (ReturnIn2DaysTasks().length === 0) EmptyBox(Strings.NoTaskIn2DaysMessage[UserSettings.CurrentLang]);
  else {
    ClearListSection();
    AppendTaskContainer(ReturnIn2DaysTasks());
  }
}
function LoadCompletedTasks() {
  if (ReturnCompletedTasks().length === 0) EmptyBox(Strings.NoCompletedTaskMessage[UserSettings.CurrentLang]);
  else {
    ClearListSection();
    AppendTaskContainer(ReturnCompletedTasks());
  }
}
function LoadFailedTasks() {
  if (ReturnFailedTasks().length === 0) EmptyBox(Strings.NoFailedTaskMessage[UserSettings.CurrentLang]);
  else {
    ClearListSection();
    AppendTaskContainer(ReturnFailedTasks());
  }
}
//
function MoveToToday(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let GregorianYear = new Date().getFullYear();
  let GregorianMonth = new Date().getMonth() + 1;
  let GregorianDay = new Date().getDate();
  //
  if (UserSettings.Calendar === "Solar") {
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2].toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericToday;
  }
  if (UserSettings.Calendar === "Gregorian") {
    let DisplayDate = `${GregorianYear} / ${GregorianMonth.toString().padStart(2, "0")} / ${GregorianDay.toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericToday;
  }
  UpdateInbox();
  SaveAll();
}
function MoveToPreviousDay(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let TaskNumericDate = Task.NumericDate;
  let NumericPreviousDay = TaskNumericDate - 24 * 60 * 60 * 1000;
  let GregorianYear = new Date(NumericPreviousDay).getFullYear();
  let GregorianMonth = new Date(NumericPreviousDay).getMonth() + 1;
  let GregorianDay = new Date(NumericPreviousDay).getDate();
  //
  if (UserSettings.Calendar === "Solar") {
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2].toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericPreviousDay;
  }
  if (UserSettings.Calendar === "Gregorian") {
    let DisplayDate = `${GregorianYear} / ${GregorianMonth.toString().padStart(2, "0")} / ${GregorianDay.toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericPreviousDay;
  }
  SaveAll();
  UpdateInbox();
}
function MoveToNextDay(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let TaskNumericDate = Task.NumericDate;
  let NumericNextDay = TaskNumericDate + 24 * 60 * 60 * 1000;
  let GregorianYear = new Date(NumericNextDay).getFullYear();
  let GregorianMonth = new Date(NumericNextDay).getMonth() + 1;
  let GregorianDay = new Date(NumericNextDay).getDate();
  //
  if (UserSettings.Calendar === "Solar") {
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2].toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericNextDay;
  }
  if (UserSettings.Calendar === "Gregorian") {
    let DisplayDate = `${GregorianYear} / ${GregorianMonth.toString().padStart(2, "0")} / ${GregorianDay.toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericNextDay;
  }
  SaveAll();
  UpdateInbox();
}
//
function MoveToTomorrow(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let NumericTomorrow = NumericToday + 24 * 60 * 60 * 1000;
  let GregorianYear = new Date(NumericTomorrow).getFullYear();
  let GregorianMonth = new Date(NumericTomorrow).getMonth() + 1;
  let GregorianDay = new Date(NumericTomorrow).getDate();
  //
  if (UserSettings.Calendar === "Solar") {
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2].toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericTomorrow;
  }
  if (UserSettings.Calendar === "Gregorian") {
    let DisplayDate = `${GregorianYear} / ${GregorianMonth.toString().padStart(2, "0")} / ${GregorianDay.toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericTomorrow;
  }
  SaveAll();
  UpdateInbox();
}
function MoveIn2Days(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let NumericIn2Days = NumericToday + 48 * 60 * 60 * 1000;
  let GregorianYear = new Date(NumericIn2Days).getFullYear();
  let GregorianMonth = new Date(NumericIn2Days).getMonth() + 1;
  let GregorianDay = new Date(NumericIn2Days).getDate();
  //
  if (UserSettings.Calendar === "Solar") {
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2].toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericIn2Days;
  }
  if (UserSettings.Calendar === "Gregorian") {
    let DisplayDate = `${GregorianYear} / ${GregorianMonth.toString().padStart(2, "0")} / ${GregorianDay.toString().padStart(2, "0")}`;
    Task.DisplayDate = DisplayDate;
    Task.NumericDate = NumericIn2Days;
  }
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
  document.querySelector(`#${ID} .checkbox-container`).style.display = "block";
  document.querySelector(`#${ID} .task-checkbox`).checked = true;
  document.querySelector(`#${ID}`).classList.add("selected-task");
  ToggleSelectMode();
}
function DeSelectTask(ID) {
  AllTasksArray[FindIndexOfTask(ID)].Selected = false;
  document.querySelector(`#${ID} .checkbox-container`).style.display = "none";
  document.querySelector(`#${ID} .task-checkbox`).checked = false;
  document.querySelector(`#${ID}`).classList.remove("selected-task");
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
  HideSelectModeBar();
  ToggleSelectMode();
}
function ToggleSelectMode() {
  if (CurrentWindow === "Notes") return;
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
    SelectMode = false;
    SelectAllCheckBox.checked = false;
    SelectAllSection.style.display = "none";
    CheckBoxContainers.forEach((CheckBoxContainer) => {
      CheckBoxContainer.style.display = "none";
    });
    HideSelectModeBar();
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
  DeSelectAll();
  UpdateInbox();
}
function UnPinTask(ID) {
  AllTasksArray[FindIndexOfTask(ID)].IsTaskPinned = false;
  SaveAll();
  DeSelectAll();
  UpdateInbox();
}
// other
function FindIndexOfTask(ID) {
  return AllTasksArray.findIndex((Task) => {
    return Task.ID === ID;
  });
}
function GetCurrentlyLoadedTasks() {
  if (CurrentWindow === "Home-Unfinished") return ReturnUnfinishedTasks();
  if (CurrentWindow === "Home-Today") return ReturnTodayTasks();
  if (CurrentWindow === "Home-Tomorrow") return ReturnTomorrowTasks();
  if (CurrentWindow === "Home-In2Days") return ReturnIn2DaysTasks();
  if (CurrentWindow === "Home-Failed") return ReturnFailedTasks();
  if (CurrentWindow === "Home-Completed") return ReturnCompletedTasks();
  if (CurrentWindow === "UserCategory-Unfinished") return ReturnUserCategorisedTasks(ReturnUnfinishedTasks());
  if (CurrentWindow === "UserCategory-Today") return ReturnUserCategorisedTasks(ReturnTodayTasks());
  if (CurrentWindow === "UserCategory-Tomorrow") return ReturnUserCategorisedTasks(ReturnTomorrowTasks());
  if (CurrentWindow === "UserCategory-In2Days") return ReturnUserCategorisedTasks(ReturnIn2DaysTasks());
  if (CurrentWindow === "Trash-All") return ReturnTrashedTasks();
  if (CurrentWindow === "Trash-Today") return ReturnTodayTasks(ReturnTrashedTasks());
  if (CurrentWindow === "Trash-Tomorrow") return ReturnTomorrowTasks(ReturnTrashedTasks());
  if (CurrentWindow === "Trash-In2Days") return ReturnIn2DaysTasks(ReturnTrashedTasks());
  if (CurrentWindow === "Notes") return []; // if  i return empty array that has length of zero instead of null or undefined everything will work without any further changes needed
}
function UpdateInbox() {
  if (CurrentWindow === "Trash-All") LoadTrashedTasks(ReturnTrashedTasks());
  if (CurrentWindow === "Trash-Today") LoadTrashedTasks(ReturnTodayTasks());
  if (CurrentWindow === "Trash-Tomorrow") LoadTrashedTasks(ReturnTomorrowTasks());
  if (CurrentWindow === "Trash-In2Days") LoadTrashedTasks(ReturnIn2DaysTasks());
  if (CurrentWindow === "Home-Unfinished") LoadUnfinishedTasks();
  if (CurrentWindow === "Home-Today") LoadTodayTasks();
  if (CurrentWindow === "Home-Tomorrow") LoadTomorrowTasks();
  if (CurrentWindow === "Home-In2Days") LoadIn2DaysTasks();
  if (CurrentWindow === "Home-Failed") LoadFailedTasks();
  if (CurrentWindow === "Home-Completed") LoadCompletedTasks();
  if (CurrentWindow === "UserCategory-Unfinished") LoadUserCategorisedTasks(ReturnUnfinishedTasks());
  if (CurrentWindow === "UserCategory-Today") LoadUserCategorisedTasks(ReturnTodayTasks());
  if (CurrentWindow === "UserCategory-Tomorrow") LoadUserCategorisedTasks(ReturnTomorrowTasks());
  if (CurrentWindow === "UserCategory-In2Days") LoadUserCategorisedTasks(ReturnIn2DaysTasks());
}
// Saving
function SaveAll() {
  localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
  localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
}

function Search(KeyWord) {
  if (!KeyWord) {
    ExitFromSearchMode();
    return;
  }
  KeyWord = KeyWord.toLowerCase();
  let TargetArray = GetCurrentlyLoadedTasks();
  TargetArray.forEach((Task) => {
    let TaskElement = document.querySelector(`#${Task.ID}`);
    let TaskTitle = Task.Title.toLowerCase();
    if (TaskTitle.includes(KeyWord)) {
      TaskElement.style.display = "flex";
    } else {
      TaskElement.style.display = "none";
    }
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
