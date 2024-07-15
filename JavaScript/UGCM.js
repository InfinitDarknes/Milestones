let UserCategoriesArray = [];
function NewCategoryConstructor(...Args) {
  let [ID, Name, Color, Icon] = Args;
  return {
    ID,
    Name,
    Color,
    Icon,
  };
}
function AddCategory(...Args) {
  let [Name, Color, Icon] = Args;
  let ID = "UserCategory-" + GenerateUniqeID(8);
  UserCategoriesArray.push(NewCategoryConstructor(ID, Name, Color, Icon));
  Save("UGC");
  DisplayUserCategories();
  DisplayMessage("Success", MessageBoxStrings.CategorySuccess[UserSettings.Lang]);
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
  if (ID === AppObj.SelectedUserCategory) {
    ChangeWindow("Home-Unfinished");
  }
}
