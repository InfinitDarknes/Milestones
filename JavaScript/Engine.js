let Strings;
let TextArray;
let ThemeObj;
let DPStrings; // Date Picker Strings
window.onload = async function () {
  Strings = await FetchAppJsonFiles("Json/Lang.json");
  ThemeObj = await FetchAppJsonFiles("Json/Theme.json");
  TextArray = await FetchAppJsonFiles("Json/TextArray.json");
  DPStrings = await FetchAppJsonFiles("Json/DatePickerStrings.json");
  InitializeApp();
};
function InitializeApp() {
  LoadSave();
  PreLoader();
  LoadCurrentDate();
  FixDirection();
  LoadSavedNotes();
  LoadAppComponents();
  ShowDateAndClock();
  setInterval(GetTime, 1000);
  setInterval(ShowDateAndClock, 1000);
  InsertRules();
  AutoWriter();
}
async function FetchAppJsonFiles(Path) {
  const Reasponse = await fetch(Path);
  const ParsedValue = await Reasponse.json();
  return ParsedValue;
}
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
  let counter = 0;
  for (let i in Strings) {
    counter++;
  }
  console.log(counter);
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
  if (CheckForSave("AllTasks")) {
    AllTasksArray = JSON.parse(localStorage.getItem("AllTasks"));
    AllTasksArray.forEach((Task) => {
      Task.Selected = false;
    });
  }
  if (CheckForSave("UserCategories")) {
    UserCategoriesArray = JSON.parse(localStorage.getItem("UserCategories"));
  }
  if (CheckForSave("Themes")) {
    AppObj.Themes = JSON.parse(localStorage.getItem("Themes"));
  }
  KeepUpWithUpdates();
  UserSettings.CurrentLang = localStorage.getItem("Lang") ?? "en";

  UserSettings.Theme = localStorage.getItem("Theme") && AppObj.Themes.includes(localStorage.getItem("Theme")) ? localStorage.getItem("Theme") : "Dark";
  document.body.className = UserSettings.Theme;

  UserSettings.Calendar = localStorage.getItem("DatePickerType") ?? "Gregorian";
  DatePickerSettings.type = localStorage.getItem("DatePickerType") ?? "Gregorian";

  UserSettings.Brightness = localStorage.getItem("Brightness") ?? 100;
  const Overlay = document.getElementById("overlay");
  Overlay.style.opacity = 100 - UserSettings.Brightness + "%";
}
function KeepUpWithUpdates() {
  console.log(AllTasksArray);
  /* sometimes a new property is added to the app objects or the objects representing tasks
  but that property is not included in previously created tasks or objects so here we check
  these stuff and try to add/remove properties. */
  const CheckThemeObj = () => {
    if (!CheckForSave("UserThemes")) return;
    let UserThemes = JSON.parse(localStorage.getItem("UserThemes"));
    console.log(UserThemes);
    const OrgonizeObjects = () => {
      let Entries = Object.entries(ThemeObj);
      let CloneEntries = Object.entries(UserThemes);
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
      ThemeObj = Object.fromEntries(Entries);
      UserThemes = Object.fromEntries(CloneEntries);
    };
    OrgonizeObjects();
    let Entries = Object.entries(ThemeObj);
    let CloneEntries = Object.entries(UserThemes);
    let Condition1 = Entries.every((Item) => {
      return UserThemes[Item[0]];
    });
    let Condition2 = CloneEntries.every((Item) => {
      return ThemeObj[Item[0]];
    });
    console.log("Main themes object entries");
    console.table(Entries);
    console.log("User themes object entries");
    console.table(CloneEntries);
    console.log(`User themes object has all the properties of main object : ${Condition1}`);
    console.log(`User themes object has deprecated properties : ${!Condition2}`);
    console.log("Are two objects equal in properties ? ", Condition1 && Condition2);
    if (!Condition2) {
      let DeprecatedProperties = [];
      for (let i in UserThemes) {
        if (!ThemeObj[i]) {
          DeprecatedProperties.push(UserThemes[i]);
          delete UserThemes[i];
          localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
        }
      }
      console.log(`Deprecated properties were found in the user themes theme by comparing the user themes object to main themes object
        and all of them were removed from the user themes object`);
      console.log("Deprecated properties array : ");
      console.table(DeprecatedProperties);
    }
    if (!Condition1) {
      let NewProperties = [];
      for (let i in ThemeObj) {
        if (!UserThemes[i]) {
          NewProperties.push(ThemeObj[i]);
          UserThemes[i] = ThemeObj[i];
          localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
        }
      }
      console.log(`New properties were added to the main themes object that did not existed in the user themes object so all of 
        those properties were created by the app.`);
      console.log(`New properties : `);
      console.table(NewProperties);
    }
    // Syncing themes
    for (let i in UserThemes) {
      for (let j of AppObj.Themes) {
        if (!UserThemes[i].Themes[j]) {
          UserThemes[i].Themes[j] = UserThemes[i].Themes.Dark;
          localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
        }
      }
    }
    for (let i in UserThemes) {
      for (let j in ThemeObj) {
        if (i === j && UserThemes[i].Selector !== ThemeObj[j].Selector) {
          console.log(`Deprecated selector at UserThemes : ${UserThemes[i].Selector}. replaced with ${ThemeObj[j].Selector}`);
          UserThemes[i].Selector = ThemeObj[j].Selector;
          localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
        }
      }
    }
    ThemeObj = UserThemes;
    console.log(`The main themes object and user themes object are synced and aligned together now.`);
    console.log("Main themes object : ");
    console.table(ThemeObj);
    console.log("User themes object : ");
    console.table(UserThemes);
  };
  const CheckTasksObject = () => {
    for (let i in AllTasksArray) {
      for (let j in AppObj.RequiredTaskObjProperties) {
        if (AllTasksArray[i][j] === undefined) {
          console.log(j);
          AllTasksArray[i][j] = AppObj.RequiredTaskObjProperties[j];
        }
      }
    }
    Save("Tasks");
  };
  CheckThemeObj();
  CheckTasksObject();
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
  let UserThemes = JSON.parse(localStorage.getItem("UserThemes"));
  if (UserThemes !== ThemeObj) {
    let Confirm = confirm("you haven't applied changes to UI are you sure you want to reload the page ? ");
    if (Confirm) window.location.reload();
  }
}
