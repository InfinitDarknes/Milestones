let SelectedUserCategory = "";
let UserCategoriesArray = [];
let TempUserCategoryInfo = {
  Name: null,
  Color: null,
  Icon: null,
};
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
  SaveAll();
  DisplayUserCategories();
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
  SaveAll();
  DisplayUserCategories();
  DisplayHomeWindow();
}
function ResetTempUserCategoryInfo() {
  TempUserCategoryInfo.Name = null;
  TempUserCategoryInfo.Color = null;
  TempUserCategoryInfo.Icon = null;
}
