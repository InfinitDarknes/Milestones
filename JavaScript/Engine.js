window.onload = function () {
  LoadSave();
  PreLoader();
  LoadCurrentDate();
  FixDirection();
  LoadSavedNotes();
  LoadAppComponents();
  ShowDateAndClock();
  setInterval(GetTime, 1000);
  AutoWriter();
  InsertRules();
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
  window.addEventListener("reset", (Event) => {
    Event.preventDefault();
    ReLoadWarning(Event);
  });
}
function PreLoader() {
  const PreLoader = document.createElement("section");
  PreLoader.className = "preloader";
  const PreLoaderIcon = document.createElement("img");
  PreLoaderIcon.className = "preloader-icon";
  PreLoaderIcon.src = IconsSrc.PreLoaderGif[UserSettings.Theme];
  const PreLoaderText = document.createElement("span");
  PreLoaderText.className = "preloader-text text";
  PreLoaderText.innerText = Strings.Loading[UserSettings.CurrentLang];
  PreLoader.append(PreLoaderIcon, PreLoaderText);
  document.body.append(PreLoader);
  setTimeout(HidePreLoader, 1000);
}
function HidePreLoader() {
  let PreLoader = document.querySelector(".preloader");
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
  UserSettings.CurrentLang = localStorage.getItem("Lang") ? localStorage.getItem("Lang") : "en";
  UserSettings.Theme = localStorage.getItem("Theme") && AppObj.Themes.includes(localStorage.getItem("Theme")) ? localStorage.getItem("Theme") : "Dark";
  document.body.className = UserSettings.Theme;
  UserSettings.Calendar = localStorage.getItem("DatePickerType") ? localStorage.getItem("DatePickerType") : "Gregorian";
  DatePickerSettings.type = localStorage.getItem("DatePickerType") ? localStorage.getItem("DatePickerType") : "Gregorian";
  UserSettings.Brightness = localStorage.getItem("Brightness") ? localStorage.getItem("Brightness") : 100;
  const Overlay = document.getElementById("overlay");
  Overlay.style.opacity = 100 - UserSettings.Brightness + "%";

  if (CheckForSave("AllTasks")) {
    AllTasksArray = JSON.parse(localStorage.getItem("AllTasks"));
    AllTasksArray.forEach((Task) => {
      Task.Selected = false;
    });
  }
  if (CheckForSave("UserCategories")) UserCategoriesArray = JSON.parse(localStorage.getItem("UserCategories"));
  if (CheckForSave("Themes")) {
    AppObj.Themes = JSON.parse(localStorage.getItem("Themes"));
  }
  if (CheckForSave("AppElementsObjClone")) {
    let AppElementsObjClone = JSON.parse(localStorage.getItem("AppElementsObjClone"));
    const OrgonizeObjects = () => {
      let Entries = Object.entries(AppElementsObj);
      let CloneEntries = Object.entries(AppElementsObjClone);
      for (let k in Entries) {
        Entries[k][1].Order = k;
        let Match = CloneEntries.find((Item) => {
          return Item[0] === Entries[k][0];
        });
        if (Match) Match[1].Order = k;
      }
      CloneEntries.sort((A, B) => {
        return +A[1].Order > +B[1].Order;
      });
      AppElementsObj = Object.fromEntries(Entries);
      AppElementsObjClone = Object.fromEntries(CloneEntries);
    };
    OrgonizeObjects();
    let Entries = Object.entries(AppElementsObj);
    let CloneEntries = Object.entries(AppElementsObjClone);
    let Condition1 = Entries.every((Item) => {
      return AppElementsObjClone[Item[0]];
    });
    let Condition2 = CloneEntries.every((Item) => {
      return AppElementsObj[Item[0]];
    });
    console.log("Entries");
    console.table(Entries);
    console.log("Clone Entries");
    console.table(CloneEntries);
    console.log(`Clone object has all the properties of main object : ${Condition1}`);
    console.log(`Clone object has deprecated properties : ${!Condition2}`);
    console.log("Are two objects equal in properties ? ", Condition1 && Condition2);
    if (!Condition2) {
      let DeprecatedProperties = [];
      for (let i in AppElementsObjClone) {
        if (!AppElementsObj[i]) {
          DeprecatedProperties.push(AppElementsObjClone[i]);
          delete AppElementsObjClone[i];
          localStorage.setItem("AppElementsObjClone", JSON.stringify(AppElementsObjClone));
        }
      }
      console.log(`Deprecated properties were found in the clone object by comparing the clone object to main object
        and all of them were removed from the clone object`);
      console.log("Deprecated properties array : ");
      console.table(DeprecatedProperties);
    }
    if (!Condition1) {
      let NewProperties = [];
      for (let i in AppElementsObj) {
        if (!AppElementsObjClone[i]) {
          NewProperties.push(AppElementsObj[i]);
          AppElementsObjClone[i] = AppElementsObj[i];
          localStorage.setItem("AppElementsObjClone", JSON.stringify(AppElementsObjClone));
        }
      }
      console.log(`New properties were added to the main object that did not existed in the clone object so all of 
        those properties were created by the app.`);
      console.log(`New properties : `);
      console.table(NewProperties);
    }
    // Syncing themes , if you added a t
    for (let i in AppElementsObjClone) {
      for (let j of AppObj.Themes) {
        if (!AppElementsObjClone[i].Themes[j]) {
          AppElementsObjClone[i].Themes[j] = AppElementsObjClone[i].Themes.Dark;
          localStorage.setItem("AppElementsObjClone", JSON.stringify(AppElementsObjClone));
        }
      }
    }
    AppElementsObj = AppElementsObjClone;
    console.log(`The main object and clone object are synced and aligned together now.`);
    console.log("Main Object : ");
    console.table(AppElementsObj);
    console.log("Clone Object : ");
    console.table(AppElementsObjClone);
  }
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
  if (AppObj.SelectMode && Event.keyCode === 46) {
    DeleteModal("Normal");
  }
  if (AppObj.SelectMode && Event.keyCode === 27) {
    ExitSelectMode();
  }
  if (Event.keyCode === 119) {
    ThemeTweakerModal();
  }
}
function ReLoadWarning(Event) {
  let AppElementsObjClone = JSON.parse(localStorage.getItem("AppElementsObjClone"));
  if (AppElementsObjClone !== AppElementsObj) {
    let Confirm = confirm("you haven't applied changes to UI are you sure you want to reload the page ? ");
    if (Confirm) window.location.reload();
  }
}
