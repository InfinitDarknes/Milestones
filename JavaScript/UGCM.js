// UGCM = User Generated Category Manager
// UGCP = User Generated Category Page
// UGC = User Generated Category
let SelectedUserCategory = "";
let UserCategoriesArray = [];
let TempUserCategoryInfo = {
  Name: null,
  Color: null,
  Icon: null,
};
let CategoryColors = [
  { Name: "Green", ID: "green-pallet", Color: "#40C057" },
  { Name: "Blue", ID: "blue-pallet", Color: "#008FFD" },
  { Name: "Red", ID: "red-pallet", Color: "#FF4545" },
  { Name: "Purple", ID: "purple-pallet", Color: "#7c73e6" },
  { Name: "Sage Green", ID: "sage-green-pallet", Color: "#A3B18A" },
  { Name: "Dusty Rose", ID: "dusty-rose-pallet", Color: "#C09DA0" },
  { Name: "Muted Gold", ID: "muted-gold-pallet", Color: "#C8B580" },
  { Name: "Earthy Brown", ID: "earthy-brown-pallet", Color: "#927B6E" },
  { Name: "Soft Lavender", ID: "soft-lavender-pallet", Color: "#B9A8C9" },
  { Name: "Faded Coral", ID: "faded-coral-pallet", Color: "#D4A7A5" },
  { Name: "Vintage Blue", ID: "vintage-blue-pallet", Color: "#8494AB" },
  { Name: "Worn Olive", ID: "worn-olive-pallet", Color: "#A6A375" },
  { Name: "Dull Teal", ID: "dull-teal-pallet", Color: "#6F8D8A" },
  { Name: "Old Rose", ID: "old-rose-pallet", Color: "#B3949D" },
  { Name: "Muted Turquoise", ID: "muted-turquoise-pallet", Color: "#6D9EA5" },
  { Name: "Antique Mauve", ID: "antique-mauve-pallet", Color: "#BDA3B2" },
  { Name: "Washed Denim", ID: "washed-denim-pallet", Color: "#7D92A3" },
  { Name: "Subtle Peach", ID: "subtle-peach-pallet", Color: "#E2B9A1" },
  { Name: "Desert Sand", ID: "desert-sand-pallet", Color: "#D4C0A1" },
  { Name: "Faded Plum", ID: "faded-plum-pallet", Color: "#876477" },
  { Name: "Soft Moss", ID: "soft-moss-pallet", Color: "#7E8B6A" },
  { Name: "Aged Brick", ID: "aged-brick-pallet", Color: "#9E7E78" },
  { Name: "Stone Grey", ID: "stone-grey-pallet", Color: "#B3B8A2" },
  { Name: "Weathered Sky", ID: "weathered-sky-pallet", Color: "#A9B7C6" },
];
let CategoryIcons = [
  { Name: "BussinessIcon1", ID: "bussiness-icon1-button", Source: `Icons/CategoryIcons/BussinessIcon1.png` },
  { Name: "BussinessIcon2", ID: "bussiness-icon2-button", Source: `Icons/CategoryIcons/BussinessIcon2.png` },
  { Name: "ChoreIcon", ID: "chore-icon-button", Source: `Icons/CategoryIcons/ChoreIcon.png` },
  { Name: "FutureIcon", ID: "future-icon-button", Source: `Icons/CategoryIcons/FutureIcon.png` },
  { Name: "GameIcon", ID: "game-icon-button", Source: `Icons/CategoryIcons/GameIcon.png` },
  { Name: "ProgrammingIcon1", ID: "programming-icon-button", Source: `Icons/CategoryIcons/ProgrammingIcon.png` },
  { Name: "ProgrammingIcon2", ID: "programming-icon2-button", Source: `Icons/CategoryIcons/ProgrammingIcon2.png` },
  { Name: "FlightIcon", ID: "flight-icon-button", Source: `Icons/CategoryIcons/FlightIcon.png` },
  { Name: "PlanIcon", ID: "plan-icon-button", Source: `Icons/CategoryIcons/PlanIcon.png` },
  { Name: "CampingIcon", ID: "camping-icon-button", Source: `Icons/CategoryIcons/CampingIcon.png` },
  { Name: "SportIcon1", ID: "sport-icon1-button", Source: `Icons/CategoryIcons/SportIcon1.png` },
  { Name: "SportIcon2", ID: "sport-icon2-button", Source: `Icons/CategoryIcons/SportIcon2.png` },
  { Name: "MeetingIcon", ID: "meeting-icon-button", Source: `Icons/CategoryIcons/MeetingIcon.png` },
  { Name: "ShoppingIcon", ID: "shopping-icon-button", Source: `Icons/CategoryIcons/ShoppingIcon.png` },
  { Name: "StudyIcon", ID: "study-icon-button", Source: `Icons/CategoryIcons/StudyIcon.png` },
  { Name: "UniversityIcon", ID: "university-icon-button", Source: `Icons/CategoryIcons/UniversityIcon.png` },
  { Name: "VacationIcon", ID: "vacation-icon-button", Source: `Icons/CategoryIcons/VacationIcon.png` },
  { Name: "WorkIcon", ID: "work-icon-button", Source: `Icons/CategoryIcons/WorkIcon.png` },
];
function AppendUGC() {
  // Appending UGC buttons to sidebar
  if (!CheckForSave("UserCategories")) return;
  document.getElementById("user-category-container").innerHTML = "";
  UserCategoriesArray.forEach((Category) => {
    const UserCategoryButton = document.createElement("button");
    const UserCategoryIcon = document.createElement("img");
    const UserCategoryName = document.createElement("span");
    UserCategoryButton.className = "user-category-item";
    UserCategoryIcon.className = "user-category-icon";
    UserCategoryName.className = "user-category-name";
    UserCategoryName.setAttribute("inert", "");
    UserCategoryIcon.setAttribute("inert", "");
    UserCategoryButton.id = Category.ID;
    UserCategoryName.innerText = Category.Name;
    UserCategoryIcon.src = Category.Icon;
    UserCategoryButton.style.backgroundColor = Category.Color;
    UserCategoryButton.addEventListener("click", () => {
      CurrentWindow = `UserCategory-Unfinished`;
      SelectedUserCategory = Category.ID;
      DisplayUGCP(Category.ID);
      LoadUserCategorisedTasks(ReturnUnfinishedTasks());
      HighLightSelectedSortButton("sort-unfinished");
    });
    UserCategoryButton.addEventListener("contextmenu", (Event) => {
      Event.preventDefault();
      DisplayUserCategoryContextMenu(Event);
    });
    UserCategoryButton.append(UserCategoryIcon, UserCategoryName);
    document.getElementById("user-category-container").append(UserCategoryButton);
  });
}
function DisplayUGCP(ID) {
  if (DoesElementExist("settings-container")) HideSettings();

  if (DoesElementExist("trash-bin-section")) document.getElementById("trash-bin-section").remove();

  if (DoesElementExist("tasks-section")) document.getElementById("tasks-section").remove();

  if (DoesElementExist("user-category-page")) document.getElementById("user-category-page").remove();
  // Find Usercategory info based on id
  let SelectedCategory = UserCategoriesArray.find((Category) => {
    return Category.ID === ID;
  });
  let Name = SelectedCategory.Name;
  let Icon = SelectedCategory.Icon;
  //
  const UserCategoryPage = document.createElement("section");
  UserCategoryPage.id = "user-category-page";
  // Header
  const UserCategoryPageHeader = document.createElement("header");
  const UserCategoryPageTitle = document.createElement("span");
  const UserCategoryPageIcon = document.createElement("img");
  UserCategoryPageHeader.id = "user-category-page-header";
  UserCategoryPageTitle.id = "user-category-page-title";
  UserCategoryPageTitle.innerText = Name;
  UserCategoryPageIcon.id = "user-category-page-icon";
  UserCategoryPageIcon.src = Icon;
  const ListSection = document.createElement("section");
  ListSection.id = "list-section";
  UserCategoryPageHeader.append(UserCategoryPageIcon, UserCategoryPageTitle);
  UserCategoryPage.append(UserCategoryPageHeader, ListSection);
  document.body.append(UserCategoryPage);
  AppendTaskBar();
  AppendSelectAllSection();
  // Sort unfinished button
  if (!DoesElementExist("sort-unfinished")) {
    const SortBar = document.getElementById("sort-bar");
    const SortUnfinished = document.createElement("button");
    SortUnfinished.className = "sort-buttons";
    SortUnfinished.id = "sort-unfinished";
    SortUnfinished.textContent = Strings.SortUnfinished[UserSettings.CurrentLang];
    SortUnfinished.addEventListener("click", () => {
      CurrentWindow = `UserCategory-Unfinished`;
      LoadUserCategorisedTasks(ReturnUnfinishedTasks());
      HighLightSelectedSortButton("sort-unfinished");
      ToggleSelectMode();
      DeselectAll();
    });
    SortBar.append(SortUnfinished);
  }
  // Sort today button
  if (!DoesElementExist("sort-today")) {
    const SortBar = document.getElementById("sort-bar");
    const SortToday = document.createElement("button");
    SortToday.className = "sort-buttons";
    SortToday.id = "sort-today";
    SortToday.textContent = Strings.SortTodayButton[UserSettings.CurrentLang];
    SortToday.addEventListener("click", () => {
      CurrentWindow = `UserCategory-Today`;
      LoadUserCategorisedTasks(ReturnTodayTasks());
      HighLightSelectedSortButton("sort-today");
    });
    SortBar.append(SortToday);
  }
  // Sort tomorrow button
  if (!DoesElementExist("sort-tomorrow")) {
    const SortBar = document.getElementById("sort-bar");
    const SortTomorrow = document.createElement("button");
    SortTomorrow.className = "sort-buttons";
    SortTomorrow.id = "sort-tomorrow";
    SortTomorrow.textContent = Strings.SortTomorrowButton[UserSettings.CurrentLang];
    SortTomorrow.addEventListener("click", () => {
      CurrentWindow = `UserCategory-Tomorrow`;
      LoadUserCategorisedTasks(ReturnTomorrowTasks());
      HighLightSelectedSortButton("sort-tomorrow");
    });
    SortBar.append(SortTomorrow);
  }
  // Sort in 2 days button
  if (!DoesElementExist("sort-in-2-days")) {
    const SortBar = document.getElementById("sort-bar");
    const SortIn2Days = document.createElement("button");
    SortIn2Days.className = "sort-buttons";
    SortIn2Days.id = "sort-in-2-days";
    SortIn2Days.textContent = Strings.SortIn2DaysButton[UserSettings.CurrentLang];
    SortIn2Days.addEventListener("click", () => {
      CurrentWindow = `UserCategory-In2Days`;
      LoadUserCategorisedTasks(ReturnIn2DaysTasks());
      HighLightSelectedSortButton("sort-in-2-days");
    });
    SortBar.append(SortIn2Days);
  }
  // Search bar
  AppendSearchBar();
  // Unhover the sidebar items because the UGC are also in sidebar
  const SidebarItems = document.querySelectorAll(".side-bar-item");
  SidebarItems.forEach((Item) => {
    if (Item.className.includes("hovered")) Item.classList.remove("hovered");
  });
  ToggleSelectMode();
}
function NewCategoryConstructor(ID, Name, Color, Icon) {
  this.ID = ID;
  this.Name = Name;
  this.Color = Color;
  this.Icon = Icon;
}
function AddCategory() {
  if (!TempUserCategoryInfo.Name || !TempUserCategoryInfo.Color || !TempUserCategoryInfo.Icon) return false;
  let Name = TempUserCategoryInfo.Name;
  let Color = TempUserCategoryInfo.Color;
  let Icon = TempUserCategoryInfo.Icon;
  let ID = "UserCategory-" + GenerateUniqeID(8);
  UserCategoriesArray.push(new NewCategoryConstructor(ID, Name, Color, Icon));
  localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
  AppendUGC();
  ResetTempUserCategoryInfo();
  return true;
}
function DeleteCategory(ID) {
  AllTasksArray.forEach((Task) => {
    if (Task.UserCategory !== ID) return;
    AllTasksArray.splice(AllTasksArray.indexOf(Task));
  });
  UserCategoriesArray.forEach((Category) => {
    if (Category.ID !== ID) return;
    let Index = UserCategoriesArray.indexOf(Category);
    UserCategoriesArray.splice(Index, 1);
  });
  localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
  localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
  UpdateInbox();
  AppendUGC();
}
function ResetTempUserCategoryInfo() {
  TempUserCategoryInfo.Name = null;
  TempUserCategoryInfo.Color = null;
  TempUserCategoryInfo.Icon = null;
}
