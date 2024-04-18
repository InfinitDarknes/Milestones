window.onload = function () {
  PreLoader();
  LoadUserSettings();
  LoadCurrentDate();
  FixDirection();
  LoadSave();
  LoadSavedNotes();
  LoadAppComponents();
  ShowDateAndClock();
  setInterval(GetTime, 1000);
  AutoWriter();
};
function LoadAppComponents() {
  const Body = document.body;
  const TopBar = ReturnTopBar();
  const Sidebar = ReturnSidebar();
  Body.append(TopBar, Sidebar);
  DisplayUserCategories();
  DisplayHomeWindow(true);
  Body.addEventListener("click", (Event) => {
    AutoHideContextMenu(Event);
  });
  Body.addEventListener("contextmenu", (Event) => {
    AutoHideContextMenu(Event);
  });
  window.addEventListener("keydown", (Event) => {
    ShortCutManager(Event);
  });
}
function PreLoader() {
  const PreLoader = document.createElement("section");
  PreLoader.id = "preloader";
  const PreLoaderIcon = document.createElement("img");
  PreLoaderIcon.id = "preloader-icon";
  PreLoaderIcon.src = IconsSrc.PreLoaderGif[UserSettings.Theme];
  const PreLoaderText = document.createElement("span");
  PreLoaderText.id = "preloader-text";
  PreLoaderText.innerText = Strings.Loading[UserSettings.CurrentLang];
  PreLoader.append(PreLoaderIcon, PreLoaderText);
  document.body.append(PreLoader);
  setTimeout(HidePreLoader, 1000);
}
function HidePreLoader() {
  let PreLoader = document.querySelector("#preloader");
  PreLoader.style.opacity = "0";
  setTimeout(() => {
    PreLoader.style.opacity = "0";
    PreLoader.remove();
  }, 1000);
}
function CheckForSave(Item) {
  let Save = localStorage.getItem(Item.toString());
  if (Save && Save.length >= 1) return true;
  else return false;
}
function LoadSave() {
  if (CheckForSave("AllTasks")) {
    AllTasksArray = JSON.parse(localStorage.getItem("AllTasks"));
    AllTasksArray.forEach((Task) => {
      Task.Selected = false;
    });
  }
  if (CheckForSave("UserCategories")) UserCategoriesArray = JSON.parse(localStorage.getItem("UserCategories"));
}
function ShortCutManager(Event) {
  const SearchBar = document.getElementById("search-bar");
  if (Event.keyCode === 27) {
    if (DoesElementExist("modal-container")) {
      Event.preventDefault();
      HideModal();
    }
  }
  if (Event.ctrlKey && Event.keyCode === 70) {
    Event.preventDefault();
    SearchBar.focus();
  }
  if (SelectMode && Event.keyCode === 46) {
    DeleteModal("Normal");
  }
  if (SelectMode && Event.keyCode === 27) {
    ExitSelectMode();
  }
}
function BgColor(Color) {
  document.querySelector("#side-bar").style.background = Color;
  document.querySelector("").style.background = Color;
  document.querySelector("").style.background = Color;
}
