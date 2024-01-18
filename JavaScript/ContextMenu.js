function DisplayUserCategoryContextMenu(Event) {
  if (DoesElementExist("context-menu")) {
    document.getElementById("context-menu").remove();
  }
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
  EditUserCategoryIcon.src = "Icons/EditIcon2.png";
  EditUserCategoryText.innerText = Strings.Edit[UserSettings.CurrentLang];
  EditUserCategoryText.setAttribute("inert", "");
  EditUserCategoryIcon.setAttribute("inert", "");
  EditUserCategoryButton.addEventListener("click", () => {
    EditCategoryPopUp(Event.target.id);
    HideContextMenu();
  });
  EditUserCategoryButton.appendChild(EditUserCategoryText);
  EditUserCategoryButton.appendChild(EditUserCategoryIcon);
  // Delete Button
  const DeleteUserCategoryButton = document.createElement("button");
  const DeleteUserCategoryText = document.createElement("span");
  const DeleteUserCategoryIcon = document.createElement("img");
  DeleteUserCategoryButton.className = "context-menu-item";
  DeleteUserCategoryText.className = "context-menu-text";
  DeleteUserCategoryIcon.className = "context-menu-icon";
  DeleteUserCategoryIcon.src = "Icons/TrashBinIcon.png";
  DeleteUserCategoryText.innerText = Strings.Delete[UserSettings.CurrentLang];
  DeleteUserCategoryIcon.setAttribute("inert", "");
  DeleteUserCategoryText.setAttribute("inert", "");
  DeleteUserCategoryButton.addEventListener("click", () => {
    DeletePopUp("DeleteCategory", Event.target.id);
    HideContextMenu();
  });
  DeleteUserCategoryButton.appendChild(DeleteUserCategoryText);
  DeleteUserCategoryButton.appendChild(DeleteUserCategoryIcon);
  // Assemble
  UserCategoryContextMenu.appendChild(EditUserCategoryButton);
  UserCategoryContextMenu.appendChild(DeleteUserCategoryButton);
  // Append
  document.body.appendChild(UserCategoryContextMenu);
  // Width and heights
  let WindowWidth = window.innerWidth;
  let WindowHeight = window.innerHeight;
  let MenuWidth = UserCategoryContextMenu.offsetWidth;
  let MenuHeight = UserCategoryContextMenu.offsetHeight;
  // Client X and Y
  let X = Event.clientX;
  let Y = Event.clientY;
  X = X > WindowWidth - MenuWidth ? WindowWidth - MenuWidth - 10 : X;
  Y = Y > WindowHeight - MenuHeight ? WindowHeight - MenuHeight - 10 : Y;

  UserCategoryContextMenu.style.top = `${Y}px`;
  UserCategoryContextMenu.style.left = `${X}px`;
}
function DisplayTaskContextMenu(Event, TargetType) {
  if (DoesElementExist("context-menu")) {
    document.getElementById("context-menu").remove();
  }
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
  PinTaskIcon.src = "Icons/PinIcon.png";
  PinTaskText.innerText = Strings.Pin[UserSettings.CurrentLang];
  PinTaskIcon.setAttribute("inert", "");
  PinTaskText.setAttribute("inert", "");
  PinTaskButton.addEventListener("click", () => {
    PinTask(Event.target.id);
    HideContextMenu();
  });
  PinTaskButton.appendChild(PinTaskText);
  PinTaskButton.appendChild(PinTaskIcon);
  // Edit Button
  const EditTaskButton = document.createElement("button");
  const EditTaskText = document.createElement("span");
  const EditTaskIcon = document.createElement("img");
  EditTaskButton.className = "context-menu-item";
  EditTaskText.className = "context-menu-text";
  EditTaskIcon.className = "context-menu-icon";
  EditTaskIcon.src = "Icons/EditIcon2.png";
  EditTaskText.innerText = Strings.Edit[UserSettings.CurrentLang];
  EditTaskIcon.setAttribute("inert", "");
  EditTaskText.setAttribute("inert", "");
  EditTaskButton.addEventListener("click", () => {
    EditPopUp(Event.target.id);
    HideContextMenu();
  });
  EditTaskButton.appendChild(EditTaskText);
  EditTaskButton.appendChild(EditTaskIcon);
  // Move to next day Button
  const MoveToNextDayButton = document.createElement("button");
  const MoveToNextDayText = document.createElement("span");
  const MoveToNextDayIcon = document.createElement("img");
  MoveToNextDayButton.className = "context-menu-item";
  MoveToNextDayText.className = "context-menu-text";
  MoveToNextDayIcon.className = "context-menu-icon";
  MoveToNextDayIcon.src = "Icons/NextDayIcon.png";
  MoveToNextDayText.innerText = Strings.MoveToNextDay[UserSettings.CurrentLang];
  MoveToNextDayIcon.setAttribute("inert", "");
  MoveToNextDayText.setAttribute("inert", "");
  MoveToNextDayButton.addEventListener("click",()=>{
    MoveToNextDay(Event.target.id);
    HideContextMenu();
  });
  MoveToNextDayButton.appendChild(MoveToNextDayText);
  MoveToNextDayButton.appendChild(MoveToNextDayIcon);
  // Move to previous day Button
  const MoveToPreviousDayButton = document.createElement("button");
  const MoveToPreviousDayText = document.createElement("span");
  const MoveToPreviousDayIcon = document.createElement("img");
  MoveToPreviousDayButton.className = "context-menu-item";
  MoveToPreviousDayText.className = "context-menu-text";
  MoveToPreviousDayIcon.className = "context-menu-icon";
  MoveToPreviousDayIcon.src = "Icons/PreviousDayIcon.png";
  MoveToPreviousDayText.innerText = Strings.MoveToPreviousDay[UserSettings.CurrentLang];
  MoveToPreviousDayIcon.setAttribute("inert", "");
  MoveToPreviousDayText.setAttribute("inert", "");
  MoveToPreviousDayButton.addEventListener("click",()=>{
    MoveToPreviousDay(Event.target.id);
    HideContextMenu();
  });
  MoveToPreviousDayButton.appendChild(MoveToPreviousDayText);
  MoveToPreviousDayButton.appendChild(MoveToPreviousDayIcon);
  // Move to today Button
  const MoveToTodayButton = document.createElement("button");
  const MoveToTodayText = document.createElement("span");
  const MoveToTodayIcon = document.createElement("img");
  MoveToTodayButton.className = "context-menu-item";
  MoveToTodayText.className = "context-menu-text";
  MoveToTodayIcon.className = "context-menu-icon";
  MoveToTodayIcon.src = "Icons/TodayIcon.png";
  MoveToTodayText.innerText = Strings.MoveToToday[UserSettings.CurrentLang];
  MoveToTodayIcon.setAttribute("inert", "");
  MoveToTodayText.setAttribute("inert", "");
  MoveToTodayButton.addEventListener("click",()=>{
    MoveToToday(Event.target.id);
    HideContextMenu();
  });
  MoveToTodayButton.appendChild(MoveToTodayText);
  MoveToTodayButton.appendChild(MoveToTodayIcon);
  // Complete Task Button
  const CompleteTaskButton = document.createElement("button");
  const CompleteTaskText = document.createElement("span");
  const CompleteTaskIcon = document.createElement("img");
  CompleteTaskButton.className = "context-menu-item";
  CompleteTaskText.className = "context-menu-text";
  CompleteTaskIcon.className = "context-menu-icon";
  CompleteTaskIcon.src = "Icons/DoneIcon.png";
  CompleteTaskText.innerText = Strings.CompleteTask[UserSettings.CurrentLang];
  CompleteTaskIcon.setAttribute("inert", "");
  CompleteTaskText.setAttribute("inert", "");
  CompleteTaskButton.addEventListener("click", () => {
    CompleteTask("SingleOperation", Event.target.id);
    HideContextMenu();
  });
  CompleteTaskButton.appendChild(CompleteTaskText);
  CompleteTaskButton.appendChild(CompleteTaskIcon);
  // Fail Task Button
  const FailTaskButton = document.createElement("button");
  const FailTaskText = document.createElement("span");
  const FailTaskIcon = document.createElement("img");
  FailTaskButton.className = "context-menu-item";
  FailTaskText.className = "context-menu-text";
  FailTaskIcon.className = "context-menu-icon";
  FailTaskIcon.src = "Icons/FailedIcon.png";
  FailTaskText.innerText = Strings.FailTask[UserSettings.CurrentLang];
  FailTaskIcon.setAttribute("inert", "");
  FailTaskText.setAttribute("inert", "");
  FailTaskButton.addEventListener("click", () => {
    FailTask("SingleOperation", Event.target.id);
    HideContextMenu();
  });
  FailTaskButton.appendChild(FailTaskText);
  FailTaskButton.appendChild(FailTaskIcon);
  // Restore Task Button
  const RestoreTaskButton = document.createElement("button");
  const RestoreTaskText = document.createElement("span");
  const RestoreTaskIcon = document.createElement("img");
  RestoreTaskButton.className = "context-menu-item";
  RestoreTaskText.className = "context-menu-text";
  RestoreTaskIcon.className = "context-menu-icon";
  RestoreTaskIcon.src = "Icons/RestoreIcon.png";
  RestoreTaskText.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
  RestoreTaskIcon.setAttribute("inert", "");
  RestoreTaskText.setAttribute("inert", "");
  RestoreTaskButton.addEventListener("click", () => {
    RestoreTasks("SingleOperation", Event.target.id);
    HideContextMenu();
  });
  RestoreTaskButton.appendChild(RestoreTaskText);
  RestoreTaskButton.appendChild(RestoreTaskIcon);
  // Move to trash Button
  const MoveToTrashButton = document.createElement("button");
  const MoveToTrashText = document.createElement("span");
  const MoveToTrashIcon = document.createElement("img");
  MoveToTrashButton.className = "context-menu-item";
  MoveToTrashText.className = "context-menu-text";
  MoveToTrashIcon.className = "context-menu-icon";
  MoveToTrashIcon.src = "Icons/TrashBinIcon.png";
  MoveToTrashText.innerText = Strings.MoveToTrash[UserSettings.CurrentLang];
  MoveToTrashIcon.setAttribute("inert", "");
  MoveToTrashText.setAttribute("inert", "");
  MoveToTrashButton.addEventListener("click", () => {
    MoveToTrash("SingleOperation", Event.target.id);
    HideContextMenu();
  });
  MoveToTrashButton.appendChild(MoveToTrashText);
  MoveToTrashButton.appendChild(MoveToTrashIcon);
  // Delete Button
  const DeleteTaskButton = document.createElement("button");
  const DeleteTaskText = document.createElement("span");
  const DeleteTaskIcon = document.createElement("img");
  DeleteTaskButton.className = "context-menu-item";
  DeleteTaskText.className = "context-menu-text";
  DeleteTaskIcon.className = "context-menu-icon";
  DeleteTaskIcon.src = "Icons/CrossSign.png";
  DeleteTaskText.innerText = Strings.Delete[UserSettings.CurrentLang];
  DeleteTaskIcon.setAttribute("inert", "");
  DeleteTaskText.setAttribute("inert", "");
  DeleteTaskButton.addEventListener("click", () => {
    DeleteTask("SingleOperation", Event.target.id);
    HideContextMenu();
  });
  DeleteTaskButton.appendChild(DeleteTaskText);
  DeleteTaskButton.appendChild(DeleteTaskIcon);
  // Assemble
  switch (TargetType) {
    case "Normal":
      TaskContextMenu.appendChild(EditTaskButton);
      TaskContextMenu.appendChild(PinTaskButton);
      AllTasksArray.forEach((Task) => {
        if (Task.ID === Event.target.id) {
          let TaskDate = new Date(Task.NumericDate).getDate();
          let Today = new Date().getDate();
          if (TaskDate !== Today) TaskContextMenu.appendChild(MoveToTodayButton);
        }
      });    
      TaskContextMenu.appendChild(MoveToNextDayButton);
      TaskContextMenu.appendChild(MoveToPreviousDayButton);
      TaskContextMenu.appendChild(CompleteTaskButton);
      TaskContextMenu.appendChild(FailTaskButton);
      TaskContextMenu.appendChild(MoveToTrashButton);
      TaskContextMenu.appendChild(DeleteTaskButton);
      break;
    case "Failed":
      TaskContextMenu.appendChild(RestoreTaskButton);
      TaskContextMenu.appendChild(MoveToTrashButton);
      TaskContextMenu.appendChild(DeleteTaskButton);
      break;
    case "Completed":
      TaskContextMenu.appendChild(FailTaskButton);
      TaskContextMenu.appendChild(RestoreTaskButton);
      TaskContextMenu.appendChild(MoveToTrashButton);
      TaskContextMenu.appendChild(DeleteTaskButton);
      break;
    case "Trashed":
      TaskContextMenu.appendChild(RestoreTaskButton);
      TaskContextMenu.appendChild(DeleteTaskButton);
      break;
  }
  // Append
  document.body.appendChild(TaskContextMenu);
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
  if (Event.type === "click") {
    if (Event.target.className !== "context-menu-item") {
      if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
    }
  }
  if (Event.type === "contextmenu") {
    if (Event.target.className !== "user-category-item" && Event.target.className !== "task-container") {
      if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
    }
  }
  if (Event.type === "scroll") {
    if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
  }
}
function HideContextMenu() {
  if (DoesElementExist("context-menu")) document.getElementById("context-menu").remove();
}
function FreezScroll(Event) {
  if (DoesElementExist("context-menu")) Event.preventDefault();
}
