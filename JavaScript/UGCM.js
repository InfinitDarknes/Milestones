// UGCM = User Generated Category Manager
// UGCP = User Generated Category Page
// UGC = User Generated Category
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
  { Name: "ImportantIcon", ID: "important-icon-button", Source: `Icons/CategoryIcons/ImportantIcon.png` },
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
      CategoriesTasks(Category.ID);
    });
    UserCategoryButton.addEventListener("contextmenu", (Event) => {
      Event.preventDefault();
      DisplayUserCategoryContextMenu(Event);
    });
    UserCategoryButton.appendChild(UserCategoryIcon);
    UserCategoryButton.appendChild(UserCategoryName);
    document.getElementById("user-category-container").appendChild(UserCategoryButton);
  });
}
function DisplayUGCP(Name, Icon) {
  if (DoesElementExist("settings-container")) HideSettings();

  if (DoesElementExist("trash-bin-section")) document.getElementById("trash-bin-section").remove();

  if (DoesElementExist("tasks-section")) document.getElementById("tasks-section").remove();

  if (DoesElementExist("user-category-page")) document.getElementById("user-category-page").remove();

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
  UserCategoryPageHeader.appendChild(UserCategoryPageIcon);
  UserCategoryPageHeader.appendChild(UserCategoryPageTitle);
  UserCategoryPage.appendChild(UserCategoryPageHeader);
  // Task Bar
  const TaskBar = document.createElement("section");
  const SelectAllSection = document.createElement("section");
  const TaskButtonContainer = document.createElement("section");
  TaskBar.id = "task-bar";
  SelectAllSection.id = "select-all-section";
  TaskButtonContainer.id = "task-buttons-container";
  TaskBar.appendChild(SelectAllSection);
  TaskBar.appendChild(TaskButtonContainer);
  UserCategoryPage.appendChild(TaskBar);
  // List Section
  const ListSection = document.createElement("section");
  ListSection.id = "list-section";
  UserCategoryPage.appendChild(ListSection);
  document.body.appendChild(UserCategoryPage);
  // Buttons and Checkboxes
  AppendHTMLElements("AppendSelectAllButton");
  AppendHTMLElements("AppendDeleteTaskButton");
  AppendHTMLElements("AppendCompleteTaskButton");
  AppendHTMLElements("AppendFailTaskButton");
  CheckForSelectedTasks();
}
function NewCategoryConstructor(ID, Name, Color, Icon) {
  this.ID = ID;
  this.Name = Name;
  this.Color = Color;
  this.Icon = Icon;
}
function AddCategory() {
  if (!TempUserCategoryInfo.Name || !TempUserCategoryInfo.Color || !TempUserCategoryInfo.Icon) {
    return false;
  } else {
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
}
function DeleteCategory(ID) {
  AllTasksArray.forEach((Task) => {
    if (Task.UserCategory === ID) {
      AllTasksArray.splice(AllTasksArray.indexOf(Task));
      localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    }
  });
  UserCategoriesArray.forEach((Category) => {
    if (Category.ID === ID) {
      let Index = UserCategoriesArray.indexOf(Category);
      UserCategoriesArray.splice(Index, 1);
      localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
    }
  });
  if (localStorage.getItem("SelectedCategory") && localStorage.getItem("SelectedCategory") === ID) {
    localStorage.setItem("SelectedCategory", "");
    LoadSelectedCategory();
  }
  AppendUGC();
}
function ResetTempUserCategoryInfo() {
  TempUserCategoryInfo.Name = null;
  TempUserCategoryInfo.Color = null;
  TempUserCategoryInfo.Icon = null;
}
