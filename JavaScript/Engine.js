window.onload = function () {
  LoadUserSettings();
  PreLoader();
  setTimeout(HidePreLoader, 1000);
  LoadCurrentDate();
  FixDirection();
  LoadSave();
  AppendTopBar();
  AppendSideBar();
  AppendUGC();
  DisplayHome();
  UpdateInbox();
  ShowDateAndClock();
  setInterval(GetTime, 1000);
  AutoWriter();
  document.body.addEventListener("click", (Event) => {
    AutoHideContextMenu(Event);
  });
  document.body.addEventListener("contextmenu", (Event) => {
    AutoHideContextMenu(Event);
  });
  document.getElementById("list-section").addEventListener("wheel", (Event) => {
    FreezScroll(Event);
  });
  document.addEventListener("keydown", (Event) => {
    ShortCutManager(Event);
  });
  window.addEventListener("resize", (Event) => {
    AlignModalAtCenter();
  });
};
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
  if (CheckForSave("UserCategories"))
    UserCategoriesArray = JSON.parse(localStorage.getItem("UserCategories"));
}
function ShortCutManager(Event) {
  const SearchBar = document.getElementById("search-bar");
  if (Event.keyCode === 27) {
    Event.preventDefault();
    HideModal();
  }
  if (Event.ctrlKey && Event.keyCode === 70) {
    Event.preventDefault();
    SearchBar.focus();
  }
}
