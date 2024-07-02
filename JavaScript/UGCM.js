let UserCategoriesArray = [];
let TempUserCategoryInfo = {
  Name: null,
  Color: null,
  Icon: null,
};
function NewCategoryConstructor(...Args) {
  let [ID, Name, Color, Icon] = Args;
  return {
    ID,
    Name,
    Color,
    Icon,
  };
}
function AddCategory() {
  try {
    if (!TempUserCategoryInfo.Name) throw MessageBoxStrings.EmptyCategoryTitle[UserSettings.CurrentLang];
    if (!TempUserCategoryInfo.Color) throw MessageBoxStrings.SelectColor[UserSettings.CurrentLang];
    if (!TempUserCategoryInfo.Icon) throw MessageBoxStrings.SelectIcon[UserSettings.CurrentLang];
  } catch (Message) {
    DisplayMessage("Error", Message);
    return false;
  }
  let Name = TempUserCategoryInfo.Name;
  let Color = TempUserCategoryInfo.Color;
  let Icon = TempUserCategoryInfo.Icon;
  let ID = "UserCategory-" + GenerateUniqeID(8);
  UserCategoriesArray.push(NewCategoryConstructor(ID, Name, Color, Icon));
  Save("UGC");
  DisplayUserCategories();
  ResetTempUserCategoryInfo();
  DisplayMessage("Success", MessageBoxStrings.CategorySuccess[UserSettings.CurrentLang]);
  return true;
}
function DeleteCategory(ID) {
  let FilteredTasks = AllTasksArray.filter((Task) => {
    return Task.UserCategory === ID;
  });
  FilteredTasks.forEach((Task) => {
    AllTasksArray.splice(AllTasksArray.indexOf(Task), 1);
  });
  UserCategoriesArray.forEach((Category) => {
    if (Category.ID !== ID) return;
    let Index = UserCategoriesArray.indexOf(Category);
    UserCategoriesArray.splice(Index, 1);
  });
  Save("UGC");
  DisplayUserCategories();
  DisplayHomeWindow();
}
function ResetTempUserCategoryInfo() {
  TempUserCategoryInfo.Name = null;
  TempUserCategoryInfo.Color = null;
  TempUserCategoryInfo.Icon = null;
}
