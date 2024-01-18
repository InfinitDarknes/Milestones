window.onload = async function () {
  await LoadUserSettings("LoadDatePickerType");
  await LoadCurrentTime();
  await LoadUserSettings("LoadLang");
  await FixDirection();
  await LoadSave();
  await AppendHTMLElements("AppendTopBar");
  await AppendHTMLElements("AppendSideBar");
  await AppendUGC();
  await LoadSelectedCategory();
  await ShowDateAndClock();
  await setInterval(GetTime, 1000);
  await AutoWriter();
  await document.body.addEventListener("click", (Event) => {
    AutoHideContextMenu(Event);
  });
  await document.body.addEventListener("contextmenu", (Event) => {
    AutoHideContextMenu(Event);
  });
  await document.getElementById("list-section").addEventListener("wheel", (Event) => {
    FreezScroll(Event);
  });
};
function CheckForSave(Item) {
  if (localStorage.getItem(Item.toString()) && JSON.parse(localStorage.getItem(Item.toString())).length >= 1) {
    return true;
  } else {
    return false;
  }
}
function LoadSave() {
  if (CheckForSave("AllTasks")) {
    AllTasksArray = JSON.parse(localStorage.getItem("AllTasks"));
  }
  if (CheckForSave("UserCategories")) {
    UserCategoriesArray = JSON.parse(localStorage.getItem("UserCategories"));
    console.log(UserCategoriesArray);
  }
}
function LoadSelectedCategory() {
  if (localStorage.getItem("SelectedCategory") === "" || !localStorage.getItem("SelectedCategory")) {
    DisplayHome();
    CategoriesTasks("category-to-do");
  }
  if (localStorage.getItem("SelectedCategory").includes("UserCategory")) {
    CategoriesTasks(localStorage.getItem("SelectedCategory"));
  }
  if (localStorage.getItem("SelectedCategory").includes("category-")) {
    DisplayHome();
    CategoriesTasks(localStorage.getItem("SelectedCategory"));
  }
}
function SelectedCategory() {
  return localStorage.getItem("SelectedCategory");
}
