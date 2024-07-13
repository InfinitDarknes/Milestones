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
  const BrightNessOverlay = ReturnBrightnessOverlay();
  const BackgroundImage = ReturnBackgroundImage();
  Body.append(TopBar, Sidebar, BrightNessOverlay);
  /* Both BackgroundImage and BackgroundImageAnimation cover the entire screen
  So if one of them is active we do not need the other on to have a background image*/
  if (UserSettings.BgAnimation === "None") {
    const ParticleJS = document.getElementById("particles-js");
    ParticleJS.style.display = "none";
    Body.append(BackgroundImage);
  } else {
    const ParticleJS = document.getElementById("particles-js");
    ParticleJS.style.backgroundImage = `url(${UserSettings.Wallpaper})`;
  }
  DisplayUserCategories();
  if (CheckForSave("LastWindow")) {
    ChangeWindow(localStorage.getItem("LastWindow"), true);
  } else {
    localStorage.setItem("LastWindow", "Home-Unfinished");
    ChangeWindow("Home-Unfinished", true);
  }
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
  PreLoader.className = "preloader";
  const PreLoaderIcon = document.createElement("img");
  PreLoaderIcon.className = "preloader-icon";
  PreLoaderIcon.src = IconsSrc.PreLoaderGif[UserSettings.Theme];
  const PreLoaderText = document.createElement("span");
  PreLoaderText.className = "preloader-text text";
  PreLoaderText.innerText = Strings.Loading[UserSettings.Lang];
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
// Saving
function Save(Type) {
  switch (Type) {
    case "Tasks":
      localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
      break;
    case "UGC":
      localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
      break;
    case "Notes":
      localStorage.setItem("Notes", JSON.stringify(NotesArray));
      break;
    case "UserSettings":
      localStorage.setItem("UserSettings", JSON.stringify(UserSettings));
      break;
  }
  return `Saved ${Type} successfully`;
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
  if (CheckForSave("UserSettings")) {
    UserSettings = JSON.parse(localStorage.getItem("UserSettings"));
  }
  KeepUpWithUpdates();
}
function KeepUpWithUpdates() {
  // Updaing UserSettings properties
  const CheckUserSettingsObj = () => {
    const Usermade_UserSettings = JSON.parse(localStorage.getItem("UserSettings"));
    let Entries = Object.entries(UserSettings);
    let CloneEntries = Object.entries(Usermade_UserSettings);
    let Condition1 = Entries.every((Item) => {
      return Usermade_UserSettings[Item[0]];
    });
    let Condition2 = CloneEntries.every((Item) => {
      return UserSettings[Item[0]];
    });
    if (!Condition2) {
      for (let i in Usermade_UserSettings) {
        if (!UserSettings[i]) {
          delete UserSettings[i];
          Save("UserSettings");
        }
      }
    }
    if (!Condition1) {
      for (let i in UserSettings) {
        console.log(UserSettings[i]);
        if (!Usermade_UserSettings[i]) {
          Usermade_UserSettings[i] = UserSettings[i];
          Save("UserSettings");
        }
      }
    }
  };
  /* sometimes a new property is added to the app objects or the objects representing tasks
  but that property is not included in previously created tasks or objects so here we check
  these stuff and try to add/remove properties. */
  const CheckThemeObj = () => {
    if (!CheckForSave("UserThemes")) return;
    let UserThemes = JSON.parse(localStorage.getItem("UserThemes"));
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
    if (!Condition2) {
      let DeprecatedProperties = [];
      for (let i in UserThemes) {
        if (!ThemeObj[i]) {
          DeprecatedProperties.push(UserThemes[i]);
          delete UserThemes[i];
          localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
        }
      }
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
    // Syncing Selector value
    for (let i in UserThemes) {
      for (let j in ThemeObj) {
        if (i === j && UserThemes[i].Selector !== ThemeObj[j].Selector) {
          UserThemes[i].Selector = ThemeObj[j].Selector;
          localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
        }
      }
    }
    // Syncing sub properties
    for (let a in UserThemes) {
      for (let b in UserThemes[a].Themes) {
        for (let c in UserThemes[a].Themes[b]) {
          for (let a2 in ThemeObj) {
            for (let b2 in ThemeObj[a2].Themes) {
              for (let c2 in ThemeObj[a2].Themes[b2]) {
                if (a !== a2) continue;
                if (UserThemes[a].Themes[b][c] && ThemeObj[a2].Themes[b2][c] === undefined) {
                  delete UserThemes[a].Themes[b][c];
                } else if (UserThemes[a].Themes[b][c2] === undefined && ThemeObj[a2].Themes[b2][c2]) {
                  UserThemes[a].Themes[b][c2] = ThemeObj[a2].Themes[b2][c2];
                } else continue;
              }
            }
          }
        }
      }
    }
    ThemeObj = UserThemes;
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
  CheckUserSettingsObj();
  CheckThemeObj();
  CheckTasksObject();
}
function ShortCutManager(Event) {
  const SearchBar = document.querySelector(".search-bar");
  // ESC
  if (Event.keyCode === 27) {
    // Modal first , Select bar second , Settings third
    if (!document.querySelector(".modal") && !AppObj.SelectMode && document.querySelector(".settings-container")) {
      HideSettings();
    }
    if (AppObj.SelectMode && !document.querySelector(".modal")) {
      ExitSelectMode();
    }
    if (document.querySelector(".modal")) {
      Event.preventDefault();
      HideModal(".modal.active");
    }
  }
  // Enter
  if (Event.keyCode === 13) {
    if (document.querySelector(".modal")) {
      const ConfirmBtn = document.querySelector(".modal.active .confirm-btn");
      if (ConfirmBtn) {
        Event.preventDefault();
        ConfirmBtn.click();
      }
    }
  }
  // CTRL + F
  if (Event.ctrlKey && Event.key === "f") {
    Event.preventDefault();
    SearchBar.focus();
  }
  // CTRL + S
  if (Event.ctrlKey && Event.key === "s") {
    Event.preventDefault();
    if (AppObj.EditNoteMode && document.querySelector(".read-note-modal.active")) {
      document.querySelector(".apply-note-edit-btn").click();
    }
    if (document.querySelector(".theme-tweaker-modal.active")) {
      document.querySelector(".apply-btn").click();
    }
  }
  // F1
  if (Event.keyCode === 112) {
    Event.preventDefault();
    if (
      !AppObj.CurrentWindow.includes("Completed") &&
      !AppObj.CurrentWindow.includes("Failed") &&
      !AppObj.CurrentWindow.includes("Trash") &&
      !AppObj.CurrentWindow.includes("Notes")
    ) {
      NewTaskModal();
    } else if (AppObj.CurrentWindow.includes("Notes")) {
      AddNoteModal();
    }
  }
  // F2
  if (Event.keyCode === 113) {
    Event.preventDefault();
    NewCategoryModal();
  }
  // F3
  if (Event.keyCode === 114) {
    Event.preventDefault();
    BackUpModal();
  }
  // F4
  if (Event.keyCode === 115) {
    ThemeTweakerModal();
  }
  // F5
  if (Event.keyCode === 116) {
    Event.preventDefault();
    if (document.querySelector(".settings-container")) HideSettings();
    else DisplaySettings();
  }
  // F6
  if (Event.keyCode === 117) {
    Event.preventDefault();
    AccountModal();
  }
  // DEL
  if (AppObj.SelectMode && Event.keyCode === 46) {
    if (AppObj.CurrentWindow.includes("Trash")) {
      DeleteModal("Trashed");
    } else {
      DeleteModal("Normal");
    }
  }
}
