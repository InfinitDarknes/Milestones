// "use strict";
let AllTasksArray = [];
// Add/Delete/Complete/Fail
function NewTaskConstructor(...Args) {
  let [ID, Title, NumericDate, UserCategory, OnlyShowInCategory] = Args;
  return {
    ID,
    Title,
    NumericDate,
    UserCategory,
    Descryption: false,
    IsTaskPinned: false,
    IsTaskCompleted: false,
    IsTaskFailed: false,
    IsTaskTrashed: false,
    Selected: false,
    OnlyShowInCategory: false,
  };
}
function AddTask() {
  let ID = "Task-" + GenerateUniqeID(5);
  let Title = document.querySelector(".task-title-input").value;
  let NumericDate = ExtractDate("Numeric");
  let SelectBox = document.querySelector(".select-box");
  let UserCategory = SelectBox.dataset.value;
  let OnlyShowInCategory = false; // only for now
  let NewTask = NewTaskConstructor(ID, Title, NumericDate, UserCategory, OnlyShowInCategory);
  AllTasksArray.push(NewTask);
  SaveAll();
  UpdateInbox();
}
function DeleteTask(ID) {
  if (AppObj.SelectMode) {
    ReturnSelectedTasks().forEach((Task) => {
      const Element = document.querySelector(Task.ID);
      Element.style.animation = "DeleteAnimation 700ms";
      AllTasksArray.splice(FindIndexOfTask(Task.ID), 1);
      Task.Selected = false;
    });
  } else {
    const Element = document.getElementById(ID);
    Element.setAttribute("data-dis-type", "self-contained");
    Element.classList.add("clickable");
    disintegrate.init();
    // Element.style.animation = "DeleteAnimation 700ms";
    let Index = FindIndexOfTask(ID);
    AllTasksArray.splice(Index, 1);
  }
  SaveAll();
  setTimeout(() => {
    UpdateInbox();
  }, 500);
}
function FailTask(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    Task.IsTaskPinned = false;
    Task.IsTaskCompleted = false;
    Task.IsTaskFailed = true;
    Task.IsTaskTrashed = false;
    Task.Selected = false;
  });
  SaveAll();
  UpdateInbox();
}
function CompleteTask(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    Task.IsTaskPinned = false;
    Task.IsTaskCompleted = true;
    Task.IsTaskFailed = false;
    Task.IsTaskTrashed = false;
    Task.Selected = false;
  });
  SaveAll();
  UpdateInbox();
}
function MoveToTrash(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    Task.IsTaskPinned = false;
    Task.IsTaskCompleted = false;
    Task.IsTaskFailed = false;
    Task.IsTaskTrashed = true;
    Task.Selected = false;
  });
  SaveAll();
  UpdateInbox();
}
function LocalizeTask(ID) {
  if (AppObj.SelectMode) {
    if (
      ReturnSelectedTasks().some((Task) => {
        return Task.UserCategory === "None";
      })
    ) {
      DisplayMessage("Error", MessageBoxStrings.UncategorizedTask[UserSettings.CurrentLang]);
      return;
    }
    ReturnSelectedTasks().forEach((Task) => {
      Task.OnlyShowInCategory = !Task.OnlyShowInCategory;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.OnlyShowInCategory = !Task.OnlyShowInCategory;
    Task.Selected = false;
  }
  SaveAll();
  UpdateInbox();
}
// Restore Tasks
function RestoreFromCompleted(ID) {
  if (AppObj.SelectMode) {
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
  if (AppObj.SelectMode) {
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
  if (AppObj.SelectMode) {
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
    if (Task.UserCategory === AppObj.SelectedUserCategory) return Task;
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
// Permanent sorting
function SortNewestTasks() {
  let SortedArray = AllTasksArray.sort((A, B) => B.NumericDate - A.NumericDate);
  AllTasksArray = SortedArray;
  SaveAll();
  UpdateInbox();
}
function SortOldestTasks() {
  let SortedArray = AllTasksArray.sort((A, B) => A.NumericDate - B.NumericDate);
  AllTasksArray = SortedArray;
  SaveAll();
  UpdateInbox();
}
// show sorted tasks in DOM
/* You will see the line that check for length of CurrentlyLoadedTasks to show an empty box is 
located at end of the functions because that functions relies on DOM element to get its data 
so we first Clear every task element then we attempt to create new ones and append them to DOM
but if all these processes were done and there was still no task element in DOM means that certain 
category that user is lurking in is empty please don't change the logic if you don't want the app to 
get fucked.
*/
function LoadUnfinishedTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnUnfinishedTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskToDoMessage[UserSettings.CurrentLang]);
  }
}
function LoadTodayTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnTodayTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskForTodayMessage[UserSettings.CurrentLang]);
  }
}
function LoadTomorrowTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnTomorrowTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskForTomorrowMessage[UserSettings.CurrentLang]);
  }
}
function LoadIn2DaysTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnIn2DaysTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskIn2DaysMessage[UserSettings.CurrentLang]);
  }
}
function LoadCompletedTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnCompletedTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoCompletedTaskMessage[UserSettings.CurrentLang]);
  }
}
function LoadFailedTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnFailedTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoFailedTaskMessage[UserSettings.CurrentLang]);
  }
}
function LoadTrashedTasks(TargetArray = ReturnTrashedTasks()) {
  ClearListSection();
  AppendTaskContainer(TargetArray);
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox("You have no task in trash bin");
  }
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
    if (AppObj.CurrentWindow.includes("Home") && Task.OnlyShowInCategory === true) return;
    else Task.Selected = true;
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
    if (AppObj.CurrentWindow.includes("Home") && Task.OnlyShowInCategory === true) return;
    else Task.Selected = false;
  });
  CheckBoxes.forEach((CheckBox) => {
    CheckBox.checked = false;
    CheckBox.parentElement.style.display = "none";
    CheckBox.parentElement.parentElement.classList.remove("selected-task");
  });
  ToggleSelectMode();
}
function ExitSelectMode() {
  if (!AppObj.SelectMode) return;
  console.log("Exiting select mode");
  AppObj.SelectMode = false;
  const SelectAllSection = document.querySelector(".select-all-section");
  const SelectAllCheckBox = document.querySelector(".select-all-checkbox");
  const CheckBoxContainers = document.querySelectorAll(`.task-checkbox`);
  AllTasksArray.forEach((Task) => {
    Task.Selected = false;
  });
  if (SelectAllSection) {
    SelectAllCheckBox.checked = false;
    SelectAllSection.style.display = "none";
    CheckBoxContainers.forEach((CheckBox) => {
      CheckBox.checked = false;
      CheckBox.parentElement.style.display = "none";
      CheckBox.parentElement.parentElement.classList.remove("selected-task");
    });
    CheckBoxContainers.forEach((CheckBoxContainer) => {
      CheckBoxContainer.style.display = "none";
    });
  }
  HideSelectModeBar();
}
function ToggleSelectMode() {
  const SelectAllSection = document.querySelector(".select-all-section");
  const SelectAllCheckBox = document.querySelector(".select-all-checkbox");
  const CheckBoxContainers = document.querySelectorAll(`.task-container .checkbox-container`);
  if (ReturnSelectedTasks().length !== 0) {
    AppObj.SelectMode = true;
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
  let LoadedTasksElems = Array.from(document.querySelectorAll(".task-container"));
  let LoadedTasksArray = LoadedTasksElems.map((Elem) => {
    return AllTasksArray[FindIndexOfTask(Elem.id)];
  });
  return LoadedTasksArray;
}
function UpdateInbox() {
  if (AppObj.CurrentWindow === "Trash-All") {
    LoadTrashedTasks(ReturnTrashedTasks());
  } else if (AppObj.CurrentWindow === "Trash-Today") {
    LoadTrashedTasks(ReturnTodayTasks(ReturnTrashedTasks()));
  } else if (AppObj.CurrentWindow === "Trash-Tomorrow") {
    LoadTrashedTasks(ReturnTomorrowTasks(ReturnTrashedTasks()));
  } else if (AppObj.CurrentWindow === "Trash-In2Days") {
    LoadTrashedTasks(ReturnIn2DaysTasks(ReturnTrashedTasks()));
  } else if (AppObj.CurrentWindow === "Home-Unfinished") {
    LoadUnfinishedTasks();
  } else if (AppObj.CurrentWindow === "Home-Today") {
    LoadTodayTasks();
  } else if (AppObj.CurrentWindow === "Home-Tomorrow") {
    LoadTomorrowTasks();
  } else if (AppObj.CurrentWindow === "Home-In2Days") {
    LoadIn2DaysTasks();
  } else if (AppObj.CurrentWindow === "Home-Failed") {
    LoadFailedTasks();
  } else if (AppObj.CurrentWindow === "Home-Completed") {
    LoadCompletedTasks();
  } else if (AppObj.CurrentWindow.includes("UserCategory") && AppObj.CurrentWindow.includes("-Unfinished")) {
    LoadUserCategorisedTasks(ReturnUnfinishedTasks());
  } else if (AppObj.CurrentWindow.includes("UserCategory") && AppObj.CurrentWindow.includes("-Today")) {
    LoadUserCategorisedTasks(ReturnTodayTasks());
  } else if (AppObj.CurrentWindow.includes("UserCategory") && AppObj.CurrentWindow.includes("-Tomorrow")) {
    LoadUserCategorisedTasks(ReturnTomorrowTasks());
  } else if (AppObj.CurrentWindow.includes("UserCategory") && AppObj.CurrentWindow.includes("-In2Days")) {
    LoadUserCategorisedTasks(ReturnIn2DaysTasks());
  } else if (AppObj.CurrentWindow.includes("UserCategory") && AppObj.CurrentWindow.includes("-Completed")) {
    LoadUserCategorisedTasks(ReturnCompletedTasks());
  } else if (AppObj.CurrentWindow.includes("UserCategory") && AppObj.CurrentWindow.includes("-Failed")) {
    LoadUserCategorisedTasks(ReturnFailedTasks());
  } else if (AppObj.CurrentWindow === "Notes") {
    DisplayNotesIntoDOM();
  } else {
    throw new Error("Inbox failed to update because CurrentWindow value is invalid");
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
  let Matches = TargetArray.filter((Task) => {
    let TaskTitle = Task.Title.toLowerCase();
    return TaskTitle.includes(KeyWord);
  });
  if (Matches.length > 0) {
    ClearListSection();
    AppendTaskContainer(Matches);
  } else {
    // DOMManager.js
    DisplayNoResultBox(`${Strings.NoResultFor[UserSettings.CurrentLang]} "${KeyWord}" ${Strings.WasFound[UserSettings.CurrentLang]} :(`);
  }
}
function ExitFromSearchMode() {
  UpdateInbox();
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
  if (document.querySelector(".settings-container")) HideSettings();
  ExitSelectMode();
  AppObj.CurrentWindow = Window.toString();
  if (AppObj.CurrentWindow.includes("UserCategory-") && DoesElementExist("new-task-modal")) {
    SwitchValueOfCategorySelectBox(AppObj.SelectedUserCategory);
  }
  UpdateInbox();
}
