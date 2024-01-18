function EditPopUp(ID) {
  if (DoesElementExist("pop-up-container")) return;
  let TaskIndex;
  let TaskDate;
  let TaskTitle;
  let UserCategory;
  for (n of AllTasksArray) {
    if (ID === n.ID) {
      TaskIndex = AllTasksArray.indexOf(n);
      TaskDate = n.DisplayDate;
      TaskTitle = n.Title;
      TaskHour = new Date(n.NumericDate).getHours();
      TaskMinute = new Date(n.NumericDate).getMinutes();
      UserCategory = n.UserCategory;
      break;
    }
  }
  let PopUpContainer = document.createElement("section");
  PopUpContainer.id = "pop-up-container";
  PopUpContainer.className = "pop-up";
  let PopUpInputsContainer = document.createElement("section");
  PopUpInputsContainer.id = "pop-up-inputs-container";
  // Edit Title Section
  let EditTitleSection = document.createElement("section");
  let TitleInputBadge = document.createElement("span");
  let EditTitleInput = document.createElement("input");
  EditTitleInput.value = TaskTitle;
  EditTitleSection.id = "edit-title-section";
  EditTitleInput.id = "edit-title-input";
  TitleInputBadge.className = "badge-modified";
  EditTitleInput.className = "task-input";
  TitleInputBadge.innerText = Strings.TitleInputBadge[UserSettings.CurrentLang];
  PopUpInputsContainer.appendChild(EditTitleSection);
  EditTitleSection.appendChild(TitleInputBadge);
  EditTitleSection.appendChild(EditTitleInput);
  // Edit Date Section
  let EditDateSection = document.createElement("section");
  let DateInputBadge = document.createElement("span");
  let EditDateInput = document.createElement("input");
  EditDateInput.value = TaskDate;
  EditDateSection.id = "edit-date-section";
  DateInputBadge.className = "badge-modified";
  EditDateInput.id = "edit-date-input";
  EditDateInput.className = "task-input";
  EditDateInput.className = "task-input";
  EditDateInput.className = "task-input";
  DateInputBadge.innerText = Strings.DateInputBadge[UserSettings.CurrentLang];
  EditDateInput.setAttribute("readonly", "");
  EditDateInput.setAttribute("onclick", "CreateDatePicker(this.id)");
  PopUpInputsContainer.appendChild(EditDateSection);
  EditDateSection.appendChild(DateInputBadge);
  EditDateSection.appendChild(EditDateInput);
  // Select Category Section
  const CategoriesTasksSection = document.createElement("section");
  const CategoriesTasksSectionBadge = document.createElement("span");
  const CategoriesTasksSelectBox = document.createElement("select");
  const CategoryNoneOption = document.createElement("option");
  CategoryNoneOption.value = "None";
  CategoryNoneOption.innerText = Strings.CategoryNoneOption[UserSettings.CurrentLang];
  CategoriesTasksSelectBox.appendChild(CategoryNoneOption);
  UserCategoriesArray.forEach((Category) => {
    const CategoryOption = document.createElement("option");
    CategoryOption.innerText = Category.Name;
    CategoryOption.value = Category.ID;
    CategoriesTasksSelectBox.appendChild(CategoryOption);
  });
  CategoriesTasksSection.id = "select-category-section";
  CategoriesTasksSelectBox.id = "select-category-select-box";
  CategoriesTasksSectionBadge.className = "badge-modified";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  CategoriesTasksSection.appendChild(CategoriesTasksSelectBox);
  CategoriesTasksSection.appendChild(CategoriesTasksSectionBadge);
  // Button Container and Confirm/Cancel Button
  let PopUpButtonContainer = document.createElement("section");
  PopUpButtonContainer.id = "pop-up-button-container";
  let ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.innerText = Strings.EditPopUpConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    AllTasksArray[TaskIndex].Title = EditTitleInput.value;
    AllTasksArray[TaskIndex].DisplayDate = EditDateInput.value;
    AllTasksArray[TaskIndex].DisplayTime = `${DateObject.Hour}:${DateObject.Minute}`;
    AllTasksArray[TaskIndex].NumericDate = ExtractDate("Numeric");
    let SelectBox = document.getElementById("select-category-select-box");
    let SelectedOptionIndex = SelectBox.selectedIndex;
    let NewUserCategory = SelectBox.options[SelectedOptionIndex].value;
    AllTasksArray[TaskIndex].UserCategory = NewUserCategory;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    CategoriesTasks(localStorage.getItem("SelectedCategory"));
    console.log(localStorage.getItem("SelectedCategory"));
    HidePopUp("pop-up-container");
  });
  let CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.innerText = Strings.EditPopUpCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  let HidePopUpBtn = document.createElement("button");
  HidePopUpBtn.id = "close-btn";
  HidePopUpBtn.innerHTML = "<img src='Icons/CrossSign.png'>";
  HidePopUpBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  PopUpContainer.appendChild(HidePopUpBtn);
  PopUpContainer.appendChild(PopUpInputsContainer);
  PopUpContainer.appendChild(CategoriesTasksSection);
  PopUpContainer.appendChild(PopUpButtonContainer);
  PopUpButtonContainer.appendChild(ConfirmBtn);
  PopUpButtonContainer.appendChild(CancelBtn);
  PopUpContainer.style.top = "-50%";
  PopUpContainer.style.transition = "transform 1s";
  document.body.appendChild(PopUpContainer);
  // Select Appropiate option based on selected task category
  const CategoryOptions = document.querySelectorAll("#select-category-select-box option");
  CategoryOptions.forEach((Option) => {
    if (Option.value === UserCategory) {
      Option.selected = true;
    }
  });
  void PopUpContainer.offsetWidth;
  PopUpContainer.style.transform = "translateY(150%)";
}
function NewTaskPopUp() {
  if (DoesElementExist("pop-up-container")) return;
  const PopUpContainer = document.createElement("section");
  PopUpContainer.id = "pop-up-container";
  PopUpContainer.className = "pop-up";
  const PopUpInputsContainer = document.createElement("section");
  PopUpInputsContainer.id = "pop-up-inputs-container";
  // Task Title Section
  const TaskTitleSection = document.createElement("section");
  const TitleInputBadge = document.createElement("span");
  const TaskTitleInput = document.createElement("input");
  TaskTitleSection.id = "task-title-section";
  TitleInputBadge.className = "badge-modified";
  TaskTitleInput.id = "task-title-input";
  TaskTitleInput.className = "task-input";
  TitleInputBadge.innerText = Strings.TitleInputBadge[UserSettings.CurrentLang];
  TaskTitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.CurrentLang];
  TaskTitleSection.appendChild(TitleInputBadge);
  TaskTitleSection.appendChild(TaskTitleInput);
  // Task Date Section
  const TaskDateSection = document.createElement("section");
  const DateInputBadge = document.createElement("span");
  const TaskDateInput = document.createElement("input");
  TaskDateSection.id = "task-date-section";
  DateInputBadge.className = "badge-modified";
  TaskDateInput.id = "task-date-input";
  TaskDateInput.className = "task-input";
  DateInputBadge.innerText = Strings.DateInputBadge[UserSettings.CurrentLang];
  TaskDateInput.placeholder = Strings.TaskDateInputPlaceHolder[UserSettings.CurrentLang];
  TaskDateInput.setAttribute("readonly", "");
  TaskDateInput.setAttribute("onclick", "CreateDatePicker(this.id)");
  TaskDateSection.appendChild(DateInputBadge);
  TaskDateSection.appendChild(TaskDateInput);
  // Select Category Section
  const CategoriesTasksSection = document.createElement("section");
  const CategoriesTasksSectionBadge = document.createElement("span");
  const CategoriesTasksSelectBox = document.createElement("select");
  const CategoryNoneOption = document.createElement("option");
  CategoryNoneOption.value = "None";
  CategoryNoneOption.innerText = Strings.CategoryNoneOption[UserSettings.CurrentLang];
  CategoriesTasksSelectBox.appendChild(CategoryNoneOption);
  UserCategoriesArray.forEach((Category) => {
    const CategoryOption = document.createElement("option");
    CategoryOption.innerText = Category.Name;
    CategoryOption.value = Category.ID;
    CategoriesTasksSelectBox.appendChild(CategoryOption);
  });
  CategoriesTasksSection.id = "select-category-section";
  CategoriesTasksSelectBox.id = "select-category-select-box";
  CategoriesTasksSectionBadge.className = "badge-modified";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  CategoriesTasksSection.appendChild(CategoriesTasksSelectBox);
  CategoriesTasksSection.appendChild(CategoriesTasksSectionBadge);
  // Button Container and Confirm/Cancel Button
  const PopUpButtonContainer = document.createElement("section");
  PopUpButtonContainer.id = "pop-up-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.innerText = Strings.NewTaskPopUpConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (document.getElementById("task-title-input").value !== "") {
      AddTask();
      HidePopUp();
    } else {
      document.getElementById("task-title-input").style.border = "1px solid red";
    }
  });
  let CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.innerText = Strings.NewTaskPopUpCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  let HidePopUpBtn = document.createElement("button");
  HidePopUpBtn.id = "close-btn";
  HidePopUpBtn.innerHTML = "<img src='Icons/CrossSign.png'>";
  HidePopUpBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  PopUpContainer.appendChild(HidePopUpBtn);
  PopUpInputsContainer.appendChild(TaskTitleSection);
  PopUpInputsContainer.appendChild(TaskDateSection);
  PopUpInputsContainer.appendChild(CategoriesTasksSection);
  PopUpContainer.appendChild(PopUpInputsContainer);
  PopUpContainer.appendChild(PopUpButtonContainer);
  PopUpButtonContainer.appendChild(ConfirmBtn);
  PopUpButtonContainer.appendChild(CancelBtn);
  PopUpContainer.style.top = "-50%";
  PopUpContainer.style.transition = "transform 1s";
  document.body.appendChild(PopUpContainer);
  // Select Appropiate option based on selected task category
  const CategoryOptions = document.querySelectorAll("#select-category-select-box option");
  CategoryOptions.forEach((Option) => {
    if (Option.value === localStorage.getItem("SelectedCategory")) {
      Option.selected = true;
    }
  });
  void PopUpContainer.offsetWidth;
  PopUpContainer.style.transform = "translateY(150%)";
}
function NewCategoryPopUp() {
  if (DoesElementExist("pop-up-container")) return;
  const PopUpContainer = document.createElement("section");
  PopUpContainer.id = "pop-up-container";
  PopUpContainer.className = "pop-up";
  const PopUpInputsContainer = document.createElement("section");
  PopUpInputsContainer.id = "pop-up-inputs-container";
  // Task Title Section
  const CategoryTitleSection = document.createElement("section");
  const CategoryNameInputBadge = document.createElement("span");
  const CategoryTitleInput = document.createElement("input");
  CategoryTitleSection.id = "category-title-section";
  CategoryNameInputBadge.className = "badge-modified";
  CategoryTitleInput.id = "category-title-input";
  CategoryTitleInput.className = "task-input";
  CategoryNameInputBadge.innerText = Strings.NewCategoryInputBadge[UserSettings.CurrentLang];
  CategoryTitleInput.placeholder = Strings.NewCategoryTitleInputPlaceHolder[UserSettings.CurrentLang];
  CategoryTitleInput.addEventListener("input", () => {
    TempUserCategoryInfo.Name = CategoryTitleInput.value;
  });
  CategoryTitleSection.appendChild(CategoryNameInputBadge);
  CategoryTitleSection.appendChild(CategoryTitleInput);
  // Choose color section
  const PickColorSection = document.createElement("section");
  const PickColorBadge = document.createElement("span");
  const ColorsContainer = document.createElement("section");
  PickColorBadge.className = "badge";
  PickColorSection.id = "pick-color-section";
  ColorsContainer.id = "colors-container";
  PickColorBadge.innerText = Strings.PickColorBadge[UserSettings.CurrentLang];
  // Colors
  CategoryColors.forEach((Color) => {
    const Button = document.createElement("button");
    Button.className = "color-pallet";
    Button.id = Color.ID;
    Button.style.background = Color.Color;
    Button.title = Color.Name;
    Button.addEventListener("click", () => {
      TempUserCategoryInfo.Color = Color.Color;
      HighLightSelectedColor(Color.ID);
    });
    ColorsContainer.appendChild(Button);
  });
  // Pick Icon Section
  // Create section and span elements
  const PickIconSection = document.createElement("section");
  const IconsContainer = document.createElement("section");
  const PickIconBadge = document.createElement("span");
  // Set ids and class names
  PickIconSection.id = "pick-icon-section";
  IconsContainer.id = "icons-container";
  PickIconBadge.className = "badge";
  PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.CurrentLang];
  // Create buttons with names
  CategoryIcons.forEach((Icon) => {
    const CategoryButton = document.createElement("button");
    CategoryButton.className = "pick-category-icon-button";
    CategoryButton.id = Icon.ID;
    CategoryButton.addEventListener("click", () => {
      TempUserCategoryInfo.Icon = Icon.Source;
      HighLightSelectedIcon(Icon.ID);
    });
    const CategoryIcon = document.createElement("img");
    CategoryIcon.className = "pick-category-icon";
    CategoryIcon.src = Icon.Source;
    CategoryButton.appendChild(CategoryIcon);
    IconsContainer.appendChild(CategoryButton);
  });
  // Button Container and Confirm/Cancel Button
  const PopUpButtonContainer = document.createElement("section");
  PopUpButtonContainer.id = "pop-up-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.innerText = Strings.NewCategoryPopUpConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (AddCategory()) HidePopUp("pop-up-container");
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.innerText = Strings.NewCategoryPopUpCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  const HidePopUpBtn = document.createElement("button");
  HidePopUpBtn.id = "close-btn";
  HidePopUpBtn.innerHTML = "<img src='Icons/CrossSign.png'>";
  HidePopUpBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  // Append elements to the DOM
  PopUpContainer.appendChild(HidePopUpBtn);
  PopUpInputsContainer.appendChild(CategoryTitleSection);
  PopUpContainer.appendChild(PopUpInputsContainer);
  PopUpContainer.appendChild(PickColorSection);
  PickColorSection.appendChild(PickColorBadge);
  PickColorSection.appendChild(ColorsContainer);
  PopUpContainer.appendChild(PickIconSection);
  PickIconSection.appendChild(IconsContainer);
  PickIconSection.appendChild(PickIconBadge);
  PopUpContainer.appendChild(PopUpButtonContainer);
  PopUpButtonContainer.appendChild(ConfirmBtn);
  PopUpButtonContainer.appendChild(CancelBtn);
  PopUpContainer.style.top = "-50%";
  PopUpContainer.style.transition = "transform 1s";
  document.body.appendChild(PopUpContainer);
  void PopUpContainer.offsetWidth;
  PopUpContainer.style.transform = "translateY(120%)";
}
function EditCategoryPopUp(ID) {
  if (DoesElementExist("pop-up-container")) return;
  // Finding Target Category
  let Index;
  for (n = 0; n < UserCategoriesArray.length; n++) {
    if (UserCategoriesArray[n].ID === ID) Index = n;
  }
  TempUserCategoryInfo.Name = UserCategoriesArray[Index].Name;
  TempUserCategoryInfo.Color = UserCategoriesArray[Index].Color;
  TempUserCategoryInfo.Icon = UserCategoriesArray[Index].Icon;
  // Pop up container
  const PopUpContainer = document.createElement("section");
  PopUpContainer.id = "pop-up-container";
  PopUpContainer.className = "pop-up";
  const PopUpInputsContainer = document.createElement("section");
  PopUpInputsContainer.id = "pop-up-inputs-container";
  // Task Title Section
  const CategoryTitleSection = document.createElement("section");
  const CategoryNameInputBadge = document.createElement("span");
  const CategoryTitleInput = document.createElement("input");
  CategoryTitleSection.id = "category-title-section";
  CategoryNameInputBadge.className = "badge-modified";
  CategoryTitleInput.id = "category-title-input";
  CategoryTitleInput.className = "task-input";
  CategoryNameInputBadge.innerText = Strings.NewCategoryInputBadge[UserSettings.CurrentLang];
  CategoryTitleInput.placeholder = Strings.NewCategoryTitleInputPlaceHolder[UserSettings.CurrentLang];
  CategoryTitleInput.addEventListener("input", () => {
    TempUserCategoryInfo.Name = CategoryTitleInput.value;
  });
  CategoryTitleInput.value = UserCategoriesArray[Index].Name;
  CategoryTitleSection.appendChild(CategoryNameInputBadge);
  CategoryTitleSection.appendChild(CategoryTitleInput);
  // Choose color section
  const PickColorSection = document.createElement("section");
  const PickColorBadge = document.createElement("span");
  const ColorsContainer = document.createElement("section");
  PickColorBadge.className = "badge";
  PickColorSection.id = "pick-color-section";
  ColorsContainer.id = "colors-container";
  PickColorBadge.innerText = Strings.PickColorBadge[UserSettings.CurrentLang];
  // Colors
  CategoryColors.forEach((Color) => {
    const Button = document.createElement("button");
    Button.className = "color-pallet";
    Button.id = Color.ID;
    Button.style.background = Color.Color;
    if (Color.Color === UserCategoriesArray[Index].Color) {
      Button.style.transform = "scale(1.2)";
    }
    Button.title = Color.Name;
    Button.addEventListener("click", () => {
      TempUserCategoryInfo.Color = Color.Color;
      HighLightSelectedColor(Color.ID);
    });
    ColorsContainer.appendChild(Button);
  });
  // Pick Icon Section
  // Create section and span elements
  const PickIconSection = document.createElement("section");
  const IconsContainer = document.createElement("section");
  const PickIconBadge = document.createElement("span");
  // Set ids and class names
  PickIconSection.id = "pick-icon-section";
  IconsContainer.id = "icons-container";
  PickIconBadge.className = "badge";
  PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.CurrentLang];
  // Create buttons with names
  CategoryIcons.forEach((Icon) => {
    const CategoryButton = document.createElement("button");
    CategoryButton.className = "pick-category-icon-button";
    CategoryButton.id = Icon.ID;
    if (Icon.Source === UserCategoriesArray[Index].Icon) {
      CategoryButton.style.transform = "scale(1.2)";
    }
    CategoryButton.addEventListener("click", () => {
      TempUserCategoryInfo.Icon = Icon.Source;
      HighLightSelectedIcon(Icon.ID);
    });
    const CategoryIcon = document.createElement("img");
    CategoryIcon.className = "pick-category-icon";
    CategoryIcon.src = Icon.Source;
    CategoryButton.appendChild(CategoryIcon);
    IconsContainer.appendChild(CategoryButton);
  });
  // Button Container and Confirm/Cancel Button
  const PopUpButtonContainer = document.createElement("section");
  PopUpButtonContainer.id = "pop-up-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (!TempUserCategoryInfo.Name || !TempUserCategoryInfo.Color || !TempUserCategoryInfo.Icon) return;
    UserCategoriesArray[Index].Color = TempUserCategoryInfo.Color;
    UserCategoriesArray[Index].Name = TempUserCategoryInfo.Name;
    UserCategoriesArray[Index].Icon = TempUserCategoryInfo.Icon;
    localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
    ResetTempUserCategoryInfo();
    AppendUGC();
    LoadSelectedCategory();
    HidePopUp();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HidePopUp();
  });
  const HidePopUpBtn = document.createElement("button");
  HidePopUpBtn.id = "close-btn";
  HidePopUpBtn.innerHTML = "<img src='Icons/CrossSign.png'>";
  HidePopUpBtn.addEventListener("click", function () {
    HidePopUp();
  });
  // Append elements to the DOM
  PopUpContainer.appendChild(HidePopUpBtn);
  PopUpInputsContainer.appendChild(CategoryTitleSection);
  PopUpContainer.appendChild(PopUpInputsContainer);
  PopUpContainer.appendChild(PickColorSection);
  PickColorSection.appendChild(PickColorBadge);
  PickColorSection.appendChild(ColorsContainer);
  PopUpContainer.appendChild(PickIconSection);
  PickIconSection.appendChild(IconsContainer);
  PickIconSection.appendChild(PickIconBadge);
  PopUpContainer.appendChild(PopUpButtonContainer);
  PopUpButtonContainer.appendChild(ConfirmBtn);
  PopUpButtonContainer.appendChild(CancelBtn);
  PopUpContainer.style.top = "-50%";
  PopUpContainer.style.transition = "transform 1s";
  document.body.appendChild(PopUpContainer);
  void PopUpContainer.offsetWidth;
  PopUpContainer.style.transform = "translateY(120%)";
}
function HighLightSelectedIcon(ID) {
  const Icons = document.querySelectorAll(".pick-category-icon-button");
  for (n = 0; n < Icons.length; n++) {
    if (Icons[n].id === ID) {
      Icons[n].style.transform = "scale(1.2)";
    } else {
      Icons[n].style.transform = "";
    }
  }
}
function HighLightSelectedColor(ID) {
  const ColorPallets = document.querySelectorAll(".color-pallet");
  for (n = 0; n < ColorPallets.length; n++) {
    if (ColorPallets[n].id === ID) {
      ColorPallets[n].style.transform = "scale(1.2)";
    } else {
      ColorPallets[n].style.transform = "";
    }
  }
}
function DeletePopUp(Type, ID) {
  // Types Include a DeletePopUp for trashed task section without any move to trash checkbox a normal one and one for deleting user categories
  const PopUpContainer = document.createElement("section");
  PopUpContainer.id = "pop-up-container";
  // Hide Button
  const HidePopUpBtn = document.createElement("button");
  HidePopUpBtn.id = "close-btn";
  HidePopUpBtn.innerHTML = "<img src='Icons/CrossSign.png'>";
  HidePopUpBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  PopUpContainer.appendChild(HidePopUpBtn);
  // Pop up text
  const PopUpText = document.createElement("p");
  PopUpText.id = "pop-up-text";
  switch (Type) {
    case "Delete":
      PopUpText.innerText = Strings.DeleteText[UserSettings.CurrentLang];
      break;
    case "DeleteTrash":
      PopUpText.innerText = Strings.DeleteTrashText[UserSettings.CurrentLang];
      break;
    case "DeleteCategory":
      PopUpText.innerText = Strings.DeleteCategoryText[UserSettings.CurrentLang];
      break;
  }
  PopUpContainer.appendChild(PopUpText);
  // Move to trash
  const MoveToTrashContainer = document.createElement("section");
  const MoveToTrashText = document.createElement("p");
  const CheckBoxContainer = document.createElement("label");
  const MoveToTrashCheckBox = document.createElement("input");
  const CheckMark = document.createElement("div");
  MoveToTrashContainer.id = "move-to-trash-container";
  MoveToTrashText.id = "move-to-trash-text";
  MoveToTrashCheckBox.id = "move-to-trash-checkbox";
  CheckBoxContainer.className = "checkbox-container";
  MoveToTrashCheckBox.className = "checkbox";
  CheckMark.className = "checkmark";
  MoveToTrashText.innerText = Strings.MoveToTrashText[UserSettings.CurrentLang];
  MoveToTrashCheckBox.type = "checkbox";
  MoveToTrashCheckBox.checked = true;
  MoveToTrashContainer.appendChild(CheckBoxContainer);
  MoveToTrashContainer.appendChild(MoveToTrashText);
  CheckBoxContainer.appendChild(MoveToTrashCheckBox);
  CheckBoxContainer.appendChild(CheckMark);
  switch (Type) {
    case "Delete":
      PopUpContainer.appendChild(MoveToTrashContainer);
      break;
    case "DeleteTrash":
      break;
    case "DeleteCategory":
      break;
  }
  // Confirm/Cancel Buttons
  const PopUpButtonContainer = document.createElement("section");
  PopUpButtonContainer.id = "pop-up-button-container";
  PopUpContainer.appendChild(PopUpButtonContainer);
  // Confirm
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.innerText = Strings.DeletePopUpConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    switch (Type) {
      case "Delete":
        DeleteTask();
        break;
      case "DeleteTrash":
        DeleteTask();
        break;
      case "DeleteCategory":
        DeleteCategory(ID);
        break;
    }
    HidePopUp("pop-up-container");
  });
  PopUpButtonContainer.appendChild(ConfirmBtn);
  // Cancel
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.innerText = Strings.DeletePopUpCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HidePopUp("pop-up-container");
  });
  PopUpButtonContainer.appendChild(CancelBtn);
  // Final
  PopUpContainer.style.top = "-50%";
  PopUpContainer.style.transition = "transform 1s";
  document.body.appendChild(PopUpContainer);
  void PopUpContainer.offsetWidth;
  switch (Type) {
    case "Delete":
      PopUpContainer.style.transform = "translateY(200%)";
      break;
    case "DeleteTrash":
      PopUpContainer.style.transform = "translateY(300%)";
      break;
    case "DeleteCategory":
      PopUpContainer.style.transform = "translateY(250%)";
      break;
  }
}
function HidePopUp() {
  let PopUp = document.getElementById("pop-up-container");
  PopUp.style.transition = "transform 1s";
  PopUp.style.transform = "translateY(-400%)";
  setTimeout(function () {
    PopUp.remove();
  }, 1000);
}
