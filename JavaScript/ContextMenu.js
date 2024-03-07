function DisplayUserCategoryContextMenu(Event) {
  if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
  // Context Menu
  const UserCategoryContextMenu = document.createElement("section");
  UserCategoryContextMenu.id = "context-menu";
  // Edit Button
  const EditUserCategoryButton = document.createElement("button");
  const EditUserCategoryText = document.createElement("span");
  const EditUserCategoryIcon = document.createElement("img");
  EditUserCategoryButton.className = "context-menu-item";
  EditUserCategoryText.className = "context-menu-text";
  EditUserCategoryIcon.className = "context-menu-icon";
  EditUserCategoryIcon.src = IconsSrc.EditIcon[UserSettings.Theme];
  EditUserCategoryText.innerText = Strings.Edit[UserSettings.CurrentLang];
  EditUserCategoryText.setAttribute("inert", "");
  EditUserCategoryIcon.setAttribute("inert", "");
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
  DeleteUserCategoryText.className = "context-menu-text";
  DeleteUserCategoryIcon.className = "context-menu-icon";
  DeleteUserCategoryIcon.src = IconsSrc.DeleteIcon[UserSettings.Theme];
  DeleteUserCategoryText.innerText = Strings.Delete[UserSettings.CurrentLang];
  DeleteUserCategoryIcon.setAttribute("inert", "");
  DeleteUserCategoryText.setAttribute("inert", "");
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
  if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
  // Context Menu
  const TaskContextMenu = document.createElement("section");
  TaskContextMenu.id = "context-menu";
  // Pin Button
  const PinTaskButton = document.createElement("button");
  const PinTaskText = document.createElement("span");
  const PinTaskIcon = document.createElement("img");
  PinTaskButton.className = "context-menu-item";
  PinTaskText.className = "context-menu-text";
  PinTaskIcon.className = "context-menu-icon";
  PinTaskIcon.src = IconsSrc.PinIcon[UserSettings.Theme];
  PinTaskText.innerText = Strings.Pin[UserSettings.CurrentLang];
  PinTaskIcon.setAttribute("inert", "");
  PinTaskText.setAttribute("inert", "");
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
  UnPinTaskText.className = "context-menu-text";
  UnPinTaskIcon.className = "context-menu-icon";
  UnPinTaskIcon.src = IconsSrc.PinIcon[UserSettings.Theme];
  UnPinTaskText.innerText = Strings.UnPin[UserSettings.CurrentLang];
  UnPinTaskIcon.setAttribute("inert", "");
  UnPinTaskText.setAttribute("inert", "");
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
  DeSelectTaskText.className = "context-menu-text";
  DeSelectTaskIcon.className = "context-menu-icon";
  DeSelectTaskIcon.src = IconsSrc.DeselctIcon[UserSettings.Theme];
  DeSelectTaskText.innerText = Strings.DeSelect[UserSettings.CurrentLang];
  DeSelectTaskIcon.setAttribute("inert", "");
  DeSelectTaskText.setAttribute("inert", "");
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
  SelectTaskText.className = "context-menu-text";
  SelectTaskIcon.className = "context-menu-icon";
  SelectTaskIcon.src = IconsSrc.SelectIcon[UserSettings.Theme];
  SelectTaskText.innerText = Strings.Select[UserSettings.CurrentLang];
  SelectTaskIcon.setAttribute("inert", "");
  SelectTaskText.setAttribute("inert", "");
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
  EditTaskText.className = "context-menu-text";
  EditTaskIcon.className = "context-menu-icon";
  EditTaskIcon.src = IconsSrc.EditIcon[UserSettings.Theme];
  EditTaskText.innerText = Strings.Edit[UserSettings.CurrentLang];
  EditTaskIcon.setAttribute("inert", "");
  EditTaskText.setAttribute("inert", "");
  EditTaskButton.addEventListener("click", () => {
    EditModal(Event.target.id);
    HideContextMenu();
  });
  EditTaskButton.append(EditTaskText, EditTaskIcon);
  // Move to next day Button
  const MoveToNextDayButton = document.createElement("button");
  const MoveToNextDayText = document.createElement("span");
  const MoveToNextDayIcon = document.createElement("img");
  MoveToNextDayButton.className = "context-menu-item";
  MoveToNextDayText.className = "context-menu-text";
  MoveToNextDayIcon.className = "context-menu-icon";
  MoveToNextDayIcon.src = IconsSrc.NextDayIcon[UserSettings.Theme];
  MoveToNextDayText.innerText = Strings.MoveToNextDay[UserSettings.CurrentLang];
  MoveToNextDayIcon.setAttribute("inert", "");
  MoveToNextDayText.setAttribute("inert", "");
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
  MoveToPreviousDayText.className = "context-menu-text";
  MoveToPreviousDayIcon.className = "context-menu-icon";
  MoveToPreviousDayIcon.src = IconsSrc.PreviousDayIcon[UserSettings.Theme];
  MoveToPreviousDayText.innerText = Strings.MoveToPreviousDay[UserSettings.CurrentLang];
  MoveToPreviousDayIcon.setAttribute("inert", "");
  MoveToPreviousDayText.setAttribute("inert", "");
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
  MoveToTodayText.className = "context-menu-text";
  MoveToTodayIcon.className = "context-menu-icon";
  MoveToTodayIcon.src = IconsSrc.TodayIcon[UserSettings.Theme];
  MoveToTodayText.innerText = Strings.MoveToToday[UserSettings.CurrentLang];
  MoveToTodayIcon.setAttribute("inert", "");
  MoveToTodayText.setAttribute("inert", "");
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
  CompleteTaskText.className = "context-menu-text";
  CompleteTaskIcon.className = "context-menu-icon";
  CompleteTaskIcon.src = IconsSrc.CompleteIcon[UserSettings.Theme];
  CompleteTaskText.innerText = Strings.CompleteTask[UserSettings.CurrentLang];
  CompleteTaskIcon.setAttribute("inert", "");
  CompleteTaskText.setAttribute("inert", "");
  CompleteTaskButton.addEventListener("click", () => {
    SelectMode ? CompleteTask() : CompleteTask(Event.target.id);
    HideContextMenu();
  });
  CompleteTaskButton.append(CompleteTaskText, CompleteTaskIcon);
  // Fail Task Button
  const FailTaskButton = document.createElement("button");
  const FailTaskText = document.createElement("span");
  const FailTaskIcon = document.createElement("img");
  FailTaskButton.className = "context-menu-item";
  FailTaskText.className = "context-menu-text";
  FailTaskIcon.className = "context-menu-icon";
  FailTaskIcon.src = IconsSrc.FailIcon[UserSettings.Theme];
  FailTaskText.innerText = Strings.FailTask[UserSettings.CurrentLang];
  FailTaskIcon.setAttribute("inert", "");
  FailTaskText.setAttribute("inert", "");
  FailTaskButton.addEventListener("click", () => {
    SelectMode ? FailTask() : FailTask(Event.target.id);
    HideContextMenu();
  });
  FailTaskButton.append(FailTaskText, FailTaskIcon);
  // Restore Task Button
  const RestoreTaskButton = document.createElement("button");
  const RestoreTaskText = document.createElement("span");
  const RestoreTaskIcon = document.createElement("img");
  RestoreTaskButton.className = "context-menu-item";
  RestoreTaskText.className = "context-menu-text";
  RestoreTaskIcon.className = "context-menu-icon";
  RestoreTaskIcon.src = IconsSrc.RestoreIcon[UserSettings.Theme];
  RestoreTaskText.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
  RestoreTaskIcon.setAttribute("inert", "");
  RestoreTaskText.setAttribute("inert", "");
  RestoreTaskButton.addEventListener("click", () => {
    if (Target.IsTaskTrashed) {
      SelectMode ? RestoreFromTrash() : RestoreFromTrash(Event.target.id);
      HideContextMenu();
    } else if (!Target.IsTaskTrashed && Target.IsTaskCompleted) {
      SelectMode ? RestoreFromCompleted() : RestoreFromCompleted(Event.target.id);
      HideContextMenu();
    } else if (!Target.IsTaskTrashed && Target.IsTaskFailed) {
      SelectMode ? RestoreFromFailed() : RestoreFromFailed(Event.target.id);
      HideContextMenu();
    }
  });
  RestoreTaskButton.append(RestoreTaskText, RestoreTaskIcon);
  // Move to trash Button
  const MoveToTrashButton = document.createElement("button");
  const MoveToTrashText = document.createElement("span");
  const MoveToTrashIcon = document.createElement("img");
  MoveToTrashButton.className = "context-menu-item";
  MoveToTrashText.className = "context-menu-text";
  MoveToTrashIcon.className = "context-menu-icon";
  MoveToTrashIcon.src = IconsSrc.TrashIcon[UserSettings.Theme];
  MoveToTrashText.innerText = Strings.MoveToTrash[UserSettings.CurrentLang];
  MoveToTrashIcon.setAttribute("inert", "");
  MoveToTrashText.setAttribute("inert", "");
  MoveToTrashButton.addEventListener("click", () => {
    SelectMode ? MoveToTrash() : MoveToTrash(Event.target.id);
    HideContextMenu();
  });
  MoveToTrashButton.append(MoveToTrashText, MoveToTrashIcon);
  // Delete Button
  const DeleteTaskButton = document.createElement("button");
  const DeleteTaskText = document.createElement("span");
  const DeleteTaskIcon = document.createElement("img");
  DeleteTaskButton.className = "context-menu-item";
  DeleteTaskText.className = "context-menu-text";
  DeleteTaskIcon.className = "context-menu-icon";
  DeleteTaskIcon.src = IconsSrc.DeleteIcon[UserSettings.Theme];
  DeleteTaskText.innerText = Strings.Delete[UserSettings.CurrentLang];
  DeleteTaskIcon.setAttribute("inert", "");
  DeleteTaskText.setAttribute("inert", "");
  DeleteTaskButton.addEventListener("click", () => {
    SelectMode ? DeleteModal(TargetType, Event.target.id) : DeleteTask(Event.target.id);
    HideContextMenu();
  });
  DeleteTaskButton.append(DeleteTaskText, DeleteTaskIcon);
  // Assemble
  switch (TargetType) {
    case "Normal":
      if (!Target.IsTaskPinned) TaskContextMenu.append(PinTaskButton);
      if (Target.IsTaskPinned) TaskContextMenu.append(UnPinTaskButton);
      //
      let TaskDate = new Date(Target.NumericDate).getDate();
      let Today = new Date().getDate();
      if (TaskDate !== Today) TaskContextMenu.append(MoveToTodayButton);
      //
      TaskContextMenu.append(
        EditTaskButton,
        MoveToNextDayButton,
        MoveToPreviousDayButton,
        CompleteTaskButton,
        FailTaskButton,
        MoveToTrashButton,
        DeleteTaskButton
      );
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
  console.log(TaskContextMenu);
  // Width and heights
  let WindowWidth = window.innerWidth;
  let WindowHeight = window.innerHeight;
  let MenuWidth = TaskContextMenu.offsetWidth;
  let MenuHeight = TaskContextMenu.offsetHeight;
  // Client X and Y
  let X = Event.clientX;
  let Y = Event.clientY;
  X = X > WindowWidth - MenuWidth ? WindowWidth - MenuWidth - 10 : X;
  Y = Y > WindowHeight - MenuHeight ? WindowHeight - MenuHeight - 10 : Y;
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
  if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
}
function FreezScroll(Event) {
  if (DoesElementExist("context-menu")) Event.preventDefault();
}
