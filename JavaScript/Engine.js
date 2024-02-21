window.onload = function () {
  setTimeout(HidePreLoader, 1000);
  LoadUserSettings();
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
};
function HidePreLoader() {
  const PreLoader = document.getElementById("preloader");
  PreLoader.style.opacity = "0";
  setTimeout(() => {
    PreLoader.style.display = "none";
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
    Event.preventDefault();
    HideModal();
  }
  if (Event.ctrlKey && Event.keyCode === 70) {
    Event.preventDefault();
    SearchBar.focus();
  }
}
