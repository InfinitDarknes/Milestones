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
    Pinned: false,
    PinnedInCategory: false,
    IsTaskCompleted: false,
    IsTaskFailed: false,
    IsTaskTrashed: false,
    CompletedAt: null,
    FailedAt: null,
    TrashedAt: null,
    Selected: false,
    OnlyShowInCategory: false,
  };
}
function AddTask(...Args) {
  let [Title, NumericDate, Category] = Args;
  let ID = "Task-" + GenerateUniqeID(5);
  let OnlyShowInCategory = false; // only for now
  let NewTask = NewTaskConstructor(ID, Title, NumericDate, Category, OnlyShowInCategory);
  AllTasksArray.push(NewTask);
  Save("Tasks");
  UpdateInbox();
  DisplayMessage("Success", MessageBoxStrings.TaskSuccess[UserSettings.Lang]);
}
function DeleteTask(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    AllTasksArray.splice(FindIndexOfTask(Task.ID), 1);
    Task.Selected = false;
  });
  Save("Tasks");
  UpdateInbox();
  // DeleteWithAnimation();
}
function FailTask(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    Task.Pinned = false;
    Task.IsTaskCompleted = false;
    Task.IsTaskFailed = true;
    Task.IsTaskTrashed = false;
    Task.CompletedAt = null;
    Task.FailedAt = new Date().getTime();
    Task.TrashedAt = null;
    Task.Selected = false;
  });
  Save("Tasks");
  UpdateInbox();
}
function CompleteTask(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    Task.Pinned = false;
    Task.IsTaskCompleted = true;
    Task.IsTaskFailed = false;
    Task.IsTaskTrashed = false;
    Task.CompletedAt = new Date().getTime();
    Task.FailedAt = null;
    Task.TrashedAt = null;
    Task.Selected = false;
  });
  Save("Tasks");
  UpdateInbox();
}
function MoveToTrash(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    Task.Pinned = false;
    Task.IsTaskCompleted = false;
    Task.IsTaskFailed = false;
    Task.IsTaskTrashed = true;
    Task.CompletedAt = null;
    Task.FailedAt = null;
    Task.TrashedAt = new Date().getTime();
    Task.Selected = false;
  });
  Save("Tasks");
  UpdateInbox();
}
function LocalizeTask(ID) {
  if (AppObj.SelectMode) {
    if (
      ReturnSelectedTasks().some((Task) => {
        return Task.UserCategory === "None";
      })
    ) {
      DisplayMessage("Error", MessageBoxStrings.UncategorizedTask[UserSettings.Lang]);
      return;
    }
    ReturnSelectedTasks().forEach((Task) => {
      Task.OnlyShowInCategory = !Task.OnlyShowInCategory;
      if (Task.OnlyShowInCategory) Task.Pinned = false;
      Task.Selected = false;
    });
  } else {
    let Task = AllTasksArray[FindIndexOfTask(ID)];
    Task.OnlyShowInCategory = !Task.OnlyShowInCategory;
    if (Task.OnlyShowInCategory) Task.Pinned = false;
    Task.Selected = false;
  }
  Save("Tasks");
  UpdateInbox();
}
// Animate (Disintegrate and Canvas)
function DeleteWithAnimation() {}
// Restore Tasks
function RestoreTasks(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    if (Task.IsTaskCompleted) {
      Task.IsTaskCompleted = false;
      Task.CompletedAt = null;
    }
    if (Task.IsTaskFailed) {
      Task.IsTaskFailed = false;
      Task.FailedAt = null;
    }
    if (Task.IsTaskTrashed) {
      Task.IsTaskTrashed = false;
      Task.TrashedAt = null;
    }
    Task.Selected = false;
  });
  Save("Tasks");
  UpdateInbox();
}
// sort and show user-categorized tasks and category page
function ReturnUserCategorisedTasks(TargetArray = ReturnUnfinishedTasks()) {
  return TargetArray.filter((Task) => {
    if (Task.UserCategory === AppObj.SelectedUserCategory) return Task;
  });
}
function LoadUserCategorisedTasks(TargetArray = ReturnUnfinishedTasks()) {
  if (ReturnUserCategorisedTasks(TargetArray).length >= 1) {
    ClearListSection();
    AppendTaskContainer(ReturnUserCategorisedTasks(TargetArray));
  } else {
    EmptyBox(Strings.NoTaskInUserCategory[UserSettings.Lang], ".list-section");
  }
}
// sort and return tasks
function PrioritizePinnedTasks(Array) {
  if (AppObj.CurrentWindow.includes("Home")) {
    return Array.sort((taskA, taskB) => taskB.Pinned - taskA.Pinned);
  } else {
    return Array.sort((taskA, taskB) => taskB.PinnedInCategory - taskA.PinnedInCategory);
  }
}
function ReturnUnfinishedTasks() {
  return AllTasksArray.filter((Task) => {
    return !Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed;
  });
}
function ReturnTodayTasks(TargetArray = ReturnUnfinishedTasks()) {
  let Today = new Date().getDate();
  return TargetArray.filter((Task) => {
    let TaskDate = new Date(Task.NumericDate).getDate();
    return TaskDate === Today;
  });
}
function ReturnTomorrowTasks(TargetArray = ReturnUnfinishedTasks()) {
  let NumericTomorrow = new Date().getTime() + 86400000;
  let Tomorrow = new Date(NumericTomorrow).getDate();
  return TargetArray.filter((Task) => {
    let TaskDate = new Date(Task.NumericDate).getDate();
    return TaskDate === Tomorrow;
  });
}
function ReturnIn2DaysTasks(TargetArray = ReturnUnfinishedTasks()) {
  let NumericIn2Days = new Date().getTime() + 172800000;
  let In2Days = new Date(NumericIn2Days).getDate();
  return TargetArray.filter((Task) => {
    let TaskDate = new Date(Task.NumericDate).getDate();
    return TaskDate === In2Days;
  });
}
function ReturnCompletedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.IsTaskCompleted && !Task.IsTaskTrashed && !Task.IsTaskFailed;
  });
}
function ReturnFailedTasks() {
  return AllTasksArray.filter((Task) => {
    return Task.IsTaskFailed && !Task.IsTaskTrashed && !Task.IsTaskCompleted;
  });
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
  Save("Tasks");
  UpdateInbox();
}
function SortOldestTasks() {
  let SortedArray = AllTasksArray.sort((A, B) => A.NumericDate - B.NumericDate);
  AllTasksArray = SortedArray;
  Save("Tasks");
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
    EmptyBox(Strings.NoTaskToDoMessage[UserSettings.Lang], ".list-section");
  }
}
function LoadTodayTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnTodayTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskForTodayMessage[UserSettings.Lang], ".list-section");
  }
}
function LoadTomorrowTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnTomorrowTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskForTomorrowMessage[UserSettings.Lang], ".list-section");
  }
}
function LoadIn2DaysTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnIn2DaysTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoTaskIn2DaysMessage[UserSettings.Lang], ".list-section");
  }
}
function LoadCompletedTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnCompletedTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoCompletedTaskMessage[UserSettings.Lang], ".list-section");
  }
}
function LoadFailedTasks() {
  ClearListSection();
  AppendTaskContainer(ReturnFailedTasks());
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox(Strings.NoFailedTaskMessage[UserSettings.Lang], ".list-section");
  }
}
function LoadTrashedTasks(TargetArray = ReturnTrashedTasks()) {
  ClearListSection();
  AppendTaskContainer(TargetArray);
  if (GetCurrentlyLoadedTasks().length === 0) {
    EmptyBox("You have no task in trash bin", ".list-section");
  }
}
//
function MoveToPreviousDay(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let TaskNumericDate = Task.NumericDate;
  let NumericPreviousDay = TaskNumericDate - 24 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericPreviousDay;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericPreviousDay;
  Save("Tasks");
  UpdateInbox();
}
function MoveToNextDay(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let TaskNumericDate = Task.NumericDate;
  let NumericNextDay = TaskNumericDate + 24 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericNextDay;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericNextDay;
  Save("Tasks");
  UpdateInbox();
}
function MoveToToday(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericToday;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericToday;
  Save("Tasks");
  UpdateInbox();
}
function MoveToTomorrow(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let NumericTomorrow = NumericToday + 24 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericTomorrow;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericTomorrow;
  Save("Tasks");
  UpdateInbox();
}
function MoveIn2Days(ID) {
  let Task = AllTasksArray[FindIndexOfTask(ID)];
  let NumericToday = new Date().getTime();
  let NumericIn2Days = NumericToday + 48 * 60 * 60 * 1000;
  if (UserSettings.Calendar === "Solar") Task.NumericDate = NumericIn2Days;
  if (UserSettings.Calendar === "Gregorian") Task.NumericDate = NumericIn2Days;
  Save("Tasks");
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
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    if (Task.UserCategory === AppObj.SelectedUserCategory) {
      let PinnedTasks = ReturnUnfinishedTasks().filter((Task) => {
        return Task.PinnedInCategory && Task.UserCategory === AppObj.SelectedUserCategory;
      });
      if (PinnedTasks.length < 5) {
        AllTasksArray[FindIndexOfTask(Task.ID)].PinnedInCategory = true;
      } else {
        DisplayMessage("Error", Strings.PinMoreThan5TaskErrorMsg[UserSettings.Lang]);
      }
    }
    if (AppObj.CurrentWindow.includes("Home")) {
      let PinnedTasks = ReturnUnfinishedTasks().filter((Task) => {
        return Task.Pinned;
      });
      if (PinnedTasks.length < 5) {
        AllTasksArray[FindIndexOfTask(Task.ID)].Pinned = true;
      } else {
        DisplayMessage("Error", Strings.PinMoreThan5TaskErrorMsg[UserSettings.Lang]);
      }
    }
  });
  Save("Tasks");
  UpdateInbox();
}
function UnPinTask(ID) {
  let SelectedTasks = AppObj.SelectMode ? ReturnSelectedTasks() : [AllTasksArray[FindIndexOfTask(ID)]];
  SelectedTasks.forEach((Task) => {
    if (AppObj.CurrentWindow.includes("UserCategory")) {
      Task.PinnedInCategory = false;
    } else {
      Task.Pinned = false;
    }
  });
  Save("Tasks");
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
  console.log("Updated Inbox");
  ExitSelectMode();
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
    EmptyBox(`${Strings.NoResultFor[UserSettings.Lang]} "${KeyWord}" ${Strings.WasFound[UserSettings.Lang]} :(`, ".list-section");
  }
}
function ExitFromSearchMode() {
  const ListSection = document.querySelector(".list-section");
  ListSection.style = "";
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
  if (typeof TextObject !== "object") {
    DisplayMessage("Error", "Input is not a valid JSON object");
    return;
  }
  for (let n in TextObject) {
    localStorage.setItem(n.toString(), TextObject[n]);
  }
  location.reload();
}
