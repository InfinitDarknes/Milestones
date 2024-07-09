function DisplayUserCategoryContextMenu(Event) {
  if (document.querySelector(".context-menu")) document.querySelector(".context-menu").remove();
  // Context Menu
  const UserCategoryContextMenu = document.createElement("section");
  UserCategoryContextMenu.className = "context-menu";
  // Edit Button
  const EditUserCategoryButton = document.createElement("button");
  const EditUserCategoryText = document.createElement("span");
  const EditUserCategoryIcon = document.createElement("img");
  EditUserCategoryButton.className = "context-menu-item";
  EditUserCategoryText.className = "context-menu-text text";
  EditUserCategoryIcon.className = "context-menu-icon icon";
  EditUserCategoryIcon.src = "../Icons/edit-circle-line.svg";
  EditUserCategoryText.innerText = Strings.Edit[UserSettings.CurrentLang];
  EditUserCategoryButton.addEventListener("click", () => {
    EditCategoryModal(Event.target.id);
    HideContextMenu();
  });
  EditUserCategoryButton.append(EditUserCategoryText);
  EditUserCategoryButton.append(EditUserCategoryIcon);
  // Delete Button
  const DeleteUserCategoryButton = document.createElement("button");
  const DeleteUserCategoryText = document.createElement("span");
  const DeleteUserCategoryIcon = document.createElement("img");
  DeleteUserCategoryButton.className = "context-menu-item";
  DeleteUserCategoryText.className = "context-menu-text text";
  DeleteUserCategoryIcon.className = "context-menu-icon icon";
  DeleteUserCategoryIcon.src = "../Icons/delete-back-2-line.svg";
  DeleteUserCategoryText.innerText = Strings.Delete[UserSettings.CurrentLang];
  DeleteUserCategoryButton.addEventListener("click", () => {
    DeleteModal("DeleteCategory", Event.target.id);
    HideContextMenu();
  });
  DeleteUserCategoryButton.append(DeleteUserCategoryText, DeleteUserCategoryIcon);
  // Assemble
  UserCategoryContextMenu.append(EditUserCategoryButton, DeleteUserCategoryButton);
  // Append
  document.body.append(UserCategoryContextMenu);
  // Width and heights
  let WindowWidth = window.innerWidth;
  let WindowHeight = window.innerHeight;
  let MenuWidth = UserCategoryContextMenu.offsetWidth;
  let MenuHeight = UserCategoryContextMenu.offsetHeight;
  UserCategoryContextMenu.off;
  // Client X and Y
  let X = Event.clientX;
  let Y = Event.clientY;
  X = X > WindowWidth - MenuWidth ? WindowWidth - MenuWidth - 10 : X;
  Y = Y > WindowHeight - MenuHeight ? WindowHeight - MenuHeight - 10 : Y;

  UserCategoryContextMenu.style.top = `${Y}px`;
  UserCategoryContextMenu.style.left = `${X}px`;
}
function DisplayTaskContextMenu(Event, TargetType) {
  let TargetIndex = FindIndexOfTask(Event.target.id);
  let Target = AllTasksArray[TargetIndex];
  if (document.querySelector(".context-menu")) document.querySelector(".context-menu").remove();
  // Context Menu
  const TaskContextMenu = document.createElement("section");
  TaskContextMenu.className = "context-menu";
  // Pin Button
  const PinTaskButton = document.createElement("button");
  const PinTaskText = document.createElement("span");
  const PinTaskIcon = document.createElement("img");
  PinTaskButton.className = "context-menu-item";
  PinTaskText.className = "context-menu-text text";
  PinTaskIcon.className = "context-menu-icon icon";
  PinTaskIcon.src = "../Icons/pushpin-line.svg";
  PinTaskText.innerText = Strings.Pin[UserSettings.CurrentLang];
  PinTaskButton.addEventListener("click", () => {
    PinTask(Event.target.id);
    HideContextMenu();
  });
  PinTaskButton.append(PinTaskText, PinTaskIcon);
  // UnPin Button
  const UnPinTaskButton = document.createElement("button");
  const UnPinTaskText = document.createElement("span");
  const UnPinTaskIcon = document.createElement("img");
  UnPinTaskButton.className = "context-menu-item";
  UnPinTaskText.className = "context-menu-text text";
  UnPinTaskIcon.className = "context-menu-icon icon";
  UnPinTaskIcon.src = "../Icons/unpin-line.svg";
  UnPinTaskText.innerText = Strings.UnPin[UserSettings.CurrentLang];
  UnPinTaskButton.addEventListener("click", () => {
    UnPinTask(Event.target.id);
    HideContextMenu();
  });
  UnPinTaskButton.append(UnPinTaskText, UnPinTaskIcon);
  // Deselect Button
  const DeSelectTaskButton = document.createElement("button");
  const DeSelectTaskText = document.createElement("span");
  const DeSelectTaskIcon = document.createElement("img");
  DeSelectTaskButton.className = "context-menu-item";
  DeSelectTaskText.className = "context-menu-text text";
  DeSelectTaskIcon.className = "context-menu-icon icon";
  DeSelectTaskIcon.src = "../Icons/navigation-line.svg";
  DeSelectTaskText.innerText = Strings.DeSelect[UserSettings.CurrentLang];
  DeSelectTaskButton.addEventListener("click", () => {
    DeSelectTask(Event.target.id);
    HideContextMenu();
  });
  DeSelectTaskButton.append(DeSelectTaskText, DeSelectTaskIcon);
  // Select Button
  const SelectTaskButton = document.createElement("button");
  const SelectTaskText = document.createElement("span");
  const SelectTaskIcon = document.createElement("img");
  SelectTaskButton.className = "context-menu-item";
  SelectTaskText.className = "context-menu-text text";
  SelectTaskIcon.className = "context-menu-icon icon";
  SelectTaskIcon.src = "../Icons/navigation-line.svg";
  SelectTaskText.innerText = Strings.Select[UserSettings.CurrentLang];
  SelectTaskButton.addEventListener("click", () => {
    SelectTask(Event.target.id);
    HideContextMenu();
  });
  SelectTaskButton.append(SelectTaskText, SelectTaskIcon);
  if (Target.Selected) TaskContextMenu.append(DeSelectTaskButton);
  else if (!Target.Selected) TaskContextMenu.append(SelectTaskButton);
  // Edit Button
  const EditTaskButton = document.createElement("button");
  const EditTaskText = document.createElement("span");
  const EditTaskIcon = document.createElement("img");
  EditTaskButton.className = "context-menu-item";
  EditTaskText.className = "context-menu-text text";
  EditTaskIcon.className = "context-menu-icon icon";
  EditTaskIcon.src = "../Icons/edit-circle-line.svg";
  EditTaskText.innerText = Strings.Edit[UserSettings.CurrentLang];
  EditTaskButton.addEventListener("click", () => {
    EditTaskModal(Event.target.id);
    HideContextMenu();
  });
  EditTaskButton.append(EditTaskText, EditTaskIcon);
  // Move to next day Button
  const MoveToNextDayButton = document.createElement("button");
  const MoveToNextDayText = document.createElement("span");
  const MoveToNextDayIcon = document.createElement("img");
  MoveToNextDayButton.className = "context-menu-item";
  MoveToNextDayText.className = "context-menu-text text";
  MoveToNextDayIcon.className = "context-menu-icon icon";
  MoveToNextDayIcon.src = "../Icons/arrow-right-line.svg";
  MoveToNextDayText.innerText = Strings.MoveToNextDay[UserSettings.CurrentLang];
  MoveToNextDayButton.addEventListener("click", () => {
    MoveToNextDay(Event.target.id);
    HideContextMenu();
  });
  MoveToNextDayButton.append(MoveToNextDayText, MoveToNextDayIcon);
  // Move to previous day Button
  const MoveToPreviousDayButton = document.createElement("button");
  const MoveToPreviousDayText = document.createElement("span");
  const MoveToPreviousDayIcon = document.createElement("img");
  MoveToPreviousDayButton.className = "context-menu-item";
  MoveToPreviousDayText.className = "context-menu-text text";
  MoveToPreviousDayIcon.className = "context-menu-icon icon";
  MoveToPreviousDayIcon.src = "../Icons/arrow-left-line.svg";
  MoveToPreviousDayText.innerText = Strings.MoveToPreviousDay[UserSettings.CurrentLang];
  MoveToPreviousDayButton.addEventListener("click", () => {
    MoveToPreviousDay(Event.target.id);
    HideContextMenu();
  });
  MoveToPreviousDayButton.append(MoveToPreviousDayText, MoveToPreviousDayIcon);
  // Move to today Button
  const MoveToTodayButton = document.createElement("button");
  const MoveToTodayText = document.createElement("span");
  const MoveToTodayIcon = document.createElement("img");
  MoveToTodayButton.className = "context-menu-item";
  MoveToTodayText.className = "context-menu-text text";
  MoveToTodayIcon.className = "context-menu-icon icon";
  MoveToTodayIcon.src = "../Icons/calendar-check-line.svg";
  MoveToTodayText.innerText = Strings.MoveToToday[UserSettings.CurrentLang];
  MoveToTodayButton.addEventListener("click", () => {
    MoveToToday(Event.target.id);
    HideContextMenu();
  });
  MoveToTodayButton.append(MoveToTodayText, MoveToTodayIcon);
  // Complete Task Button
  const CompleteTaskButton = document.createElement("button");
  const CompleteTaskText = document.createElement("span");
  const CompleteTaskIcon = document.createElement("img");
  CompleteTaskButton.className = "context-menu-item";
  CompleteTaskText.className = "context-menu-text text";
  CompleteTaskIcon.className = "context-menu-icon icon";
  CompleteTaskIcon.src = "../Icons/checkbox-circle-line.svg";
  CompleteTaskText.innerText = Strings.CompleteTask[UserSettings.CurrentLang];
  CompleteTaskButton.addEventListener("click", () => {
    AppObj.SelectMode ? CompleteTask() : CompleteTask(Event.target.id);
    HideContextMenu();
  });
  CompleteTaskButton.append(CompleteTaskText, CompleteTaskIcon);
  // Fail Task Button
  const FailTaskButton = document.createElement("button");
  const FailTaskText = document.createElement("span");
  const FailTaskIcon = document.createElement("img");
  FailTaskButton.className = "context-menu-item";
  FailTaskText.className = "context-menu-text text";
  FailTaskIcon.className = "context-menu-icon icon";
  FailTaskIcon.src = "../Icons/close-circle-line.svg";
  FailTaskText.innerText = Strings.FailTask[UserSettings.CurrentLang];
  FailTaskButton.addEventListener("click", () => {
    AppObj.SelectMode ? FailTask() : FailTask(Event.target.id);
    HideContextMenu();
  });
  FailTaskButton.append(FailTaskText, FailTaskIcon);
  // Restore Task Button
  const RestoreTaskButton = document.createElement("button");
  const RestoreTaskText = document.createElement("span");
  const RestoreTaskIcon = document.createElement("img");
  RestoreTaskButton.className = "context-menu-item";
  RestoreTaskText.className = "context-menu-text text";
  RestoreTaskIcon.className = "context-menu-icon icon";
  RestoreTaskIcon.src = "../Icons/loop-left-line.svg";
  RestoreTaskText.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
  RestoreTaskButton.addEventListener("click", () => {
    RestoreTasks(Event.target.id);
    HideContextMenu();
  });
  RestoreTaskButton.append(RestoreTaskText, RestoreTaskIcon);
  // Move to trash Button
  const MoveToTrashButton = document.createElement("button");
  const MoveToTrashText = document.createElement("span");
  const MoveToTrashIcon = document.createElement("img");
  MoveToTrashButton.className = "context-menu-item";
  MoveToTrashText.className = "context-menu-text text";
  MoveToTrashIcon.className = "context-menu-icon icon";
  MoveToTrashIcon.src = "../Icons/delete-bin-7-line.svg";
  MoveToTrashText.innerText = Strings.MoveToTrash[UserSettings.CurrentLang];
  MoveToTrashButton.addEventListener("click", () => {
    AppObj.SelectMode ? MoveToTrash() : MoveToTrash(Event.target.id);
    HideContextMenu();
  });
  MoveToTrashButton.append(MoveToTrashText, MoveToTrashIcon);
  // Delete Button
  const OnlyShowInCategoryButton = document.createElement("button");
  const OnlyShowInCategoryText = document.createElement("span");
  const OnlyShowInCategoryIcon = document.createElement("img");
  OnlyShowInCategoryButton.className = "context-menu-item";
  OnlyShowInCategoryText.className = "context-menu-text text";
  OnlyShowInCategoryIcon.className = "context-menu-icon icon";
  OnlyShowInCategoryIcon.src = Target.OnlyShowInCategory ? "../Icons/eye-line.svg" : "../Icons/eye-off-line.svg";
  OnlyShowInCategoryText.innerText = Target.OnlyShowInCategory ? Strings.ShowEveryWhere[UserSettings.CurrentLang] : Strings.OnlyShowInCategory[UserSettings.CurrentLang];
  OnlyShowInCategoryButton.addEventListener("click", () => {
    LocalizeTask(Target.ID);
    HideContextMenu();
  });
  OnlyShowInCategoryButton.append(OnlyShowInCategoryText, OnlyShowInCategoryIcon);
  // Delete Button
  const DeleteTaskButton = document.createElement("button");
  const DeleteTaskText = document.createElement("span");
  const DeleteTaskIcon = document.createElement("img");
  DeleteTaskButton.className = "context-menu-item";
  DeleteTaskText.className = "context-menu-text text";
  DeleteTaskIcon.className = "context-menu-icon icon";
  DeleteTaskIcon.src = "../Icons/delete-back-2-line.svg";
  DeleteTaskText.innerText = Strings.Delete[UserSettings.CurrentLang];
  DeleteTaskButton.addEventListener("click", () => {
    DeleteTaskButton.setAttribute("data-dis-trigger-for", Event.target.id);
    AppObj.SelectMode ? DeleteModal(TargetType, Event.target.id) : DeleteTask(Event.target.id);
    HideContextMenu();
  });
  DeleteTaskButton.append(DeleteTaskText, DeleteTaskIcon);
  // Assemble
  switch (TargetType) {
    case "Normal":
      if (!Target.Pinned && AppObj.CurrentWindow.includes("Home")) TaskContextMenu.append(PinTaskButton);
      if (Target.Pinned && AppObj.CurrentWindow.includes("Home")) TaskContextMenu.append(UnPinTaskButton);
      if (!Target.PinnedInCategory && Target.UserCategory === AppObj.SelectedUserCategory) TaskContextMenu.append(PinTaskButton);
      if (Target.PinnedInCategory && Target.UserCategory === AppObj.SelectedUserCategory) TaskContextMenu.append(UnPinTaskButton);
      //
      let TaskDate = new Date(Target.NumericDate).getDate();
      let Today = new Date().getDate();
      if (TaskDate !== Today) TaskContextMenu.append(MoveToTodayButton);
      //
      TaskContextMenu.append(EditTaskButton, MoveToNextDayButton, MoveToPreviousDayButton, CompleteTaskButton, FailTaskButton, MoveToTrashButton, DeleteTaskButton);
      if (Target.UserCategory !== "None") TaskContextMenu.append(OnlyShowInCategoryButton);
      break;
    case "Failed":
      TaskContextMenu.append(RestoreTaskButton, MoveToTrashButton, DeleteTaskButton);
      break;
    case "Completed":
      TaskContextMenu.append(FailTaskButton, RestoreTaskButton, MoveToTrashButton, DeleteTaskButton);
      break;
    case "Trashed":
      TaskContextMenu.append(RestoreTaskButton, DeleteTaskButton);
      break;
  }
  // Append
  document.body.append(TaskContextMenu);
  // Width and heights
  let WindowWidth = window.innerWidth;
  let WindowHeight = window.innerHeight;
  let MenuWidth = TaskContextMenu.offsetWidth;
  let MenuHeight = TaskContextMenu.offsetHeight;
  // Client X and Y
  let X = Event.clientX;
  let Y = Event.clientY;
  // WindowWidth - MenuWidth - 70 >> 70 = 60px for selectbar that might apear and 10px extra
  X = X > WindowWidth - MenuWidth ? WindowWidth - MenuWidth - 70 : X;
  Y = Y > WindowHeight - MenuHeight ? WindowHeight - MenuHeight - 70 : Y;
  TaskContextMenu.style.top = `${Y}px`;
  TaskContextMenu.style.left = `${X}px`;
}
function AutoHideContextMenu(Event) {
  let ClassName = Event.target.className;
  let Type = Event.type;
  if (Type === "click" && ClassName !== "context-menu-item") HideContextMenu();
  if (Type === "contextmenu" && ClassName !== "user-category-item" && !ClassName.includes("task-container")) HideContextMenu();
  if (Type === "scroll") HideContextMenu();
}
function HideContextMenu() {
  if (document.querySelector(".context-menu")) document.querySelector(".context-menu").remove();
}
function FreezScroll(Event) {
  if (document.querySelector(".context-menu")) Event.preventDefault();
}
