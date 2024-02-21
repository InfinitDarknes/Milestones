function EditModal(ID) {
  if (DoesElementExist("modal-container")) return;
  EditMode = true;
  let TaskIndex = AllTasksArray.findIndex((Task) => {
    return Task.ID === ID;
  });
  const NumericDate = AllTasksArray[TaskIndex].NumericDate;
  const TaskTitle = AllTasksArray[TaskIndex].Title;
  const UserCategory = AllTasksArray[TaskIndex].UserCategory;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.id = "modal-inputs-container";
  // Edit Title Section
  const EditTitleSection = document.createElement("section");
  const TitleInputBadge = document.createElement("span");
  const EditTitleInput = document.createElement("input");
  EditTitleInput.value = TaskTitle;
  EditTitleSection.id = "edit-title-section";
  EditTitleInput.id = "edit-title-input";
  EditTitleInput.maxLength = "70";
  TitleInputBadge.className = "badge-modified";
  EditTitleInput.className = "task-input";
  EditTitleInput.addEventListener("input", () => {
    CharacterLimit("edit-title-input");
  });
  TitleInputBadge.innerText = Strings.TitleInputBadge[UserSettings.CurrentLang];
  ModalInputsContainer.append(EditTitleSection);
  EditTitleSection.append(TitleInputBadge, EditTitleInput);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  EditTitleSection.append(CharacterLimitTag);
  // Edit Date Section
  const EditDateSection = document.createElement("section");
  const DateInputBadge = document.createElement("span");
  const EditDateInput = document.createElement("input");
  EditDateSection.id = "edit-date-section";
  EditDateInput.value = AllTasksArray[TaskIndex].DisplayDate;
  DateInputBadge.className = "badge-modified";
  EditDateInput.id = "edit-date-input";
  EditDateInput.className = "task-input";
  EditDateInput.className = "task-input";
  EditDateInput.className = "task-input";
  DateInputBadge.innerText = Strings.DateInputBadge[UserSettings.CurrentLang];
  EditDateInput.setAttribute("readonly", "");
  EditDateInput.setAttribute("data-DateObject", "");
  EditDateInput.addEventListener("click", () => {
    SetupTargetInput("edit-date-input");
    ToggleDatePicker("edit-date-input", NumericDate);
  });
  // EditDateInput.value = TaskDate;
  ModalInputsContainer.append(EditDateSection);
  EditDateSection.append(DateInputBadge, EditDateInput);
  // Select Category Section
  const CategoriesTasksSection = document.createElement("section");
  const CategoriesTasksSectionBadge = document.createElement("span");
  const CategoriesTasksSelectBox = document.createElement("select");
  const CategoryNoneOption = document.createElement("option");
  CategoryNoneOption.value = "None";
  CategoryNoneOption.innerText = Strings.CategoryNoneOption[UserSettings.CurrentLang];
  CategoriesTasksSelectBox.append(CategoryNoneOption);
  UserCategoriesArray.forEach((Category) => {
    const CategoryOption = document.createElement("option");
    CategoryOption.innerText = Category.Name;
    CategoryOption.value = Category.ID;
    CategoriesTasksSelectBox.append(CategoryOption);
  });
  CategoriesTasksSection.id = "select-category-section";
  CategoriesTasksSelectBox.id = "select-category-select-box";
  CategoriesTasksSectionBadge.className = "badge-modified";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  CategoriesTasksSection.append(CategoriesTasksSelectBox, CategoriesTasksSectionBadge);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "green-btn";
  ConfirmBtn.innerText = Strings.EditModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    AllTasksArray[TaskIndex].Title = EditTitleInput.value;
    AllTasksArray[TaskIndex].DisplayDate = EditDateInput.value;
    AllTasksArray[TaskIndex].DisplayTime = `${DateObject.Hour.toString().padStart(2, "0")} : ${DateObject.Minute.toString().padStart(2, "0")}`;
    AllTasksArray[TaskIndex].NumericDate = ExtractDate("Numeric");
    const SelectBox = document.getElementById("select-category-select-box");
    let SelectedOptionIndex = SelectBox.selectedIndex;
    let NewUserCategory = SelectBox.options[SelectedOptionIndex].value;
    AllTasksArray[TaskIndex].UserCategory = NewUserCategory;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    HideModal();
    UpdateInbox();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.className = "red-btn";
  CancelBtn.innerText = Strings.EditModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.id = "close-btn";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  //
  ModalContainer.append(HideModalBtn, ModalInputsContainer, CategoriesTasksSection, ModalButtonContainer);
  ModalContainer.style.top = "-50%";
  ModalContainer.style.transition = "transform 1s";
  document.body.append(ModalContainer);
  CharacterLimit("edit-title-input");
  // Select Appropiate option based on selected task category
  const CategoryOptions = Array.from(document.querySelectorAll("#select-category-select-box option"));
  CategoryOptions.forEach((Option) => {
    if (Option.value !== UserCategory) return;
    Option.selected = true;
    return;
  });
  void ModalContainer.offsetWidth;
  ModalContainer.style.transform = "translateY(150%)";
}
function NewTaskModal() {
  if (DoesElementExist("modal-container")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.id = "modal-inputs-container";
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
  TaskTitleInput.maxLength = "70";
  TaskTitleInput.addEventListener("input", () => {
    CharacterLimit("task-title-input");
  });
  TaskTitleSection.append(TitleInputBadge, TaskTitleInput);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  TaskTitleSection.append(CharacterLimitTag);
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
  TaskDateInput.setAttribute("data-DateObject", "");
  TaskDateInput.addEventListener("click", () => {
    SetupTargetInput("task-date-input");
    ToggleDatePicker("task-date-input");
  });
  TaskDateSection.append(DateInputBadge, TaskDateInput);
  // Select Category Section
  const CategoriesTasksSection = document.createElement("section");
  const CategoriesTasksSectionBadge = document.createElement("span");
  const CategoriesTasksSelectBox = document.createElement("select");
  const CategoryNoneOption = document.createElement("option");
  CategoryNoneOption.value = "None";
  CategoryNoneOption.innerText = Strings.CategoryNoneOption[UserSettings.CurrentLang];
  CategoriesTasksSelectBox.append(CategoryNoneOption);
  UserCategoriesArray.forEach((Category) => {
    const CategoryOption = document.createElement("option");
    CategoryOption.innerText = Category.Name;
    CategoryOption.value = Category.ID;
    CategoriesTasksSelectBox.append(CategoryOption);
  });
  CategoriesTasksSection.id = "select-category-section";
  CategoriesTasksSelectBox.id = "select-category-select-box";
  CategoriesTasksSectionBadge.className = "badge-modified";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  CategoriesTasksSection.append(CategoriesTasksSelectBox, CategoriesTasksSectionBadge);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "green-btn";
  ConfirmBtn.innerText = Strings.NewTaskModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (!TaskTitleInput.value) {
      TaskTitleInput.style.border = "1px solid red";
      return;
    }
    AddTask();
    HideModal();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.className = "red-btn";
  CancelBtn.innerText = Strings.NewTaskModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.id = "close-btn";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  //
  ModalInputsContainer.append(TaskTitleSection, TaskDateSection, CategoriesTasksSection);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, ModalButtonContainer);
  ModalContainer.style.top = "-50%";
  ModalContainer.style.transition = "transform 1s";
  document.body.append(ModalContainer);
  CharacterLimit("task-title-input");
  // Select Appropiate option based on selected task category
  const CategoryOptions = Array.from(document.querySelectorAll("#select-category-select-box option"));
  CategoryOptions.forEach((Option) => {
    if (Option.value !== SelectedUserCategory) return;
    Option.selected = true;
    return;
  });
  void ModalContainer.offsetWidth;
  ModalContainer.style.transform = "translateY(150%)";
}
function NewCategoryModal() {
  if (DoesElementExist("modal-container")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.id = "modal-inputs-container";
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
  CategoryTitleInput.maxLength = "16";
  CategoryTitleInput.addEventListener("input", () => {
    TempUserCategoryInfo.Name = CategoryTitleInput.value;
    CharacterLimit("category-title-input");
  });
  CategoryTitleSection.append(CategoryNameInputBadge, CategoryTitleInput);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  CategoryTitleSection.append(CharacterLimitTag);
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
    ColorsContainer.append(Button);
  });
  // Color Section Slide buttons
  const ColorSlideLeft = document.createElement("button");
  const ColorSlideRight = document.createElement("button");
  const ColorSlideLeftIcon = document.createElement("img");
  const ColorSlideRightIcon = document.createElement("img");
  ColorSlideLeftIcon.src = "Icons/leftArrowIcon.png";
  ColorSlideRightIcon.src = "Icons/RightArrowIcon.png";
  ColorSlideLeft.className = "slide-left-button";
  ColorSlideRight.className = "slide-right-button";
  ColorSlideLeft.id = "color-slide-left-button";
  ColorSlideRight.id = "color-slide-right-button";
  ColorSlideLeft.style.top = "35px";
  ColorSlideRight.style.top = "35px";
  ColorSlideLeft.addEventListener("click", () => {
    ScrollLeft("colors-container");
  });
  ColorSlideRight.addEventListener("click", () => {
    ScrollRight("colors-container");
  });
  ColorSlideLeft.append(ColorSlideLeftIcon);
  ColorSlideRight.append(ColorSlideRightIcon);
  PickColorSection.append(ColorSlideLeft, ColorSlideRight);
  // Pick Icon Section
  const PickIconSection = document.createElement("section");
  const IconsContainer = document.createElement("section");
  const PickIconBadge = document.createElement("span");
  // Set ids and class names
  PickIconSection.id = "pick-icon-section";
  IconsContainer.id = "icons-container";
  PickIconBadge.className = "badge";
  PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.CurrentLang];
  // Icons
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
    CategoryButton.append(CategoryIcon);
    IconsContainer.append(CategoryButton);
  });
  // Icon Section Slide buttons
  const IconSlideLeft = document.createElement("button");
  const IconSlideRight = document.createElement("button");
  const IconSlideLeftIcon = document.createElement("img");
  const IconSlideRightIcon = document.createElement("img");
  IconSlideLeftIcon.src = "Icons/leftArrowIcon.png";
  IconSlideRightIcon.src = "Icons/RightArrowIcon.png";
  IconSlideLeft.className = "slide-left-button";
  IconSlideRight.className = "slide-right-button";
  IconSlideLeft.id = "color-slide-left-button";
  IconSlideRight.id = "color-slide-right-button";
  IconSlideLeft.style.top = "42px";
  IconSlideRight.style.top = "42px";
  IconSlideLeft.addEventListener("click", () => {
    ScrollLeft("icons-container");
  });
  IconSlideRight.addEventListener("click", () => {
    ScrollRight("icons-container");
  });
  IconSlideLeft.append(IconSlideLeftIcon);
  IconSlideRight.append(IconSlideRightIcon);
  PickIconSection.append(IconSlideLeft, IconSlideRight);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "green-btn";
  ConfirmBtn.innerText = Strings.NewCategoryModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (AddCategory()) HideModal("modal-container");
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.className = "red-btn";
  CancelBtn.innerText = Strings.NewCategoryModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HideModal("modal-container");
  });
  const HideModalBtn = document.createElement("button");
  HideModalBtn.id = "close-btn";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", function () {
    HideModal("modal-container");
  });
  // Append elements to the DOM
  ModalInputsContainer.append(CategoryTitleSection);
  PickColorSection.append(PickColorBadge, ColorsContainer);
  PickIconSection.append(IconsContainer, PickIconBadge);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, PickColorSection, PickIconSection, ModalButtonContainer);
  ModalContainer.style.top = "-50%";
  ModalContainer.style.transition = "transform 1s";
  document.body.append(ModalContainer);
  CharacterLimit("category-title-input");
  void ModalContainer.offsetWidth;
  ModalContainer.style.transform = "translateY(120%)";
}
function EditCategoryModal(ID) {
  if (DoesElementExist("modal-container")) return;
  // Finding Target Category
  let Index = UserCategoriesArray.findIndex((Category) => {
    return Category.ID === ID;
  });
  TempUserCategoryInfo.Name = UserCategoriesArray[Index].Name;
  TempUserCategoryInfo.Color = UserCategoriesArray[Index].Color;
  TempUserCategoryInfo.Icon = UserCategoriesArray[Index].Icon;
  // Pop up container
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.id = "modal-inputs-container";
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
  CategoryTitleInput.maxLength = "16";
  CategoryTitleInput.addEventListener("input", () => {
    TempUserCategoryInfo.Name = CategoryTitleInput.value;
    CharacterLimit("category-title-input");
  });
  CategoryTitleInput.value = UserCategoriesArray[Index].Name;
  CategoryTitleSection.append(CategoryNameInputBadge, CategoryTitleInput);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  CategoryTitleSection.append(CharacterLimitTag);
  // Pick color section
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
    if (Color.Color === UserCategoriesArray[Index].Color) Button.style.transform = "scale(1.2)";
    Button.title = Color.Name;
    Button.addEventListener("click", () => {
      TempUserCategoryInfo.Color = Color.Color;
      HighLightSelectedColor(Color.ID);
    });
    ColorsContainer.append(Button);
  });
  // Color Section Slide buttons
  const ColorSlideLeft = document.createElement("button");
  const ColorSlideRight = document.createElement("button");
  const ColorSlideLeftIcon = document.createElement("img");
  const ColorSlideRightIcon = document.createElement("img");
  ColorSlideLeftIcon.src = "Icons/leftArrowIcon.png";
  ColorSlideRightIcon.src = "Icons/RightArrowIcon.png";
  ColorSlideLeft.className = "slide-left-button";
  ColorSlideRight.className = "slide-right-button";
  ColorSlideLeft.id = "color-slide-left-button";
  ColorSlideRight.id = "color-slide-right-button";
  ColorSlideLeft.style.top = "35px";
  ColorSlideRight.style.top = "35px";
  ColorSlideLeft.addEventListener("click", () => {
    ScrollLeft("colors-container");
  });
  ColorSlideRight.addEventListener("click", () => {
    ScrollRight("colors-container");
  });
  PickColorSection.append(PickColorBadge, ColorsContainer);
  // Pick Icon Section
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
    if (Icon.Source === UserCategoriesArray[Index].Icon) CategoryButton.style.transform = "scale(1.2)";
    CategoryButton.addEventListener("click", () => {
      TempUserCategoryInfo.Icon = Icon.Source;
      HighLightSelectedIcon(Icon.ID);
    });
    const CategoryIcon = document.createElement("img");
    CategoryIcon.className = "pick-category-icon";
    CategoryIcon.src = Icon.Source;
    CategoryButton.append(CategoryIcon);
    IconsContainer.append(CategoryButton);
  });
  // Icon Section Slide buttons
  const IconSlideLeft = document.createElement("button");
  const IconSlideRight = document.createElement("button");
  const IconSlideLeftIcon = document.createElement("img");
  const IconSlideRightIcon = document.createElement("img");
  IconSlideLeftIcon.src = "Icons/leftArrowIcon.png";
  IconSlideRightIcon.src = "Icons/RightArrowIcon.png";
  IconSlideLeft.className = "slide-left-button";
  IconSlideRight.className = "slide-right-button";
  IconSlideLeft.id = "color-slide-left-button";
  IconSlideRight.id = "color-slide-right-button";
  IconSlideLeft.style.top = "42px";
  IconSlideRight.style.top = "42px";
  IconSlideLeft.addEventListener("click", () => {
    ScrollLeft("icons-container");
  });
  IconSlideRight.addEventListener("click", () => {
    ScrollRight("icons-container");
  });
  PickIconSection.append();
  IconSlideLeft.append(IconSlideLeftIcon);
  IconSlideRight.append(IconSlideRightIcon);
  PickIconSection.append(IconsContainer, PickIconBadge, IconSlideLeft, IconSlideRight);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "green-btn";
  ConfirmBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (!TempUserCategoryInfo.Name || !TempUserCategoryInfo.Color || !TempUserCategoryInfo.Icon) return;
    UserCategoriesArray[Index].Color = TempUserCategoryInfo.Color;
    UserCategoriesArray[Index].Name = TempUserCategoryInfo.Name;
    UserCategoriesArray[Index].Icon = TempUserCategoryInfo.Icon;
    localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
    ResetTempUserCategoryInfo();
    AppendUGC();
    HideModal();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.className = "red-btn";
  CancelBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.id = "close-btn";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  // Final
  ModalInputsContainer.append(CategoryTitleSection);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, PickColorSection, ModalButtonContainer, PickIconSection);
  ModalContainer.style.top = "-50%";
  ModalContainer.style.transition = "transform 1s";
  document.body.append(ModalContainer);
  CharacterLimit("category-title-input");
  void ModalContainer.offsetWidth;
  ModalContainer.style.transform = "translateY(120%)";
}
function HighLightSelectedIcon(ID) {
  const Icons = Array.from(document.querySelectorAll(".pick-category-icon-button"));
  Icons.forEach((Icon) => {
    if (Icon.id === ID) Icon.style.transform = "scale(1.2)";
    else Icon.style.transform = "";
  });
}
function HighLightSelectedColor(ID) {
  const ColorPallets = Array.from(document.querySelectorAll(".color-pallet"));
  ColorPallets.forEach((Pallet) => {
    if (Pallet.id === ID) Pallet.style.transform = "scale(1.2)";
    else Pallet.style.transform = "";
  });
}
function DeleteModal(Type, ID) {
  // Types Include a DeleteModal for trashed task section without any move to trash checkbox a normal one and one for deleting user categories
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  // Hide Button
  const HideModalBtn = document.createElement("button");
  HideModalBtn.id = "close-btn";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  // Pop up text
  const ModalText = document.createElement("p");
  ModalText.id = "modal-text";
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
  // Confirm/Cancel Buttons
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  // Confirm
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "red-btn";
  ConfirmBtn.innerText = Strings.DeleteModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    switch (Type) {
      case "Normal":
      case "Completed":
      case "Failed":
        if (MoveToTrashCheckBox.checked) MoveToTrash();
        else DeleteTask();
        break;
      case "Trashed":
        DeleteTask();
        break;
      case "DeleteCategory":
        DeleteCategory(ID);
        break;
    }
    HideModal("modal-container");
  });
  // Cancel
  const CancelBtn = document.createElement("button");
  CancelBtn.id = "cancel-btn";
  CancelBtn.className = "green-btn";
  CancelBtn.innerText = Strings.DeleteModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  // Final
  CheckBoxContainer.append(MoveToTrashCheckBox, CheckMark);
  MoveToTrashContainer.append(CheckBoxContainer, MoveToTrashText);
  ModalButtonContainer.append(CancelBtn, ConfirmBtn);
  ModalContainer.append(HideModalBtn, ModalText, ModalButtonContainer);
  ModalContainer.style.top = "-50%";
  ModalContainer.style.transition = "transform 1s";
  document.body.append(ModalContainer);
  void ModalContainer.offsetWidth;
  switch (Type) {
    case "Normal":
    case "Completed":
    case "Failed":
      ModalText.innerText = Strings.DeleteText[UserSettings.CurrentLang];
      ModalContainer.append(MoveToTrashContainer);
      ModalContainer.style.transform = "translateY(200%)";
      break;
    case "Trashed":
      ModalText.innerText = Strings.DeleteTrashText[UserSettings.CurrentLang];
      ModalContainer.style.transform = "translateY(300%)";
      break;
    case "DeleteCategory":
      ModalText.innerText = Strings.DeleteCategoryText[UserSettings.CurrentLang];
      ModalContainer.style.transform = "translateY(250%)";
      break;
  }
}
function HideModal() {
  EditMode = false;
  let Modal = document.getElementById("modal-container");
  Modal.style.transition = "transform 1s";
  Modal.style.transform = "translateY(-400%)";
  setTimeout(function () {
    Modal.remove();
  }, 1000);
}
function CharacterLimit(ID) {
  const CharacterLimitTag = document.querySelector(".character-limit");
  let Input = document.getElementById(ID);
  CharacterLimitTag.innerText = `${Input.value.length}/${Input.maxLength}`;
}