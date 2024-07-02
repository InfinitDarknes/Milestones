function ReturnBasicModal() {
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  AddDragEventListenersToModal();
}
function ReturnCategorizeTaskSection(UserCategory) {
  /* UserCategory param is only for edit task modal because value of the select box
   is now dependent of editbale task's categroy not global vairbale "SelectedUserCategory" */

  // Custom Select box
  const CategoriesTasksSelectBox = document.createElement("div");
  const SelectBoxText = document.createElement("div");
  const SelectBoxOptionsContainer = document.createElement("div");
  const CategoryNoneOption = document.createElement("div");
  const SelectBoxIconContainer = document.createElement("div");
  const SelectBoxIcon = document.createElement("img");
  CategoryNoneOption.setAttribute("data-value", "None");
  CategoriesTasksSelectBox.setAttribute("data-value", "None");
  CategoryNoneOption.innerText = Strings.CategoryNoneOption[UserSettings.CurrentLang];
  SelectBoxText.innerText = CategoryNoneOption.innerText;
  // Select Category Section
  const CategoriesTasksSection = document.createElement("section");
  const CategoriesTasksSectionBadge = document.createElement("span");
  // class and id
  CategoriesTasksSection.className = "select-category-section";
  CategoriesTasksSectionBadge.className = "sticky-badge";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  // ClassName and ID
  CategoriesTasksSelectBox.className = "select-category-select-box";
  SelectBoxIconContainer.className = "select-box-icon-container";
  SelectBoxIcon.className = "select-box-icon icon";
  SelectBoxText.className = "select-box-text";
  CategoryNoneOption.className = "option";
  SelectBoxOptionsContainer.className = "options-container";
  CategoriesTasksSelectBox.className = "select-box";
  SelectBoxIcon.src = "../Icons/arrow-down-s-fill.svg";
  // Append
  SelectBoxIconContainer.append(SelectBoxIcon);
  CategoriesTasksSelectBox.append(SelectBoxOptionsContainer, SelectBoxText);
  SelectBoxOptionsContainer.append(CategoryNoneOption);
  CategoriesTasksSection.append(CategoriesTasksSelectBox, CategoriesTasksSectionBadge, SelectBoxIconContainer);
  UserCategoriesArray.forEach((Category) => {
    const CategoryOption = document.createElement("div");
    CategoryOption.className = "option";
    CategoryOption.innerText = Category.Name;
    CategoryOption.setAttribute("data-value", Category.ID);
    CategoryOption.addEventListener("click", () => {
      SelectBoxIconContainer.classList.toggle("show-select-box");
      CategoriesTasksSelectBox.dataset.value = CategoryOption.dataset.value;
      SelectBoxText.innerText = CategoryOption.innerText;
    });
    SelectBoxOptionsContainer.append(CategoryOption);
    // Select Appropiate option based on selected task category
    if (AppObj.CurrentWindow.includes("UserCategory-")) {
      if (CategoryOption.dataset.value === AppObj.SelectedUserCategory) {
        CategoriesTasksSelectBox.dataset.value = CategoryOption.dataset.value;
        SelectBoxText.innerText = CategoryOption.innerText;
      }
    } else if (UserCategory) {
      if (CategoryOption.dataset.value === UserCategory) {
        CategoriesTasksSelectBox.dataset.value = CategoryOption.dataset.value;
        SelectBoxText.innerText = CategoryOption.innerText;
      }
    }
  });
  // Events
  CategoryNoneOption.addEventListener("click", () => {
    SelectBoxIconContainer.classList.toggle("show-select-box");
    CategoriesTasksSelectBox.dataset.value = "None";
    SelectBoxText.innerText = CategoryNoneOption.innerText;
  });
  SelectBoxIconContainer.addEventListener("click", () => {
    SelectBoxIcon.classList.toggle("rotate-icon");
    CategoriesTasksSelectBox.click();
  });
  CategoriesTasksSelectBox.addEventListener("click", () => {
    SelectBoxIcon.classList.toggle("rotate-icon");
    SelectBoxOptionsContainer.classList.toggle("show-select-box");
  });
  return CategoriesTasksSection;
}
function SwitchValueOfCategorySelectBox(UserCategory) {
  /* A function to quickly change value of UserCategory select box , what is the usecase ? 
  say you opened NewTaskModal and you are on category X so by defualt the app will think 
  the reason you tried to add a new task while you are on Category X is that this task is 
  supposed to be categorized under X , but what if without closing the modal you switch to
  Category Y ? it is convinient for the user that app will react at this moment and change
  the category accordingly. rest of the logic related to this feature can be found in ChangeWindow()
  function. */
  const CategoriesTasksSelectBox = document.querySelector(".select-box");
  const SelectBoxText = document.querySelector(".select-box-text");
  CategoriesTasksSelectBox.dataset.value = UserCategory;
  SelectBoxText.innerText = UserCategoriesArray.filter((Category) => {
    return Category.ID === UserCategory;
  })[0].Name;
}
function AddNoteModal() {
  if (document.querySelector(".modal")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal add-note-modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.className = "modal-inputs-container";
  // Note Title Section
  const TitleSection = document.createElement("section");
  const TitleBadge = document.createElement("span");
  const TitleInput = document.createElement("input");
  TitleSection.className = "note-title-section";
  TitleBadge.className = "sticky-badge";
  TitleInput.className = "note-title-input modal-input";
  TitleBadge.innerText = Strings.Title[UserSettings.CurrentLang];
  TitleInput.placeholder = Strings.NoteTitleInputPlaceHolder[UserSettings.CurrentLang];
  TitleInput.maxLength = "30";
  TitleInput.addEventListener("input", () => CharacterLimit(".note-title-input"));
  TitleSection.append(TitleBadge, TitleInput);
  // Note text area
  const NoteSection = document.createElement("section");
  const NoteTextArea = document.createElement("textarea");
  NoteSection.className = "note-section";
  NoteTextArea.className = "note-text-area";
  const NoteBadge = document.createElement("span");
  NoteBadge.className = "sticky-badge";
  NoteBadge.innerText = Strings.NoteBadge[UserSettings.CurrentLang];
  NoteSection.append(NoteTextArea, NoteBadge);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  TitleSection.append(CharacterLimitTag);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.className = "confirm-btn green-btn";
  ConfirmBtn.innerText = Strings.NewTaskModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    let RawNoteContent = tinymce.activeEditor.getContent({ format: "raw" });
    let NoteContent = tinymce.activeEditor.getContent();
    try {
      if (!TitleInput.value) throw MessageBoxStrings.EmptyNoteTitle[UserSettings.CurrentLang];
      if (!NoteContent) throw MessageBoxStrings.EmptyNoteText[UserSettings.CurrentLang];
    } catch (Error) {
      DisplayMessage("Error", Error);
      return;
    }
    DisplayMessage("Success", MessageBoxStrings.NoteSuccess[UserSettings.CurrentLang]);
    NewNote(TitleInput.value, RawNoteContent);
    HideModal();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.className = "cancel-btn red-btn";
  CancelBtn.innerText = Strings.NewTaskModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";

  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  //
  ModalInputsContainer.append(TitleSection, NoteSection);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, ModalButtonContainer);
  document.body.append(ModalContainer);
  InitTinyMce(NoteTextArea, false);
  AddDragEventListenersToModal();
  CharacterLimit(".note-title-input");
  // Select Appropiate option based on selected task category
  const CategoryOptions = Array.from(document.querySelectorAll("#select-category-select-box .option"));
  if (AppObj.CurrentWindow.includes("UserCategory-")) {
    CategoryOptions.forEach((Option) => {
      if (Option.dataset.value === AppObj.SelectedUserCategory) {
        CategoriesTasksSelectBox.dataset.value = Option.dataset.value;
        SelectBoxText.innerText = Option.innerText;
      }
    });
  }
}
function ReadNoteModal(Title, ID, Date, Text) {
  if (document.querySelector(".modal")) return;
  const ModalContainer = document.createElement("section");
  const NoteModalInfoContainer = document.createElement("section");
  const NoteModalTitleRow = document.createElement("div");
  const NoteModalTitle = document.createElement("span");
  const TitleLabel = document.createElement("label");
  const NoteModalIDRow = document.createElement("div");
  const NoteModalID = document.createElement("span");
  const IDLabel = document.createElement("label");
  const NoteModalDateRow = document.createElement("div");
  const NoteModalDate = document.createElement("span");
  const DateLabel = document.createElement("label");
  const NoteModalText = document.createElement("div");
  const EditNoteBtn = document.createElement("button");
  const DeleteNoteBtn = document.createElement("button");
  const CancelNoteEditBtn = document.createElement("button");
  const ApplyNoteEditBtn = document.createElement("button");
  const HideModalBtn = document.createElement("button");
  const HideModalIcon = document.createElement("img");
  // Attributes
  NoteModalDate.setAttribute("dir", "ltr");
  NoteModalText.setAttribute("dir", "auto");
  // Id and class
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal read-note-modal";
  HideModalBtn.className = "close-btn icon";

  NoteModalInfoContainer.className = "note-modal-info-container";
  NoteModalTitleRow.className = "info-container-row";
  NoteModalTitle.className = "note-modal-title";
  TitleLabel.className = "note-title-label";
  NoteModalIDRow.className = "info-container-row";
  NoteModalID.className = "note-modal-id";
  IDLabel.className = "note-id-label";
  NoteModalDateRow.className = "info-container-row";
  NoteModalDate.className = "note-modal-date";
  DateLabel.className = "note-date-label";
  NoteModalText.className = "note-modal-text";
  EditNoteBtn.className = "edit-note-btn green-btn text";
  DeleteNoteBtn.className = "delete-note-btn red-btn text";
  CancelNoteEditBtn.className = "cancel-note-edit-btn red-btn text";
  ApplyNoteEditBtn.className = "apply-note-edit-btn green-btn text";
  //InnerText
  NoteModalTitle.innerText = Title;
  NoteModalID.innerText = ID;
  if (UserSettings.Calendar === "Solar") {
    NoteModalDate.innerText = `${PlacePersianNumbers(NumericToSolar(Date))} T ${PlacePersianNumbers(NumericToTime(Date))}`;
  }
  if (UserSettings.Calendar === "Gregorian") {
    NoteModalDate.innerText = `${PlacePersianNumbers(NumericToGregorian(Date))} T ${PlacePersianNumbers(NumericToTime(Date))}`;
  }
  TitleLabel.innerText = `${Strings.Title[UserSettings.CurrentLang]} : `;
  IDLabel.innerText = `${Strings.ID[UserSettings.CurrentLang]} : `;
  DateLabel.innerText = `${Strings.DateOfCreation[UserSettings.CurrentLang]} : `;
  NoteModalText.innerHTML = Text;
  EditNoteBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  DeleteNoteBtn.innerText = Strings.Delete[UserSettings.CurrentLang];
  CancelNoteEditBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
  ApplyNoteEditBtn.innerText = Strings.Apply[UserSettings.CurrentLang];
  HideModalIcon.src = "../Icons/close-large-line.svg";
  // Append
  NoteModalTitleRow.append(TitleLabel, NoteModalTitle);
  NoteModalIDRow.append(IDLabel, NoteModalID);
  NoteModalDateRow.append(DateLabel, NoteModalDate);
  NoteModalInfoContainer.append(NoteModalTitleRow, NoteModalIDRow, NoteModalDateRow);
  HideModalBtn.append(HideModalIcon);
  ModalContainer.append(HideModalBtn, NoteModalInfoContainer, NoteModalText, EditNoteBtn, DeleteNoteBtn, ApplyNoteEditBtn, CancelNoteEditBtn);
  HideModalBtn.addEventListener("click", HideModal);
  DeleteNoteBtn.addEventListener("click", () => {
    DeleteNote(ID);
  });
  EditNoteBtn.addEventListener("click", () => {
    ActivateReadNoteModalEditMode(ID);
  });
  ApplyNoteEditBtn.addEventListener("click", () => {
    ApplyEdit(ID);
  });
  CancelNoteEditBtn.addEventListener("click", () => {
    CancelEdit(ID);
  });
  document.body.append(ModalContainer);
  InitTinyMce(NoteModalText, true);
  AddDragEventListenersToModal();
}
function EditModal(ID) {
  if (document.querySelector(".modal")) return;
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
  ModalInputsContainer.className = "modal-inputs-container";
  // Edit Title Section
  const EditTitleSection = document.createElement("section");
  const TitleInputBadge = document.createElement("span");
  const EditTitleInput = document.createElement("input");

  EditTitleSection.className = "edit-title-section";
  EditTitleInput.className = "edit-title-input modal-input";
  TitleInputBadge.className = "sticky-badge";

  TitleInputBadge.innerText = Strings.Title[UserSettings.CurrentLang];
  EditTitleInput.value = TaskTitle;
  EditTitleInput.maxLength = "70";

  EditTitleInput.addEventListener("input", () => CharacterLimit(".edit-title-input"));

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
  EditDateSection.className = "edit-date-section";
  if (UserSettings.Calendar === "Solar") {
    EditDateInput.value = PlacePersianNumbers(NumericToSolar(AllTasksArray[TaskIndex].NumericDate));
  }
  if (UserSettings.Calendar === "Gregorian") {
    EditDateInput.value = PlacePersianNumbers(NumericToGregorian(AllTasksArray[TaskIndex].NumericDate));
  }
  DateInputBadge.className = "sticky-badge";
  EditDateInput.className = "edit-date-input modal-input";
  DateInputBadge.innerText = Strings.Date[UserSettings.CurrentLang];
  EditDateInput.setAttribute("readonly", "");
  EditDateInput.setAttribute("data-DateObject", "");
  EditDateInput.addEventListener("click", () => {
    SetupTargetInput(".edit-date-input");
    ToggleDatePicker(".edit-date-input", NumericDate);
  });
  // EditDateInput.value = TaskDate;
  ModalInputsContainer.append(EditDateSection);
  EditDateSection.append(DateInputBadge, EditDateInput);
  // Category Selext box
  let CategorySelectBox = ReturnCategorizeTaskSection(UserCategory);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.className = "confirm-btn green-btn";
  ConfirmBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    AllTasksArray[TaskIndex].Title = EditTitleInput.value;
    AllTasksArray[TaskIndex].DisplayDate = EditDateInput.value;
    AllTasksArray[TaskIndex].DisplayTime = `${DateObject.Hour.toString().padStart(2, "0")} : ${DateObject.Minute.toString().padStart(2, "0")}`;
    AllTasksArray[TaskIndex].NumericDate = ExtractDate("Numeric");
    let NewUserCategory = CategorySelectBox.childNodes[0].dataset.value;
    AllTasksArray[TaskIndex].UserCategory = NewUserCategory;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    HideModal();
    UpdateInbox();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.className = "cancel-btn red-btn";
  CancelBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";

  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, CategorySelectBox, ModalButtonContainer);
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
  CharacterLimit(".edit-title-input");
}
function NewTaskModal() {
  if (document.querySelector(".modal")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "new-task-modal";
  ModalContainer.className = "modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.className = "modal-inputs-container";
  // Task Title Section
  const TaskTitleSection = document.createElement("section");
  const TitleInputBadge = document.createElement("span");
  const TaskTitleInput = document.createElement("input");
  TaskTitleSection.className = "task-title-section";
  TitleInputBadge.className = "sticky-badge";
  TaskTitleInput.className = "modal-input task-title-input";
  TitleInputBadge.innerText = Strings.Title[UserSettings.CurrentLang];
  TaskTitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.CurrentLang];
  TaskTitleInput.maxLength = "70";
  TaskTitleInput.addEventListener("input", () => CharacterLimit(".task-title-input"));
  TaskTitleSection.append(TitleInputBadge, TaskTitleInput);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  TaskTitleSection.append(CharacterLimitTag);
  // Task Date Section
  const TaskDateSection = document.createElement("section");
  const DateInputBadge = document.createElement("span");
  const TaskDateInput = document.createElement("input");
  TaskDateSection.className = "task-date-section";
  DateInputBadge.className = "sticky-badge";
  TaskDateInput.className = "task-date-input modal-input";
  DateInputBadge.innerText = Strings.Date[UserSettings.CurrentLang];
  TaskDateInput.placeholder = Strings.TaskDateInputPlaceHolder[UserSettings.CurrentLang];
  TaskDateInput.setAttribute("readonly", "");
  TaskDateInput.setAttribute("data-DateObject", "");
  TaskDateInput.addEventListener("click", () => {
    SetupTargetInput(".task-date-input");
    ToggleDatePicker(".task-date-input");
  });
  TaskDateSection.append(DateInputBadge, TaskDateInput);
  // Category Selext box
  const CategorySelectBox = ReturnCategorizeTaskSection();
  // Options Sextion
  const TaskOptionsSection = document.createElement("section");
  const OnlyShowInCategoryRow = document.createElement("div");
  const RoutinTaskWithoutTime = document.createElement("div");
  const RoutinTaskWithTime = document.createElement("div");
  //
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.className = "confirm-btn green-btn";
  ConfirmBtn.innerText = Strings.NewTaskModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (!TaskTitleInput.value.trim()) {
      DisplayMessage("Error", MessageBoxStrings.EmptyTaskTitle[UserSettings.CurrentLang]);
      return;
    }
    DisplayMessage("Success", MessageBoxStrings.TaskSuccess[UserSettings.CurrentLang]);
    AddTask();
    HideModal();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.className = "cancel-btn red-btn";
  CancelBtn.innerText = Strings.NewTaskModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  //
  ModalInputsContainer.append(TaskTitleSection, TaskDateSection, CategorySelectBox);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, ModalButtonContainer);
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
  CharacterLimit(".task-title-input");
}
function NewCategoryModal() {
  if (document.querySelector(".modal")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.className = "modal-container";
  ModalContainer.className = "modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.className = "modal-inputs-container";
  // Task Title Section
  const CategoryTitleSection = document.createElement("section");
  const CategoryNameInputBadge = document.createElement("span");
  const CategoryTitleInput = document.createElement("input");
  CategoryTitleSection.className = "category-title-section";
  CategoryNameInputBadge.className = "sticky-badge";
  CategoryTitleInput.className = "category-title-input modal-input";
  CategoryNameInputBadge.innerText = Strings.NewCategoryInputBadge[UserSettings.CurrentLang];
  CategoryTitleInput.placeholder = Strings.NewCategoryTitleInputPlaceHolder[UserSettings.CurrentLang];
  CategoryTitleInput.maxLength = "32";
  CategoryTitleInput.addEventListener("input", () => {
    TempUserCategoryInfo.Name = CategoryTitleInput.value;
    CharacterLimit(".category-title-input");
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
  PickColorBadge.className = "modal-title";
  PickColorSection.className = "pick-color-section";
  ColorsContainer.className = "colors-container";
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
  ColorSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
  ColorSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";
  ColorSlideLeftIcon.className = "icon";
  ColorSlideRightIcon.className = "icon";
  ColorSlideLeft.className = "slide-left-button color-slide-left-button";
  ColorSlideRight.className = "slide-right-button color-slide-right-button";
  ColorSlideLeft.style.top = "35px";
  ColorSlideRight.style.top = "35px";
  ColorSlideLeft.addEventListener("click", () => ScrollLeft(".colors-container"));
  ColorSlideRight.addEventListener("click", () => ScrollRight(".colors-container"));
  ColorSlideLeft.append(ColorSlideLeftIcon);
  ColorSlideRight.append(ColorSlideRightIcon);
  PickColorSection.append(ColorSlideLeft, ColorSlideRight);
  // Pick Icon Section
  const PickIconSection = document.createElement("section");
  const IconsContainer = document.createElement("section");
  const PickIconBadge = document.createElement("span");
  // Set ids and class names
  PickIconSection.className = "pick-icon-section";
  IconsContainer.className = "icons-container";
  PickIconBadge.className = "modal-title";
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
  IconSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
  IconSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";
  IconSlideLeftIcon.className = "icon";
  IconSlideRightIcon.className = "icon";
  IconSlideLeft.className = "slide-left-button color-slide-left-button";
  IconSlideRight.className = "slide-right-button color-slide-right-button";
  IconSlideLeft.style.top = "42px";
  IconSlideRight.style.top = "42px";
  IconSlideLeft.addEventListener("click", () => ScrollLeft(".icons-container"));
  IconSlideRight.addEventListener("click", () => ScrollRight(".icons-container"));
  IconSlideLeft.append(IconSlideLeftIcon);
  IconSlideRight.append(IconSlideRightIcon);
  PickIconSection.append(IconSlideLeft, IconSlideRight);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.className = "confirm-btn green-btn";
  ConfirmBtn.innerText = Strings.NewCategoryModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (AddCategory()) HideModal("modal-container");
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.className = "cancel-btn red-btn";
  CancelBtn.innerText = Strings.NewCategoryModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", function () {
    HideModal("modal-container");
  });
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";

  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
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
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
  CharacterLimit(".category-title-input");
}
function EditCategoryModal(ID) {
  if (document.querySelector(".modal")) return;
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
  ModalInputsContainer.className = "modal-inputs-container";
  // Task Title Section
  const CategoryTitleSection = document.createElement("section");
  const CategoryNameInputBadge = document.createElement("span");
  const CategoryTitleInput = document.createElement("input");
  CategoryTitleSection.className = "category-title-section";
  CategoryNameInputBadge.className = "sticky-badge";
  CategoryTitleInput.className = "modal-input category-title-input";
  CategoryNameInputBadge.innerText = Strings.NewCategoryInputBadge[UserSettings.CurrentLang];
  CategoryTitleInput.placeholder = Strings.NewCategoryTitleInputPlaceHolder[UserSettings.CurrentLang];
  CategoryTitleInput.maxLength = "32";
  CategoryTitleInput.addEventListener("input", () => {
    TempUserCategoryInfo.Name = CategoryTitleInput.value;
    CharacterLimit(".category-title-input");
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
  PickColorBadge.className = "modal-title";
  PickColorSection.className = "pick-color-section";
  ColorsContainer.className = "colors-container";
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
  ColorSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
  ColorSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";
  ColorSlideLeftIcon.className = "icon";
  ColorSlideRightIcon.className = "icon";
  ColorSlideLeft.className = "color-slide-left-button slide-left-button";
  ColorSlideRight.className = "color-slide-right-button slide-right-button";
  ColorSlideLeft.style.top = "35px";
  ColorSlideRight.style.top = "35px";
  ColorSlideLeft.addEventListener("click", () => ScrollLeft(".colors-container"));
  ColorSlideRight.addEventListener("click", () => ScrollRight(".colors-container"));
  ColorSlideLeft.append(ColorSlideLeftIcon);
  ColorSlideRight.append(ColorSlideRightIcon);
  PickColorSection.append(PickColorBadge, ColorSlideLeft, ColorsContainer, ColorSlideRight);
  // Pick Icon Section
  const PickIconSection = document.createElement("section");
  const IconsContainer = document.createElement("section");
  const PickIconBadge = document.createElement("span");
  // Set ids and class names
  PickIconSection.className = "pick-icon-section";
  IconsContainer.className = "icons-container";
  PickIconBadge.className = "modal-title";
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
  IconSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
  IconSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";
  IconSlideLeftIcon.className = "icon";
  IconSlideRightIcon.className = "icon";
  IconSlideLeft.className = "color-slide-left-button slide-left-button";
  IconSlideRight.className = "color-slide-right-button slide-right-button";
  IconSlideLeft.style.top = "42px";
  IconSlideRight.style.top = "42px";
  IconSlideLeft.addEventListener("click", () => ScrollLeft(".icons-container"));
  IconSlideRight.addEventListener("click", () => ScrollRight(".icons-container"));
  PickIconSection.append();
  IconSlideLeft.append(IconSlideLeftIcon);
  IconSlideRight.append(IconSlideRightIcon);
  PickIconSection.append(IconsContainer, PickIconBadge, IconSlideLeft, IconSlideRight);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.className = "confirm-btn green-btn";
  ConfirmBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (!TempUserCategoryInfo.Name || !TempUserCategoryInfo.Color || !TempUserCategoryInfo.Icon) return;
    UserCategoriesArray[Index].Color = TempUserCategoryInfo.Color;
    UserCategoriesArray[Index].Name = TempUserCategoryInfo.Name;
    UserCategoriesArray[Index].Icon = TempUserCategoryInfo.Icon;
    localStorage.setItem("UserCategories", JSON.stringify(UserCategoriesArray));
    ResetTempUserCategoryInfo();
    UpdateInbox();
    DisplayUserCategories();
    HideModal();
  });
  const CancelBtn = document.createElement("button");
  CancelBtn.className = "cancel-btn red-btn";
  CancelBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";

  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  ModalButtonContainer.append(ConfirmBtn, CancelBtn);
  // Final
  ModalInputsContainer.append(CategoryTitleSection);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, PickColorSection, ModalButtonContainer, PickIconSection);
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
  CharacterLimit(".category-title-input");
}
function BackUpModal() {
  if (document.querySelector(".modal")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  //
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";

  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  //
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-buttons-container";
  //
  const InsertBackUpFile = document.createElement("button");
  const InsertBackUpFileIcon = document.createElement("img");
  const InsertBackUpFileText = document.createElement("span");
  InsertBackUpFileIcon.className = "modal-button-icon icon";
  InsertBackUpFileText.className = "modal-button-text text";
  InsertBackUpFile.className = "modal-button insert-backup-file-button";
  InsertBackUpFileText.innerText = Strings.InsertBackUpFile[UserSettings.CurrentLang];
  InsertBackUpFileIcon.src = "";
  InsertBackUpFile.addEventListener("click", () => {});
  InsertBackUpFile.append(InsertBackUpFileIcon, InsertBackUpFileText);
  //
  const InsertBackUpText = document.createElement("button");
  const InsertBackUpTextIcon = document.createElement("img");
  const InsertBackUpTextText = document.createElement("span");
  InsertBackUpTextIcon.className = "modal-button-icon icon";
  InsertBackUpTextText.className = "modal-button-text text";
  InsertBackUpText.className = "modal-button insert-backup-text-button";
  InsertBackUpTextText.innerText = Strings.InsertBackUpText[UserSettings.CurrentLang];
  InsertBackUpTextIcon.src = "";
  InsertBackUpText.addEventListener("click", () => {
    const ReturnButton = document.createElement("button");
    ReturnButton.className = "return-button red-btn text";
    const ReturnButtonIcon = document.createElement("img");
    ReturnButtonIcon.className = "return-button-icon icon";
    const ReturnButtonText = Strings.Return[UserSettings.CurrentLang];
    ReturnButton.addEventListener("click", ReturnFromModalSubPage);
    ReturnButton.append(ReturnButtonIcon, ReturnButtonText);
    //
    ModalButtonContainer.style.display = "none";
    const ModalSubPage = document.createElement("section");
    ModalSubPage.className = "modal-sub-page";
    const ModalTitle = document.createElement("span");
    ModalTitle.className = "modal-title text";
    ModalTitle.innerText = Strings.RestoreFromText[UserSettings.CurrentLang];
    const ModalDescription = document.createElement("p");
    ModalDescription.innerText = Strings.RestoreFromTextDescription[UserSettings.CurrentLang];
    ModalDescription.className = "modal-description text";
    //
    const ModalTextArea = document.createElement("textarea");
    ModalTextArea.className = "modal-text-area";
    ModalTextArea.placeholder = Strings.InsertBackUpTextPlaceHolder[UserSettings.CurrentLang];
    //
    const RestoreButton = document.createElement("button");
    RestoreButton.className = "restore-button green-btn text";
    RestoreButton.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
    RestoreButton.addEventListener("click", () => RestoreFromText(ModalTextArea.value));
    ModalSubPage.append(ModalTitle, ModalDescription, ModalTextArea, RestoreButton, ReturnButton);
    ModalContainer.append(ModalSubPage);
  });
  InsertBackUpText.append(InsertBackUpTextIcon, InsertBackUpTextText);
  //
  const GenerateBackUpFile = document.createElement("button");
  const GenerateBackUpFileIcon = document.createElement("img");
  const GenerateBackUpFileText = document.createElement("span");
  GenerateBackUpFileIcon.className = "modal-button-icon icon";
  GenerateBackUpFileText.className = "modal-button-text text";
  GenerateBackUpFile.className = "modal-button generate-backup-file-button";
  GenerateBackUpFileText.innerText = Strings.GenerateBackUpFile[UserSettings.CurrentLang];
  GenerateBackUpFileIcon.src = "";
  GenerateBackUpFile.addEventListener("click", () => {});
  GenerateBackUpFile.append(GenerateBackUpFileIcon, GenerateBackUpFileText);
  //
  const GenerateBackUpText = document.createElement("button");
  const GenerateBackUpTextIcon = document.createElement("img");
  const GenerateBackUpTextText = document.createElement("span");
  GenerateBackUpTextIcon.className = "modal-button-icon icon";
  GenerateBackUpTextText.className = "modal-button-text text";
  GenerateBackUpText.className = "modal-button generate-backup-file-button";
  GenerateBackUpTextText.innerText = Strings.GenerateBackUpText[UserSettings.CurrentLang];
  GenerateBackUpTextIcon.src = "";
  GenerateBackUpText.addEventListener("click", () => {
    const ReturnButton = document.createElement("button");
    ReturnButton.className = "return-button red-btn text";
    const ReturnButtonIcon = document.createElement("img");
    ReturnButtonIcon.className = "return-button-icon icon";
    const ReturnButtonText = Strings.Return[UserSettings.CurrentLang];
    ReturnButton.addEventListener("click", ReturnFromModalSubPage);
    ReturnButton.append(ReturnButtonIcon, ReturnButtonText);
    //
    ModalButtonContainer.style.display = "none";
    const ModalSubPage = document.createElement("section");
    ModalSubPage.className = "modal-sub-page";
    const ModalTitle = document.createElement("span");
    ModalTitle.className = "modal-title text";
    ModalTitle.innerText = Strings.BackUpText[UserSettings.CurrentLang];
    const ModalDescription = document.createElement("p");
    ModalDescription.innerText = Strings.BackUpTextDescription[UserSettings.CurrentLang];
    ModalDescription.className = "modal-description text";
    //
    const ModalTextArea = document.createElement("textarea");
    ModalTextArea.className = "modal-text-area";
    ModalTextArea.value = FetchLocalStorge();
    //
    const CopyButton = document.createElement("button");
    CopyButton.className = "copy-to-clipboard-button green-btn text";
    CopyButton.innerText = Strings.CopyButton[UserSettings.CurrentLang];
    CopyButton.addEventListener("click", () => {
      navigator.clipboard
        .writeText(FetchLocalStorge())
        .then(() => {
          DisplayMessage("Success", "Copied to clipboard successfully");
        })
        .catch((Error) => {
          DisplayMessage("Error", Error);
        });
    });
    ModalSubPage.append(ModalTitle, ModalDescription, ModalTextArea, CopyButton, ReturnButton);
    ModalContainer.append(ModalSubPage);
  });
  GenerateBackUpText.append(GenerateBackUpTextIcon, GenerateBackUpTextText);
  //
  ModalButtonContainer.append(HideModalBtn, GenerateBackUpFile, GenerateBackUpText, InsertBackUpFile, InsertBackUpText);
  ModalContainer.append(HideModalBtn, ModalButtonContainer);
  // Final
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
}
function ReturnFromModalSubPage() {
  let SubPage = document.querySelector(".modal-sub-page");
  SubPage.remove();
  let ModalButtonContainer = document.querySelector(".modal-buttons-container");
  ModalButtonContainer.style.display = "flex";
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
  ModalContainer.className = "modal";
  // Hide Button
  const HideModalBtn = document.createElement("button");
  HideModalBtn.className = "close-btn icon";

  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = "../Icons/close-large-line.svg";
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  // Pop up text
  const ModalText = document.createElement("p");
  ModalText.className = "modal-text";
  // Move to trash
  const MoveToTrashContainer = document.createElement("section");
  const MoveToTrashText = document.createElement("p");
  const CheckBoxContainer = document.createElement("label");
  const MoveToTrashCheckBox = document.createElement("input");
  const CheckMark = document.createElement("div");
  MoveToTrashContainer.className = "move-to-trash-container";
  MoveToTrashText.className = "move-to-trash-text text";
  MoveToTrashCheckBox.className = "move-to-trash-checkbox";
  CheckBoxContainer.className = "checkbox-container";
  MoveToTrashCheckBox.className = "checkbox";
  CheckMark.className = "checkmark";
  MoveToTrashText.innerText = Strings.MoveToTrashText[UserSettings.CurrentLang];
  MoveToTrashCheckBox.type = "checkbox";
  MoveToTrashCheckBox.checked = true;
  // Confirm/Cancel Buttons
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.className = "modal-button-container";
  // Confirm
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.className = "confirm-btn red-btn";
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
  CancelBtn.className = "cancel-btn green-btn";
  CancelBtn.innerText = Strings.DeleteModalCancelButton[UserSettings.CurrentLang];
  CancelBtn.addEventListener("click", HideModal);
  // Final
  CheckBoxContainer.append(MoveToTrashCheckBox, CheckMark);
  MoveToTrashContainer.append(CheckBoxContainer, MoveToTrashText);
  ModalButtonContainer.append(CancelBtn, ConfirmBtn);
  ModalContainer.append(HideModalBtn, ModalText, ModalButtonContainer);
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
  switch (Type) {
    case "Normal":
    case "Completed":
    case "Failed":
      ModalText.innerText = Strings.DeleteText[UserSettings.CurrentLang];
      ModalContainer.append(MoveToTrashContainer);
      break;
    case "Trashed":
      ModalText.innerText = Strings.DeleteTrashText[UserSettings.CurrentLang];
      break;
    case "DeleteCategory":
      ModalText.innerText = Strings.DeleteCategoryText[UserSettings.CurrentLang];
      break;
  }
}
function HideModal() {
  let Modal = document.querySelector(".modal");
  if (Modal) Modal.remove();
}
function CharacterLimit(Selector) {
  const CharacterLimitTag = document.querySelector(".character-limit");
  let Input = document.querySelector(Selector);
  CharacterLimitTag.innerText = `${PlacePersianNumbers(Input.value.length)}/${PlacePersianNumbers(Input.maxLength)}`;
}
function AddDragEventListenersToModal() {
  const Modal = document.querySelector(".modal");
  Modal.addEventListener("mousedown", (Event) => {
    if (!Event.target.className.includes("modal")) return;
    AppObj.DragModalMode = true;
  });
  document.addEventListener("mouseup", (Event) => {
    AppObj.DragModalMode = false;
  });
}
document.addEventListener("mousemove", (Event) => {
  if (!AppObj.DragModalMode) return;
  const Modal = document.querySelector(".modal");
  Modal.style.top = `${Event.clientY}px`;
  Modal.style.left = `${Event.clientX}px`;
});
