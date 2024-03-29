let DragModalMode = false;
function AddNoteModal() {
  if (DoesElementExist("modal-container")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal add-note-modal";
  const ModalInputsContainer = document.createElement("section");
  ModalInputsContainer.id = "modal-inputs-container";
  // Task Title Section
  const TitleSection = document.createElement("section");
  const TitleBadge = document.createElement("span");
  const TitleInput = document.createElement("input");
  TitleSection.id = "task-title-section";
  TitleBadge.className = "badge-modified";
  TitleInput.id = "task-title-input";
  TitleInput.className = "task-input";
  TitleBadge.innerText = Strings.NoteTitleInputBadge[UserSettings.CurrentLang];
  TitleInput.placeholder = Strings.NoteTitleInputPlaceHolder[UserSettings.CurrentLang];
  TitleInput.maxLength = "30";
  TitleInput.addEventListener("input", () => CharacterLimit("task-title-input"));
  TitleSection.append(TitleBadge, TitleInput);
  // Note text area
  const NoteSection = document.createElement("section");
  const NoteTextArea = document.createElement("textarea");
  NoteSection.id = "note-section";
  NoteTextArea.id = "note-text-area";
  NoteTextArea.placeholder = Strings.NoteTextArea[UserSettings.CurrentLang];
  const NoteBadge = document.createElement("span");
  NoteBadge.className = "badge-modified";
  NoteBadge.innerText = Strings.NoteBadge[UserSettings.CurrentLang];
  NoteSection.append(NoteTextArea, NoteBadge);
  // Character Limit section
  const CharacterLimitTag = document.createElement("section");
  CharacterLimitTag.className = "character-limit";
  TitleSection.append(CharacterLimitTag);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "green-btn";
  ConfirmBtn.innerText = Strings.NewTaskModalConfirmButton[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    if (!NoteTextArea.value) {
      NoteTextArea.style.border = "1px solid red";
      return;
    }
    NewNote(TitleInput.value, NoteTextArea.value);
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
  ModalInputsContainer.append(TitleSection, NoteSection);
  ModalContainer.append(HideModalBtn, ModalInputsContainer, ModalButtonContainer);
  document.body.append(ModalContainer);
  AlignModalAtCenter();
  AddDragEventListenersToModal();
  CharacterLimit("task-title-input");
  // Select Appropiate option based on selected task category
  const CategoryOptions = Array.from(document.querySelectorAll("#select-category-select-box .option"));
  if (CurrentWindow.includes("UserCategory-")) {
    CategoryOptions.forEach((Option) => {
      if (Option.dataset.value === SelectedUserCategory) {
        CategoriesTasksSelectBox.dataset.value = Option.dataset.value;
        SelectBoxText.innerText = Option.innerText;
      }
    });
  }
}
function ReadNoteModal(Title, ID, Date, Text) {
  if (DoesElementExist("modal-container")) return;
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
  const NoteModalText = document.createElement("p");
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
  HideModalBtn.id = "close-btn";
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
  EditNoteBtn.className = "edit-note-btn green-btn";
  DeleteNoteBtn.className = "delete-note-btn red-btn";
  CancelNoteEditBtn.className = "cancel-note-edit-btn red-btn";
  ApplyNoteEditBtn.className = "apply-note-edit-btn green-btn";
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
  NoteModalText.innerText = Text;
  EditNoteBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  DeleteNoteBtn.innerText = Strings.Delete[UserSettings.CurrentLang];
  CancelNoteEditBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
  ApplyNoteEditBtn.innerText = Strings.Apply[UserSettings.CurrentLang];
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
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
  AlignModalAtCenter();
  AddDragEventListenersToModal();
}
function EditModal(ID) {
  if (DoesElementExist("modal-container")) return;
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
  EditTitleInput.addEventListener("input", () => CharacterLimit("edit-title-input"));
  TitleInputBadge.innerText = Strings.Title[UserSettings.CurrentLang];
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
  if (UserSettings.Calendar === "Solar") {
    EditDateInput.value = PlacePersianNumbers(NumericToSolar(AllTasksArray[TaskIndex].NumericDate));
  }
  if (UserSettings.Calendar === "Gregorian") {
    EditDateInput.value = PlacePersianNumbers(NumericToGregorian(AllTasksArray[TaskIndex].NumericDate));
  }

  DateInputBadge.className = "badge-modified";
  EditDateInput.id = "edit-date-input";
  EditDateInput.className = "task-input";
  EditDateInput.className = "task-input";
  EditDateInput.className = "task-input";
  DateInputBadge.innerText = Strings.Date[UserSettings.CurrentLang];
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
  // class and id
  CategoriesTasksSection.id = "select-category-section";
  CategoriesTasksSelectBox.id = "select-category-select-box";
  SelectBoxIconContainer.id = "select-box-icon-container";
  SelectBoxIcon.id = "select-box-icon";
  SelectBoxText.className = "select-box-text";
  CategoryNoneOption.className = "option";
  SelectBoxOptionsContainer.className = "options-container";
  CategoriesTasksSelectBox.className = "select-box";
  SelectBoxIcon.src = IconsSrc.DownArrowIcon[UserSettings.Theme];
  CategoriesTasksSectionBadge.className = "badge-modified";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  // Append
  SelectBoxIconContainer.append(SelectBoxIcon);
  CategoriesTasksSelectBox.append(SelectBoxOptionsContainer, SelectBoxText);
  SelectBoxOptionsContainer.append(CategoryNoneOption);
  //
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
  });
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
  CategoriesTasksSection.append(CategoriesTasksSelectBox, CategoriesTasksSectionBadge, SelectBoxIconContainer);
  // Button Container and Confirm/Cancel Button
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-button-container";
  const ConfirmBtn = document.createElement("button");
  ConfirmBtn.id = "confirm-btn";
  ConfirmBtn.className = "green-btn";
  ConfirmBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
  ConfirmBtn.addEventListener("click", function () {
    AllTasksArray[TaskIndex].Title = EditTitleInput.value;
    AllTasksArray[TaskIndex].DisplayDate = EditDateInput.value;
    AllTasksArray[TaskIndex].DisplayTime = `${DateObject.Hour.toString().padStart(2, "0")} : ${DateObject.Minute.toString().padStart(2, "0")}`;
    AllTasksArray[TaskIndex].NumericDate = ExtractDate("Numeric");
    let NewUserCategory = CategoriesTasksSelectBox.dataset.value;
    AllTasksArray[TaskIndex].UserCategory = NewUserCategory;
    localStorage.setItem("AllTasks", JSON.stringify(AllTasksArray));
    HideModal();
    UpdateInbox();
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
  //
  ModalContainer.append(HideModalBtn, ModalInputsContainer, CategoriesTasksSection, ModalButtonContainer);
  document.body.append(ModalContainer);
  AlignModalAtCenter();
  AddDragEventListenersToModal();
  CharacterLimit("edit-title-input");
  // Select Appropiate option based on selected task category
  const CategoryOptions = Array.from(document.querySelectorAll("#select-category-select-box .option"));
  CategoryOptions.forEach((Option) => {
    if (Option.dataset.value === UserCategory) {
      CategoriesTasksSelectBox.dataset.value = Option.dataset.value;
      SelectBoxText.innerText = Option.innerText;
    }
  });
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
  TitleInputBadge.innerText = Strings.Title[UserSettings.CurrentLang];
  TaskTitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.CurrentLang];
  TaskTitleInput.maxLength = "70";
  TaskTitleInput.addEventListener("input", () => CharacterLimit("task-title-input"));
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
  DateInputBadge.innerText = Strings.Date[UserSettings.CurrentLang];
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
  // class and id
  CategoriesTasksSection.id = "select-category-section";
  CategoriesTasksSelectBox.id = "select-category-select-box";
  SelectBoxIconContainer.id = "select-box-icon-container";
  SelectBoxIcon.id = "select-box-icon";
  SelectBoxText.className = "select-box-text";
  CategoryNoneOption.className = "option";
  SelectBoxOptionsContainer.className = "options-container";
  CategoriesTasksSelectBox.className = "select-box";
  SelectBoxIcon.src = IconsSrc.DownArrowIcon[UserSettings.Theme];
  CategoriesTasksSectionBadge.className = "badge-modified";
  CategoriesTasksSectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];
  // Append
  SelectBoxIconContainer.append(SelectBoxIcon);
  CategoriesTasksSelectBox.append(SelectBoxOptionsContainer, SelectBoxText);
  SelectBoxOptionsContainer.append(CategoryNoneOption);
  //
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
  });
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
  CategoriesTasksSection.append(CategoriesTasksSelectBox, CategoriesTasksSectionBadge, SelectBoxIconContainer);
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
  document.body.append(ModalContainer);
  AlignModalAtCenter();
  AddDragEventListenersToModal();
  CharacterLimit("task-title-input");
  // Select Appropiate option based on selected task category
  const CategoryOptions = Array.from(document.querySelectorAll("#select-category-select-box .option"));
  if (CurrentWindow.includes("UserCategory-")) {
    CategoryOptions.forEach((Option) => {
      if (Option.dataset.value === SelectedUserCategory) {
        CategoriesTasksSelectBox.dataset.value = Option.dataset.value;
        SelectBoxText.innerText = Option.innerText;
      }
    });
  }
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
  ColorSlideLeftIcon.src = IconsSrc.LeftArrowIcon[UserSettings.Theme];
  ColorSlideRightIcon.src = IconsSrc.RightArrowIcon[UserSettings.Theme];
  ColorSlideLeft.className = "slide-left-button";
  ColorSlideRight.className = "slide-right-button";
  ColorSlideLeft.id = "color-slide-left-button";
  ColorSlideRight.id = "color-slide-right-button";
  ColorSlideLeft.style.top = "35px";
  ColorSlideRight.style.top = "35px";
  ColorSlideLeft.addEventListener("click", () => ScrollLeft("colors-container"));
  ColorSlideRight.addEventListener("click", () => ScrollRight("colors-container"));
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
  IconSlideLeftIcon.src = IconsSrc.LeftArrowIcon[UserSettings.Theme];
  IconSlideRightIcon.src = IconsSrc.RightArrowIcon[UserSettings.Theme];
  IconSlideLeft.className = "slide-left-button";
  IconSlideRight.className = "slide-right-button";
  IconSlideLeft.id = "color-slide-left-button";
  IconSlideRight.id = "color-slide-right-button";
  IconSlideLeft.style.top = "42px";
  IconSlideRight.style.top = "42px";
  IconSlideLeft.addEventListener("click", () => ScrollLeft("icons-container"));
  IconSlideRight.addEventListener("click", () => ScrollRight("icons-container"));
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
  document.body.append(ModalContainer);
  AddDragEventListenersToModal();
  AlignModalAtCenter();
  CharacterLimit("category-title-input");
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
  ColorSlideLeftIcon.src = IconsSrc.LeftArrowIcon[UserSettings.Theme];
  ColorSlideRightIcon.src = IconsSrc.RightArrowIcon[UserSettings.Theme];
  ColorSlideLeft.className = "slide-left-button";
  ColorSlideRight.className = "slide-right-button";
  ColorSlideLeft.id = "color-slide-left-button";
  ColorSlideRight.id = "color-slide-right-button";
  ColorSlideLeft.style.top = "35px";
  ColorSlideRight.style.top = "35px";
  ColorSlideLeft.addEventListener("click", () => ScrollLeft("colors-container"));
  ColorSlideRight.addEventListener("click", () => ScrollRight("colors-container"));
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
  IconSlideLeftIcon.src = IconsSrc.LeftArrowIcon[UserSettings.Theme];
  IconSlideRightIcon.src = IconsSrc.RightArrowIcon[UserSettings.Theme];
  IconSlideLeft.className = "slide-left-button";
  IconSlideRight.className = "slide-right-button";
  IconSlideLeft.id = "color-slide-left-button";
  IconSlideRight.id = "color-slide-right-button";
  IconSlideLeft.style.top = "42px";
  IconSlideRight.style.top = "42px";
  IconSlideLeft.addEventListener("click", () => ScrollLeft("icons-container"));
  IconSlideRight.addEventListener("click", () => ScrollRight("icons-container"));
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
  document.body.append(ModalContainer);
  AlignModalAtCenter();
  AddDragEventListenersToModal();
  CharacterLimit("category-title-input");
}
function BackUpModal() {
  if (DoesElementExist("modal-container")) return;
  const ModalContainer = document.createElement("section");
  ModalContainer.id = "modal-container";
  ModalContainer.className = "modal";
  //
  const HideModalBtn = document.createElement("button");
  HideModalBtn.id = "close-btn";
  const HideModalIcon = document.createElement("img");
  HideModalIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideModalBtn.appendChild(HideModalIcon);
  HideModalBtn.addEventListener("click", HideModal);
  //
  const ModalButtonContainer = document.createElement("section");
  ModalButtonContainer.id = "modal-buttons-container";
  //
  const InsertBackUpFile = document.createElement("button");
  const InsertBackUpFileIcon = document.createElement("img");
  const InsertBackUpFileText = document.createElement("span");
  InsertBackUpFileIcon.className = "modal-button-icon";
  InsertBackUpFileText.className = "modal-button-text";
  InsertBackUpFile.className = "modal-button";
  InsertBackUpFileText.innerText = Strings.InsertBackUpFile[UserSettings.CurrentLang];
  InsertBackUpFileIcon.src = "";
  InsertBackUpFile.id = "insert-backup-file-button";
  InsertBackUpFile.addEventListener("click", () => {});
  InsertBackUpFile.append(InsertBackUpFileIcon, InsertBackUpFileText);
  //
  const InsertBackUpText = document.createElement("button");
  const InsertBackUpTextIcon = document.createElement("img");
  const InsertBackUpTextText = document.createElement("span");
  InsertBackUpTextIcon.className = "modal-button-icon";
  InsertBackUpTextText.className = "modal-button-text";
  InsertBackUpText.className = "modal-button";
  InsertBackUpText.id = "insert-backup-text-button";
  InsertBackUpTextText.innerText = Strings.InsertBackUpText[UserSettings.CurrentLang];
  InsertBackUpTextIcon.src = "";
  InsertBackUpText.addEventListener("click", () => {
    const ReturnButton = document.createElement("button");
    ReturnButton.id = "return-button";
    ReturnButton.className = "red-btn";
    const ReturnButtonIcon = document.createElement("img");
    ReturnButtonIcon.id = "return-button-icon";
    const ReturnButtonText = Strings.Return[UserSettings.CurrentLang];
    ReturnButton.addEventListener("click", ReturnFromModalSubPage);
    ReturnButton.append(ReturnButtonIcon, ReturnButtonText);
    //
    ModalButtonContainer.style.display = "none";
    const ModalSubPage = document.createElement("section");
    ModalSubPage.id = "modal-sub-page";
    const ModalTitle = document.createElement("span");
    ModalTitle.className = "modal-title";
    ModalTitle.innerText = Strings.RestoreFromText[UserSettings.CurrentLang];
    const ModalDescription = document.createElement("p");
    ModalDescription.innerText = Strings.RestoreFromTextDescription[UserSettings.CurrentLang];
    ModalDescription.className = "modal-description";
    //
    const ModalTextArea = document.createElement("textarea");
    ModalTextArea.className = "modal-text-area";
    ModalTextArea.placeholder = Strings.InsertBackUpTextPlaceHolder[UserSettings.CurrentLang];
    //
    const RestoreButton = document.createElement("button");
    RestoreButton.id = "restore-button";
    RestoreButton.className = "green-btn";
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
  GenerateBackUpFileIcon.className = "modal-button-icon";
  GenerateBackUpFileText.className = "modal-button-text";
  GenerateBackUpFile.className = "modal-button";
  GenerateBackUpFile.id = "generate-backup-file-button";
  GenerateBackUpFileText.innerText = Strings.GenerateBackUpFile[UserSettings.CurrentLang];
  GenerateBackUpFileIcon.src = "";
  GenerateBackUpFile.addEventListener("click", () => {});
  GenerateBackUpFile.append(GenerateBackUpFileIcon, GenerateBackUpFileText);
  //
  const GenerateBackUpText = document.createElement("button");
  const GenerateBackUpTextIcon = document.createElement("img");
  const GenerateBackUpTextText = document.createElement("span");
  GenerateBackUpTextIcon.className = "modal-button-icon";
  GenerateBackUpTextText.className = "modal-button-text";
  GenerateBackUpText.className = "modal-button";
  GenerateBackUpText.id = "generate-backup-file-button";
  GenerateBackUpTextText.innerText = Strings.GenerateBackUpText[UserSettings.CurrentLang];
  GenerateBackUpTextIcon.src = "";
  GenerateBackUpText.addEventListener("click", () => {
    const ReturnButton = document.createElement("button");
    ReturnButton.id = "return-button";
    ReturnButton.className = "red-btn";
    const ReturnButtonIcon = document.createElement("img");
    ReturnButtonIcon.id = "return-button-icon";
    const ReturnButtonText = Strings.Return[UserSettings.CurrentLang];
    ReturnButton.addEventListener("click", ReturnFromModalSubPage);
    ReturnButton.append(ReturnButtonIcon, ReturnButtonText);
    //
    ModalButtonContainer.style.display = "none";
    const ModalSubPage = document.createElement("section");
    ModalSubPage.id = "modal-sub-page";
    const ModalTitle = document.createElement("span");
    ModalTitle.className = "modal-title";
    ModalTitle.innerText = Strings.BackUpText[UserSettings.CurrentLang];
    const ModalDescription = document.createElement("p");
    ModalDescription.innerText = Strings.BackUpTextDescription[UserSettings.CurrentLang];
    ModalDescription.className = "modal-description";
    //
    const ModalTextArea = document.createElement("textarea");
    ModalTextArea.className = "modal-text-area";
    ModalTextArea.value = FetchLocalStorge();
    //
    const CopyButton = document.createElement("button");
    CopyButton.id = "copy-to-clipboard-button";
    CopyButton.className = "green-btn";
    CopyButton.innerText = Strings.CopyButton[UserSettings.CurrentLang];
    CopyButton.addEventListener("click", () => navigator.clipboard.writeText(FetchLocalStorge()));
    ModalSubPage.append(ModalTitle, ModalDescription, ModalTextArea, CopyButton, ReturnButton);
    ModalContainer.append(ModalSubPage);
  });
  GenerateBackUpText.append(GenerateBackUpTextIcon, GenerateBackUpTextText);
  //
  ModalButtonContainer.append(HideModalBtn, GenerateBackUpFile, GenerateBackUpText, InsertBackUpFile, InsertBackUpText);
  ModalContainer.append(HideModalBtn, ModalButtonContainer);
  // Final
  document.body.append(ModalContainer);
  AlignModalAtCenter();
  AddDragEventListenersToModal();
}
function ReturnFromModalSubPage() {
  let SubPage = document.getElementById("modal-sub-page");
  SubPage.remove();
  let ModalButtonContainer = document.getElementById("modal-buttons-container");
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
  document.body.append(ModalContainer);
  AlignModalAtCenter();
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
  let Modal = document.getElementById("modal-container");
  Modal.remove();
}
function CharacterLimit(ID) {
  const CharacterLimitTag = document.querySelector(".character-limit");
  let Input = document.getElementById(ID);
  CharacterLimitTag.innerText = `${PlacePersianNumbers(Input.value.length)}/${PlacePersianNumbers(Input.maxLength)}`;
}
function AlignModalAtCenter() {
  if (!DoesElementExist("modal-container")) return;
  const Modal = document.getElementById("modal-container");
  const ModalWidth = Modal.clientWidth;
  const ModalHeight = Modal.clientHeight;
  const WindowWidth = window.innerWidth;
  const WindowHeight = window.innerHeight;
  const CenterX = (WindowWidth - ModalWidth) / 2;
  const CenterY = (WindowHeight - ModalHeight) / 2.5;
  Modal.style.left = `${CenterX}px`;
  Modal.style.top = `${CenterY}px`;
}
function AddDragEventListenersToModal() {
  const Modal = document.querySelector(".modal");
  Modal.addEventListener("mousedown", (Event) => {
    if (Event.target.id !== "modal-container") return;
    DragModalMode = true;
  });
  document.addEventListener("mouseup", (Event) => {
    DragModalMode = false;
  });
}
document.addEventListener("mousemove", (Event) => {
  if (!DragModalMode) return;
  const Modal = document.querySelector(".modal");
  Modal.style.top = `${Event.clientY}px`;
  Modal.style.left = `${Event.clientX}px`;
});
