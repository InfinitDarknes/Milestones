let AllTasksArray = [];
function NewTaskConstructor(
  ID,
  Title,
  DisplayDate,
  DisplayTime,
  NumericDate,
  Descryption,
  UserCategory,
  IsTaskCompleted,
  IsTaskFailed,
  IsTaskTrashed
) {
  this.ID = ID;
  this.Title = Title;
  this.DisplayDate = DisplayDate;
  this.DisplayTime = DisplayTime;
  this.NumericDate = NumericDate;
  this.Descryption = Descryption;
  this.UserCategory = UserCategory;
  this.IsTaskCompleted = IsTaskCompleted;
  this.IsTaskFailed = IsTaskFailed;
  this.IsTaskTrashed = IsTaskTrashed;
}
function AddTask() {
  let ID = "Task-" + GenerateUniqeID(5);
  let Title = document.getElementById("task-title-input").value;
  let DisplayDate;
  if (UserSettings.Calendar === "Solar") {
    DisplayDate = ExtractDate("Solar", "String");
  }
  if (UserSettings.Calendar === "Gregorian") {
    DisplayDate = ExtractDate("Gregorian", "String");
  }
  let DisplayTime = DateObject.Hour + ":" + DateObject.Minute;
  let NumericDate = ExtractDate("Numeric");
  let SelectBox = document.getElementById("select-category-select-box");
  let SelectedOptionIndex = SelectBox.selectedIndex;
  let UserCategory = SelectBox.options[SelectedOptionIndex].value;
  let NewTask = new NewTaskConstructor(
    ID,
    Title,
    DisplayDate,
    DisplayTime,
    NumericDate,
    false,
    UserCategory,
    false,
    false,
    false
  );
  AllTasksArray.push(NewTask);
  localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
  CategoriesTasks(localStorage.getItem("SelectedCategory"));
}
function CompleteTask(ActionType, ID) {
  if (ActionType === "SingleOperation") {
    for (i = 0; i < AllTasksArray.length; i++) {
      if (AllTasksArray[i].ID === ID) {
        AllTasksArray[i].IsTaskCompleted = true;
        localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
        CategoriesTasks(localStorage.getItem("SelectedCategory"));
      }
    }
    CheckForSelectedTasks();
  } else {
    let CheckBoxes = document.querySelectorAll(".task-container .checkbox");
    for (CheckBoxCounter = 0; CheckBoxCounter < CheckBoxes.length; CheckBoxCounter++) {
      if (CheckBoxes[CheckBoxCounter].checked) {
        for (i = 0; i < AllTasksArray.length; i++) {
          if (AllTasksArray[i].ID === CheckBoxes[CheckBoxCounter].parentNode.parentNode.id) {
            AllTasksArray[i].IsTaskCompleted = true;
            localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
            CategoriesTasks(localStorage.getItem("SelectedCategory"));
          }
        }
      }
    }
    CheckForSelectedTasks();
  }
  if (document.getElementById("select-all-checkbox").checked) {
    document.getElementById("select-all-checkbox").checked = false;
  }
}
function DeleteTask(ActionType, ID) {
  if (ActionType === "SingleOperation") {
    for (i = 0; i < AllTasksArray.length; i++) {
      if (AllTasksArray[i].ID === ID) {
        AllTasksArray.splice(i, 1);
        localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
        if (DoesElementExist("trash-bin-section")) {
          LoadTrashedTasks();
        } else {
          CategoriesTasks(localStorage.getItem("SelectedCategory"));
        }
      }
    }
    CheckForSelectedTasks();
  } else {
    let CheckBoxes = document.querySelectorAll(".task-container .checkbox");
    for (CheckBoxCounter = 0; CheckBoxCounter < CheckBoxes.length; CheckBoxCounter++) {
      if (CheckBoxes[CheckBoxCounter].checked) {
        for (i = 0; i < AllTasksArray.length; i++) {
          if (AllTasksArray[i].ID === CheckBoxes[CheckBoxCounter].parentNode.parentNode.id) {
            AllTasksArray.splice(i, 1);
            localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
            if (DoesElementExist("trash-bin-section")) {
              LoadTrashedTasks();
            } else {
              CategoriesTasks(localStorage.getItem("SelectedCategory"));
            }
          }
        }
      }
    }
    CheckForSelectedTasks();
  }
  if (document.getElementById("select-all-checkbox").checked) {
    document.getElementById("select-all-checkbox").checked = false;
  }
}
function RestoreTasks(ActionType, ID) {
  if (ActionType === "SingleOperation") {
    for (i = 0; i < AllTasksArray.length; i++) {
      if (AllTasksArray[i].ID === ID) {
        if (AllTasksArray[i].IsTaskCompleted) {
          AllTasksArray[i].IsTaskCompleted = false;
          localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
        }
        if (AllTasksArray[i].IsTaskFailed) {
          AllTasksArray[i].IsTaskFailed = false;
          localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
        }
        if (AllTasksArray[i].IsTaskTrashed) {
          AllTasksArray[i].IsTaskTrashed = false;
          localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
        }
        if (DoesElementExist("trash-bin-section")) {
          LoadTrashedTasks();
        } else {
          CategoriesTasks(localStorage.getItem("SelectedCategory"));
        }
      }
    }
    CheckForSelectedTasks();
  } else {
    let CheckBoxes = document.querySelectorAll(".task-container .checkbox");
    for (CheckBoxCounter = 0; CheckBoxCounter < CheckBoxes.length; CheckBoxCounter++) {
      if (CheckBoxes[CheckBoxCounter].checked) {
        for (i = 0; i < AllTasksArray.length; i++) {
          if (AllTasksArray[i].ID === CheckBoxes[CheckBoxCounter].parentNode.parentNode.id) {
            if (AllTasksArray[i].IsTaskCompleted) {
              AllTasksArray[i].IsTaskCompleted = false;
              localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
            }
            if (AllTasksArray[i].IsTaskFailed) {
              AllTasksArray[i].IsTaskFailed = false;
              localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
            }
            if (AllTasksArray[i].IsTaskTrashed) {
              AllTasksArray[i].IsTaskTrashed = false;
              localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
            }
            if (DoesElementExist("trash-bin-section")) {
              LoadTrashedTasks();
            } else {
              CategoriesTasks(localStorage.getItem("SelectedCategory"));
            }
          }
        }
      }
    }
    CheckForSelectedTasks();
  }
  if (document.getElementById("select-all-checkbox").checked) {
    document.getElementById("select-all-checkbox").checked = false;
  }
}
function FailTask(ActionType, ID) {
  if (ActionType === "SingleOperation") {
    for (i of AllTasksArray) {
      if (i.ID === ID) {
        i.IsTaskCompleted = false;
        i.IsTaskFailed = true;
        localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
        CategoriesTasks(localStorage.getItem("SelectedCategory"));
      }
    }
    CheckForSelectedTasks();
  } else {
    let CheckBoxes = document.querySelectorAll(".task-container .checkbox");
    let CheckedBoxes = [];
    CheckBoxes.forEach((CheckBox) => {
      if (CheckBox.checked) {
        CheckedBoxes.push(CheckBox);
      }
    });
    for (n of CheckedBoxes) {
      for (i of AllTasksArray) {
        if (i.ID === n.parentNode.parentNode.id) {
          i.IsTaskCompleted = false;
          i.IsTaskFailed = true;
          localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
          CategoriesTasks(localStorage.getItem("SelectedCategory"));
        }
      }
    }
    CheckForSelectedTasks();
  }
  if (document.getElementById("select-all-checkbox").checked)
    document.getElementById("select-all-checkbox").checked = false;
}
function CategoriesTasks(ID) {
  let Categories = document.querySelectorAll(".category-buttons");
  for (n of Categories) {
    if (n.id === ID) {
      n.style.backgroundColor = "#40C057";
    } else {
      n.style = "";
      n.style = "";
    }
  }
  if (ID === "category-to-do") {
    localStorage.setItem("SelectedCategory", ID.toString());
    AppendHTMLElements("AppendCompleteTaskButton");
    let ToDoListArray = [];
    if (CheckForSave("AllTasks")) {
      AllTasksArray.forEach((Task) => {
        if (!Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed) {
          ToDoListArray.push(Task);
        }
      });
    }
    if (ToDoListArray.length === 0) {
      DisableTaskBarButtons();
      DisableSelectAllOption();
      EmptyBox(Strings.NoTaskToDoMessage[UserSettings.CurrentLang]);
    } else {
      CheckForSelectedTasks();
      EnableSelectAllOption();
      ClearListSection();
      AppendHTMLElements("AppendTaskContainer", ToDoListArray);
    }
  }
  if (ID === "category-today") {
    localStorage.setItem("SelectedCategory", ID.toString());
    AppendHTMLElements("AppendCompleteTaskButton");
    let ToDoListArray = [];
    let TodayTasks = [];
    if (CheckForSave("AllTasks")) {
      AllTasksArray.forEach((Task) => {
        if (!Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed) {
          ToDoListArray.push(Task);
        }
      });
      let Today = new Date().getDate();
      for (n of ToDoListArray) {
        let DaysLeft = new Date(n.NumericDate).getDate() - Today;
        if (DaysLeft === 0) {
          TodayTasks.push(n);
        }
      }
    }
    if (TodayTasks.length === 0) {
      DisableTaskBarButtons();
      DisableSelectAllOption();
      EmptyBox(Strings.NoTaskForTodayMessage[UserSettings.CurrentLang]);
    } else {
      CheckForSelectedTasks();
      EnableSelectAllOption();
      ClearListSection();
      AppendHTMLElements("AppendTaskContainer", TodayTasks);
    }
  }
  if (ID === "category-tomorrow") {
    localStorage.setItem("SelectedCategory", ID.toString());
    AppendHTMLElements("AppendCompleteTaskButton");
    let ToDoListArray = [];
    let TomorrowTasks = [];
    if (CheckForSave("AllTasks")) {
      AllTasksArray.forEach((Task) => {
        if (!Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed) {
          ToDoListArray.push(Task);
        }
      });
      let Today = new Date().getDate();
      for (n of ToDoListArray) {
        let DaysLeft = new Date(n.NumericDate).getDate() - Today;
        if (DaysLeft === 1) {
          TomorrowTasks.push(n);
        }
      }
    }
    if (TomorrowTasks.length === 0) {
      DisableTaskBarButtons();
      DisableSelectAllOption();
      EmptyBox(Strings.NoTaskForTomorrowMessage[UserSettings.CurrentLang]);
    } else {
      CheckForSelectedTasks();
      EnableSelectAllOption();
      ClearListSection();
      AppendHTMLElements("AppendTaskContainer", TomorrowTasks);
    }
  }
  if (ID === "category-in-2-days") {
    localStorage.setItem("SelectedCategory", ID.toString());
    AppendHTMLElements("AppendCompleteTaskButton");
    let ToDoListArray = [];
    let In2DaysTasks = [];
    if (CheckForSave("AllTasks")) {
      AllTasksArray.forEach((Task) => {
        if (!Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed) {
          ToDoListArray.push(Task);
        }
      });
      let Today = new Date().getDate();
      for (n of ToDoListArray) {
        let DaysLeft = new Date(n.NumericDate).getDate() - Today;
        if (DaysLeft === 2) {
          In2DaysTasks.push(n);
        }
      }
    }
    if (In2DaysTasks.length === 0) {
      DisableTaskBarButtons();
      DisableSelectAllOption();
      EmptyBox(Strings.NoTaskIn2DaysMessage[UserSettings.CurrentLang]);
    } else {
      CheckForSelectedTasks();
      EnableSelectAllOption();
      ClearListSection();
      AppendHTMLElements("AppendTaskContainer", In2DaysTasks);
    }
  }
  if (ID === "category-completed") {
    localStorage.setItem("SelectedCategory", ID.toString());
    AppendHTMLElements("AppendRestoreTaskButton");
    let CompletedTasksArray = [];
    if (CheckForSave("AllTasks")) {
      CheckForSelectedTasks();
      EnableSelectAllOption();
      AllTasksArray.forEach((Task) => {
        if (Task.IsTaskCompleted && !Task.IsTaskTrashed && !Task.IsTaskFailed) {
          CompletedTasksArray.push(Task);
        }
      });
    }
    if (CompletedTasksArray.length === 0) {
      DisableTaskBarButtons();
      DisableSelectAllOption();
      EmptyBox(Strings.NoCompletedTaskMessage[UserSettings.CurrentLang]);
    } else {
      ClearListSection();
      AppendHTMLElements("AppendCompletedTaskContainer", CompletedTasksArray);
    }
  }
  if (ID === "category-failed") {
    localStorage.setItem("SelectedCategory", ID.toString());
    AppendHTMLElements("AppendRestoreTaskButton");
    let FailedTasksArray = [];
    if (CheckForSave("AllTasks")) {
      CheckForSelectedTasks();
      EnableSelectAllOption();
      AllTasksArray.forEach((Task) => {
        if (Task.IsTaskFailed && !Task.IsTaskTrashed && !Task.IsTaskCompleted) {
          FailedTasksArray.push(Task);
        }
      });
    }
    if (FailedTasksArray.length === 0) {
      DisableTaskBarButtons();
      DisableSelectAllOption();
      EmptyBox(Strings.NoFailedTaskMessage[UserSettings.CurrentLang]);
    } else {
      ClearListSection();
      AppendHTMLElements("AppendFailedTaskContainer", FailedTasksArray);
    }
  }
  if (ID.includes("UserCategory")) {
    localStorage.setItem("SelectedCategory", ID.toString());
    let SelectedCategory;
    UserCategoriesArray.forEach((Category) => {
      if (Category.ID === ID) {
        SelectedCategory = Category;
      }
    });
    if (!SelectedCategory) {
      CategoriesTasks("category-to-do");
      return;
    }
    DisplayUGCP(SelectedCategory.Name, SelectedCategory.Icon);
    let UserFilteredArray = [];
    AllTasksArray.forEach((Task) => {
      if (Task.UserCategory === ID && !Task.IsTaskCompleted && !Task.IsTaskFailed && !Task.IsTaskTrashed) {
        UserFilteredArray.push(Task);
      }
    });
    if (UserFilteredArray.length >= 1) {
      ClearListSection();
      AppendHTMLElements("AppendTaskContainer", UserFilteredArray);
    } else {
      EmptyBox(Strings.NoTaskInUserCategory[UserSettings.CurrentLang]);
    }
    // Remove Highlight style from other sidebar items
    let SideBarItems = document.querySelectorAll(".side-bar-item");
    for (n in SideBarItems) {
      SideBarItems[n].style = "";
    }
  }
}
function MoveToToday(ID) {
  if (UserSettings.Calendar === "Solar") {
    let NumericToday = new Date().getTime();
    let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
    let GregorianMonth = new Date().getMonth() + 1;
    let GregorianDay = new Date().getDate();
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2]
      .toString()
      .padStart(2, "0")}`;
    AllTasksArray.forEach((Task) => {
      if (Task.ID === ID) {
        Task.DisplayDate = DisplayDate;
        Task.NumericDate = NumericToday;
      }
    });
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    LoadSelectedCategory();
  }
  if (UserSettings.Calendar === "Gregorian") {
    let NumericToday = new Date().getTime();
    let GregDate = new Date();
    let GregorianYear = Number(new Date().getFullYear().toString().substring(0, 4));
    let GregorianMonth = (GregDate.getMonth() + 1).toString().padStart(2, "0");
    let GregorianDay = GregDate.getDate().toString().padStart(2, "0");
    let DisplayDate = `${GregorianYear} / ${GregorianMonth} / ${GregorianDay}`;
    AllTasksArray.forEach((Task) => {
      if (Task.ID === ID) {
        Task.DisplayDate = DisplayDate;
        Task.NumericDate = NumericToday;
      }
    });
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    LoadSelectedCategory();
  }
}
function MoveToPreviousDay(ID) {
  if (UserSettings.Calendar === "Solar") {
    let Index;
    for (n = 0; n < AllTasksArray.length; n++) {
      if (AllTasksArray[n].ID === ID) {
        Index = n;
      }
    }
    let TaskNumericDate = AllTasksArray[Index].NumericDate;
    let NumericPreviousDay = TaskNumericDate - 24 * 60 * 60 * 1000;
    let GregorianYear = Number(new Date(NumericPreviousDay).getFullYear().toString().substring(0, 4));
    let GregorianMonth = new Date(NumericPreviousDay).getMonth() + 1;
    let GregorianDay = new Date(NumericPreviousDay).getDate();
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2]
      .toString()
      .padStart(2, "0")}`;
    AllTasksArray[Index].DisplayDate = DisplayDate;
    AllTasksArray[Index].NumericDate = NumericPreviousDay;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    LoadSelectedCategory();
  }
  if (UserSettings.Calendar === "Gregorian") {
    let Index;
    for (n = 0; n < AllTasksArray.length; n++) {
      if (AllTasksArray[n].ID === ID) {
        Index = n;
      }
    }
    let TaskNumericDate = AllTasksArray[Index].NumericDate;
    let NumericPreviousDay = TaskNumericDate - 24 * 60 * 60 * 1000;
    let GregorianYear = Number(new Date(NumericPreviousDay).getFullYear().toString().substring(0, 4));
    let GregorianMonth = (new Date(NumericPreviousDay).getMonth() + 1).toString().padStart(2, "0");
    let GregorianDay = new Date(NumericPreviousDay).getDate().toString().padStart(2, "0");
    let DisplayDate = `${GregorianYear} / ${GregorianMonth} / ${GregorianDay}`;
    AllTasksArray[Index].DisplayDate = DisplayDate;
    AllTasksArray[Index].NumericDate = NumericPreviousDay;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    LoadSelectedCategory();  
  }
}
function MoveToNextDay(ID) {
  if (UserSettings.Calendar === "Solar") {
    let Index;
    for (n = 0; n < AllTasksArray.length; n++) {
      if (AllTasksArray[n].ID === ID) {
        Index = n;
      }
    }
    let TaskNumericDate = AllTasksArray[Index].NumericDate;
    let NumericNextDay = TaskNumericDate + 24 * 60 * 60 * 1000;
    let GregorianYear = Number(new Date(NumericNextDay).getFullYear().toString().substring(0, 4));
    let GregorianMonth = new Date(NumericNextDay).getMonth() + 1;
    let GregorianDay = new Date(NumericNextDay).getDate();
    let SolarDate = farvardin.gregorianToSolar(GregorianYear, GregorianMonth, GregorianDay, "array");
    let DisplayDate = `${SolarDate[0]} / ${SolarDate[1].toString().padStart(2, "0")} / ${SolarDate[2]
      .toString()
      .padStart(2, "0")}`;
    AllTasksArray[Index].DisplayDate = DisplayDate;
    AllTasksArray[Index].NumericDate = NumericNextDay;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    LoadSelectedCategory();
  }
  if (UserSettings.Calendar === "Gregorian") {
    let Index;
    for (n = 0; n < AllTasksArray.length; n++) {
      if (AllTasksArray[n].ID === ID) {
        Index = n;
      }
    }
    let TaskNumericDate = AllTasksArray[Index].NumericDate;
    let NumericNextDay = TaskNumericDate + 24 * 60 * 60 * 1000;
    let GregorianYear = Number(new Date(NumericNextDay).getFullYear().toString().substring(0, 4));
    let GregorianMonth = (new Date(NumericNextDay).getMonth() + 1).toString().padStart(2, "0");
    let GregorianDay = new Date(NumericNextDay).getDate().toString().padStart(2, "0");
    let DisplayDate = `${GregorianYear} / ${GregorianMonth} / ${GregorianDay}`;
    AllTasksArray[Index].DisplayDate = DisplayDate;
    AllTasksArray[Index].NumericDate = NumericNextDay;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    LoadSelectedCategory();  
  }
}
