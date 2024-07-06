function ThemeTweakerModal() {
  if (document.querySelector(".theme-tweaker-modal")) return;
  // Reqs
  let UserThemes = { ...ThemeObj };
  let SelectedTheme = UserSettings.Theme;
  let ValidColorFormat =
    /^((rgb(a)?(\s*(\d{1,3}%?,\s*){2,3}\s*[01]?\.?\d+))|(#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}))|(hsl(a)?(\s*(360|(\d{1,2}|[01]\d{2}))\s*,\s*((100|(\d{1,2}|[01]\d{2}))\s*%)?\s*,\s*((100|(\d{1,2}|[01]\d{2}))\s*%)?\s*(,\s*[01]?\.?\d+)?)))$/;
  // Define
  const ThemeTweakerModal = document.createElement("section");
  const HideModalBtn = document.createElement("button");
  const HideModalIcon = document.createElement("img");
  const ThemeBar = document.createElement("div");
  const Options = document.createElement("section");
  const ButtonContainer = document.createElement("div");
  const ApplyButton = document.createElement("button");
  const DeleteThemeBtn = document.createElement("button");
  const DefualtPalletButton = document.createElement("button");
  // ID and class
  ThemeTweakerModal.className = "theme-tweaker-modal modal";
  HideModalBtn.className = "close-btn icon";
  ThemeBar.className = "theme-bar";
  Options.className = "theme-tweaker-options";
  ButtonContainer.className = "theme-tweaker-modal-btn-container";
  ApplyButton.className = "theme-tweaker-modal-btn apply-btn";
  DeleteThemeBtn.className = "theme-tweaker-modal-btn delete-btn";
  DefualtPalletButton.className = "theme-tweaker-modal-btn defualt-btn";
  // InnerText and srx
  ApplyButton.innerText = "Apply";
  DefualtPalletButton.innerText = "Defualt Pallet";
  DeleteThemeBtn.innerText = "Delete Theme";
  HideModalIcon.src = "../Icons/close-large-line.svg";
  // Theme bar and options
  const CreateThemeBar = () => {
    ThemeBar.innerHTML = "";
    AppObj.Themes.forEach((Theme) => {
      const ThemeBtn = document.createElement("button");
      ThemeBtn.innerText = Theme;
      ThemeBtn.className = "theme-bar-btn";
      ThemeBtn.style.order = `${AppObj.Themes.indexOf(Theme) + 1}`;
      ThemeBtn.id = `${Theme.toLowerCase()}-theme-btn`;
      ThemeBtn.addEventListener("click", () => {
        SelectedTheme = Theme;
        HighLightSelectedThemeBtn(ThemeBtn.id);
        CreateThemeModeOptions();
      });
      ThemeBar.append(ThemeBtn);
    });
    const NewThemeBtn = document.createElement("button");
    NewThemeBtn.innerText = "New Theme";
    NewThemeBtn.className = "new-theme-btn";
    NewThemeBtn.style.order = `${AppObj.Themes.length + 1}`;
    ThemeBar.append(NewThemeBtn);
    NewThemeBtn.addEventListener("click", CreateNewThemeForm);
  };
  const CreateThemeModeOptions = () => {
    Options.innerHTML = "";
    for (let i in ThemeObj) {
      const Row = document.createElement("div");
      const RowLabel = document.createElement("span");
      let BgColor = ThemeObj[i]?.Themes[SelectedTheme]?.BgColor;
      let Color = ThemeObj[i]?.Themes[SelectedTheme]?.Color;
      let BorderColor = ThemeObj[i]?.Themes[SelectedTheme]?.BorderColor;
      let Hover = ThemeObj[i]?.Themes[SelectedTheme]?.Hover?.BgColor;
      if (BgColor) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const BgColorPicker = document.createElement("input");
        const BgColorInput = document.createElement("input");

        Container.className = "theme-tweaker-inner-row-container";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        CssPropertyLabel.className = "css-property-label";
        BgColorPicker.className = "css-property-input";
        BgColorInput.className = "css-property-input";

        BgColorPicker.value = BgColor;
        BgColorInput.value = BgColor;
        CssPropertyLabel.innerText = "Bg Color";
        BgColorPicker.placeholder = "Bg Color";

        BgColorPicker.type = "color";
        BgColorInput.type = "text";

        BgColorPicker.addEventListener("input", () => {
          document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
            Element.style.backgroundColor = BgColorPicker.value;
          });
          UserThemes[i].Themes[SelectedTheme].BgColor = BgColorPicker.value;
          BgColorInput.value = BgColorPicker.value;
        });
        BgColorInput.addEventListener("input", () => {
          if (BgColorInput.value.match(ValidColorFormat)) {
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style.backgroundColor = BgColorInput.value;
            });
            UserThemes[i].Themes[SelectedTheme].BgColor = BgColorInput.value;
            BgColorPicker.value = BgColorInput.value;
          } else {
            DisplayMessage("Error", `Invalid Color Format At ${i}`);
          }
        });
        CssProperyInputsContainer.append(BgColorInput, BgColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (Color) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const ColorPicker = document.createElement("input");
        const ColorInput = document.createElement("input");

        Container.className = "theme-tweaker-inner-row-container";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        CssPropertyLabel.className = "css-property-label";
        ColorPicker.className = "css-property-input";
        ColorInput.className = "css-property-input";

        ColorPicker.value = Color;
        ColorInput.value = Color;
        CssPropertyLabel.innerText = "Color";
        ColorPicker.placeholder = "Color";

        ColorPicker.type = "color";
        ColorInput.type = "text";

        ColorPicker.addEventListener("input", () => {
          document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
            Element.style.color = ColorPicker.value;
          });
          UserThemes[i].Themes[SelectedTheme].Color = ColorPicker.value;
          ColorInput.value = ColorPicker.value;
        });
        ColorInput.addEventListener("input", () => {
          if (ColorInput.value.match(ValidColorFormat)) {
            UserThemes[i].Themes[SelectedTheme].Color = ColorInput.value;
            ColorPicker.value = ColorInput.value;
            let FilterForSvg = HexToFilter(ColorInput.value);
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              if (i === "Icons") {
                Element.style = FilterForSvg;
              } else {
                Element.style.color = ColorInput.value;
              }
            });
          } else {
            DisplayMessage("Error", `Invalid Color Format At ${i}`);
          }
        });
        CssProperyInputsContainer.append(ColorInput, ColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (BorderColor) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const BorderColorPicker = document.createElement("input");
        const BorderColorInput = document.createElement("input");

        Container.className = "theme-tweaker-inner-row-container";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        CssPropertyLabel.className = "css-property-label";
        BorderColorPicker.className = "css-property-input";
        BorderColorInput.className = "css-property-input";

        BorderColorPicker.value = BorderColor;
        BorderColorInput.value = BorderColor;
        CssPropertyLabel.innerText = "Border Color";
        BorderColorPicker.placeholder = "Border Color";

        BorderColorPicker.type = "color";
        BorderColorInput.type = "text";

        BorderColorPicker.addEventListener("input", () => {
          document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
            Element.style.borderColor = BorderColorPicker.value;
          });
          UserThemes[i].Themes[SelectedTheme].BorderColor = BorderColorPicker.value;
          BorderColorInput.value = BorderColorPicker.value;
        });
        BorderColorInput.addEventListener("input", () => {
          if (BorderColorInput.value.match(ValidColorFormat)) {
            UserThemes[i].Themes[SelectedTheme].BorderColor = BorderColorInput.value;
            BorderColorPicker.value = BorderColorInput.value;
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style.color = BorderColorInput.value;
            });
          } else {
            DisplayMessage("Error", `Invalid Color Format At ${i}`);
          }
        });
        CssProperyInputsContainer.append(BorderColorInput, BorderColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (Hover) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const HoverBgColorPicker = document.createElement("input");
        const HoverBgColorInput = document.createElement("input");

        Container.className = "theme-tweaker-inner-row-container";
        CssPropertyLabel.className = "css-property-label";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        HoverBgColorPicker.className = "css-property-input";
        HoverBgColorInput.className = "css-property-input";

        CssPropertyLabel.innerText = "Hover Bg Color";
        HoverBgColorPicker.value = Hover;
        HoverBgColorInput.value = Hover;
        HoverBgColorInput.placeholder = "Hover Bg Color";

        HoverBgColorPicker.type = "color";
        HoverBgColorInput.type = "text";

        HoverBgColorPicker.addEventListener("input", () => {
          UserThemes[i].Themes[SelectedTheme].Hover.BgColor = HoverBgColorPicker.value;
          HoverBgColorInput.value = HoverBgColorPicker.value;
        });
        HoverBgColorInput.addEventListener("input", () => {
          if (HoverBgColorInput.value.match(ValidColorFormat)) {
            UserThemes[i].Themes[SelectedTheme].Hover.BgColor = HoverBgColorInput.value;
            HoverBgColorPicker.value = HoverBgColorInput.value;
          } else {
            DisplayMessage("Error", `Invalid Color Format At ${i}`);
          }
        });
        CssProperyInputsContainer.append(HoverBgColorInput, HoverBgColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      Row.className = "theme-tweaker-modal-row";
      RowLabel.className = "theme-tweaker-modal-row-label";
      RowLabel.innerText = i;
      Row.append(RowLabel);
      Options.append(Row);
    }
  };
  const InsertNewTheme = (Name) => {
    for (let i in UserThemes) {
      UserThemes[i].Themes[Name] = UserThemes[i].Themes.Dark;
    }
    AppObj.Themes.push(Name);
    SelectedTheme = Name;
    ApplyChanges();
    CreateThemeBar();
    CreateThemeModeOptions();
    HighLightSelectedThemeBtn(`${SelectedTheme}-theme-btn`);
  };
  const ApplyChanges = () => {
    localStorage.setItem("UserThemes", JSON.stringify(UserThemes));
    localStorage.setItem("Themes", JSON.stringify(AppObj.Themes));
    DisplayMessage("Success", "Changes has been applied");
  };
  const DeleteTheme = (Theme) => {
    if (Theme === "Dark" || Theme === "Light") {
      DisplayMessage("Error", `${Theme} is a defualt theme and can not be deleted`);
      return;
    }
    for (let i in UserThemes) {
      delete UserThemes[i].Themes[Theme];
    }
    AppObj.Themes.splice(AppObj.Themes.indexOf(Theme), 1);
    SelectedTheme = "Dark";
    if (UserSettings.Theme === Theme) {
      UserSettings.Theme = "Dark";
      localStorage.setItem("Theme", Theme.toString());
    }
    CreateThemeBar();
    CreateThemeModeOptions();
    HighLightSelectedThemeBtn("dark-theme-btn");
    ApplyChanges();
  };
  const CreateDeleteThemeWarning = () => {
    if (document.querySelector(".theme-tweaker-warning")) {
      document.querySelector(".theme-tweaker-warning").remove();
    }
    document.querySelector(".delete-btn").style.pointerEvents = "none";
    const Warning = document.createElement("div");
    const WarningText = document.createElement("span");
    const BtnContainer = document.createElement("div");
    const ConfirmBtn = document.createElement("button");
    const CancelBtn = document.createElement("button");
    // InnerText and class-name
    Warning.className = "theme-tweaker-warning";
    WarningText.className = "theme-tweaker-warning-text";
    BtnContainer.className = "theme-tweaker-warning-btn-container";
    ConfirmBtn.className = "theme-tweaker-modal-btn green-btn";
    CancelBtn.className = "theme-tweaker-modal-btn red-btn";
    WarningText.innerText = `Are you sure you want to delete "${SelectedTheme}" Theme ? this action can not be undone!`;
    ConfirmBtn.innerText = "Confirm";
    CancelBtn.innerText = "Cancel";
    // Event
    ConfirmBtn.addEventListener("click", () => {
      DeleteTheme(SelectedTheme);
      document.querySelector(".theme-tweaker-warning").remove();
      document.querySelector(".delete-btn").style = "";
    });
    CancelBtn.addEventListener("click", () => {
      document.querySelector(".theme-tweaker-warning").remove();
      document.querySelector(".delete-btn").style = "";
    });
    // Final
    BtnContainer.append(ConfirmBtn, CancelBtn);
    Warning.append(WarningText, BtnContainer);
    ThemeTweakerModal.append(Warning);
  };
  const CreateNewThemeForm = () => {
    if (document.querySelector(".new-theme-form")) {
      DisplayMessage("Error", "Another new theme form is open close that first");
      return;
    }
    document.querySelector(".new-theme-btn").style.pointerEvents = "none";
    const NewThemeForm = document.createElement("div");
    const NewThemeNameInput = document.createElement("input");
    const NewThemeFormBtnContainer = document.createElement("div");
    const CancelNewThemeBtn = document.createElement("button");
    const CreateNewThemeBtn = document.createElement("button");
    // ClassName
    NewThemeForm.className = "new-theme-form";
    NewThemeNameInput.className = "new-theme-input";
    NewThemeFormBtnContainer.className;
    CreateNewThemeBtn.className = "theme-tweaker-modal-btn green-btn";
    CancelNewThemeBtn.className = "theme-tweaker-modal-btn red-btn";
    // InnerText
    CreateNewThemeBtn.innerText = "Create";
    CancelNewThemeBtn.innerText = "Cancel";
    NewThemeNameInput.placeholder = "Theme name";
    // Events
    CreateNewThemeBtn.addEventListener("click", () => {
      let Name = NewThemeNameInput.value;
      if (!Name) {
        DisplayMessage("Error", "Theme name can not be empty");
        return;
      }
      if ([...AppObj.Themes.map((item) => item.toLowerCase())].includes(Name.toLowerCase())) {
        DisplayMessage("Error", "Theme already exist choose another name");
        return;
      }
      if (!/^[a-zA-Z0-9]+$/.test(Name)) {
        DisplayMessage("Error", "Only english letters and numbers are allowed.");
        return;
      }
      InsertNewTheme(NewThemeNameInput.value);
      document.querySelector(".new-theme-form").remove();
      document.querySelector(".new-theme-btn").style.pointerEvents = "";
    });
    CancelNewThemeBtn.addEventListener("click", () => {
      document.querySelector(".new-theme-form").remove();
      document.querySelector(".new-theme-btn").style.pointerEvents = "";
    });
    // Final
    NewThemeFormBtnContainer.append(CreateNewThemeBtn, CancelNewThemeBtn);
    NewThemeForm.append(NewThemeNameInput, NewThemeFormBtnContainer);
    ThemeTweakerModal.append(NewThemeForm);
  };
  // Events
  ApplyButton.addEventListener("click", ApplyChanges);
  DefualtPalletButton.addEventListener("click", () => {
    localStorage.removeItem("UserThemes");
    window.location.reload();
    ThemeTweakerModal();
  });
  DeleteThemeBtn.addEventListener("click", CreateDeleteThemeWarning);
  HideModalBtn.addEventListener("click", () => {
    HideModal(".theme-tweaker-modal");
  });
  // Finaly
  HideModalBtn.append(HideModalIcon);
  ButtonContainer.append(ApplyButton, DefualtPalletButton, DeleteThemeBtn);
  ThemeTweakerModal.append(HideModalBtn, ThemeBar, Options, ButtonContainer);
  document.body.append(ThemeTweakerModal);
  CreateThemeBar();
  CreateThemeModeOptions();
  AddDragEventListenersToModal(".theme-tweaker-modal");
  PositionModal(".theme-tweaker-modal");
  HighLightSelectedThemeBtn(`${SelectedTheme.toLowerCase()}-theme-btn`);
}
function HighLightSelectedThemeBtn(ID) {
  const ThemeBtns = document.querySelectorAll(".theme-bar-btn");
  ThemeBtns.forEach((Button) => {
    if (Button.id === ID) Button.classList.add("hovered");
    else Button.classList.remove("hovered");
  });
}

function AddNoteModal() {
  if (document.querySelector(".add-note-modal")) return;

  const NewNoteInfo = {
    Title: null,
  };

  const Modal = document.createElement("section");
  Modal.className = "modal add-note-modal";

  const InputsContainer = document.createElement("section");
  InputsContainer.className = "modal-inputs-container";
  InputsContainer.style.order = "2";

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(".add-note-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(ModalTopBar);
  };
  const CreateTitleSection = () => {
    const TitleSection = document.createElement("section");
    const TitleBadge = document.createElement("span");
    const TitleInput = document.createElement("input");
    const CharacterLimitTag = document.createElement("section");

    TitleSection.className = "note-title-section";
    TitleBadge.className = "sticky-badge";
    TitleInput.className = "note-title-input modal-input";
    CharacterLimitTag.className = "character-limit note-title-input-charlimit";

    TitleBadge.innerText = Strings.Title[UserSettings.CurrentLang];
    TitleInput.placeholder = Strings.NoteTitleInputPlaceHolder[UserSettings.CurrentLang];
    TitleInput.maxLength = "30";

    TitleInput.addEventListener("input", () => {
      CharacterLimit(".note-title-input-charlimit", ".note-title-input");
      NewNoteInfo.Title = TitleInput.value;
    });

    TitleSection.append(TitleBadge, TitleInput, CharacterLimitTag);
    InputsContainer.append(TitleSection);
  };
  const CreateTextAreaSection = () => {
    const NoteSection = document.createElement("section");
    const NoteTextArea = document.createElement("textarea");
    const NoteBadge = document.createElement("span");

    NoteSection.className = "note-section";
    NoteTextArea.className = "note-text-area";
    NoteBadge.className = "sticky-badge";

    NoteBadge.innerText = Strings.NoteBadge[UserSettings.CurrentLang];

    NoteSection.append(NoteTextArea, NoteBadge);
    InputsContainer.append(NoteSection);
    InitTinyMce(NoteTextArea, false);
  };
  const CreateBtnSection = () => {
    const ButtonContainer = document.createElement("section");
    const ConfirmBtn = document.createElement("button");
    const CancelBtn = document.createElement("button");

    ButtonContainer.className = "modal-btn-container";
    ConfirmBtn.className = "confirm-btn green-btn";
    CancelBtn.className = "cancel-btn red-btn";

    ButtonContainer.style.order = "3";
    ConfirmBtn.innerText = Strings.Create[UserSettings.CurrentLang];
    CancelBtn.innerText = Strings.Return[UserSettings.CurrentLang];

    ConfirmBtn.addEventListener("click", function () {
      let RawNoteContent = tinymce.activeEditor.getContent({ format: "raw" });
      let Content = tinymce.activeEditor.getContent();
      try {
        if (!NewNoteInfo.Title) throw MessageBoxStrings.EmptyNoteTitle[UserSettings.CurrentLang];
        if (!Content) throw MessageBoxStrings.EmptyNoteText[UserSettings.CurrentLang];
      } catch (Error) {
        DisplayMessage("Error", Error);
        return;
      }
      NewNote(NewNoteInfo.Title, RawNoteContent);
      HideModal(".add-note-modal");
    });
    CancelBtn.addEventListener("click", function () {
      HideModal(".add-note-modal");
    });

    ButtonContainer.append(ConfirmBtn, CancelBtn);
    Modal.append(ButtonContainer);
  };

  CreateModalTopBar();
  CreateTitleSection();
  CreateTextAreaSection();
  CreateBtnSection();

  Modal.append(InputsContainer);
  document.body.append(Modal);

  PositionModal(`.add-note-modal`);
  AddDragEventListenersToModal(".add-note-modal");
  CharacterLimit(".note-title-input-charlimit", ".note-title-input");
}
function ReadNoteModal(...Args) {
  let [Title, ID, Date, Text] = Args;

  if (document.querySelector(`.read-${ID}-modal`)) return;

  const Modal = document.createElement("section");
  Modal.className = `modal read-note-modal read-${ID}-modal`;

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(`.read-${ID}-modal`);
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(ModalTopBar);
  };
  const CreateNoteInfoSection = () => {
    const InfoContainer = document.createElement("section");
    const TitleRow = document.createElement("div");
    const TitleElem = document.createElement("span");
    const TitleLabel = document.createElement("label");
    const IDRow = document.createElement("div");
    const IDElem = document.createElement("span");
    const IDLabel = document.createElement("label");
    const DateRow = document.createElement("div");
    const DateElem = document.createElement("span");
    const DateLabel = document.createElement("label");

    InfoContainer.className = "note-modal-info-container";
    TitleRow.className = "info-container-row";
    TitleElem.className = "note-modal-title";
    TitleLabel.className = "note-title-label";
    IDRow.className = "info-container-row";
    IDElem.className = "note-modal-id";
    IDLabel.className = "note-id-label";
    DateRow.className = "info-container-row";
    DateElem.className = "note-modal-date";
    DateLabel.className = "note-date-label";

    TitleElem.innerText = Title;
    IDElem.innerText = ID;
    if (UserSettings.Calendar === "Solar") {
      DateElem.innerText = `${PlacePersianNumbers(NumericToSolar(Date))}    ${PlacePersianNumbers(NumericToTime(Date))}`;
    }
    if (UserSettings.Calendar === "Gregorian") {
      DateElem.innerText = `${PlacePersianNumbers(NumericToGregorian(Date))}    ${PlacePersianNumbers(NumericToTime(Date))}`;
    }
    TitleLabel.innerText = `${Strings.Title[UserSettings.CurrentLang]} : `;
    IDLabel.innerText = `${Strings.ID[UserSettings.CurrentLang]} : `;
    DateLabel.innerText = `${Strings.DateOfCreation[UserSettings.CurrentLang]} : `;

    DateElem.setAttribute("dir", "ltr");

    TitleRow.append(TitleLabel, TitleElem);
    IDRow.append(IDLabel, IDElem);
    DateRow.append(DateLabel, DateElem);
    InfoContainer.append(TitleRow, IDRow, DateRow);
    Modal.append(InfoContainer);
  };
  const CreateNoteTextSection = () => {
    const NoteTextSection = document.createElement("div");

    NoteTextSection.className = "note-modal-text";

    NoteTextSection.innerHTML = Text;
    NoteTextSection.setAttribute("dir", "auto");

    InitTinyMce(NoteTextSection, true);

    Modal.append(NoteTextSection);
  };
  const CreateBtnSection = () => {
    const EditBtn = document.createElement("button");
    const DeleteBtn = document.createElement("button");
    const CancelEditBtn = document.createElement("button");
    const ApplyEditBtn = document.createElement("button");

    EditBtn.className = "edit-note-btn green-btn text";
    DeleteBtn.className = "delete-note-btn red-btn text";
    CancelEditBtn.className = "cancel-note-edit-btn red-btn text";
    ApplyEditBtn.className = "apply-note-edit-btn green-btn text";

    EditBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
    DeleteBtn.innerText = Strings.Delete[UserSettings.CurrentLang];
    CancelEditBtn.innerText = Strings.Cancel[UserSettings.CurrentLang];
    ApplyEditBtn.innerText = Strings.Apply[UserSettings.CurrentLang];

    EditBtn.addEventListener("click", () => {
      ActivateReadNoteModalEditMode(ID);
    });
    DeleteBtn.addEventListener("click", () => {
      DeleteNote(ID);
      HideModal(`.read-${ID}-modal`);
    });
    ApplyEditBtn.addEventListener("click", () => {
      ApplyEdit(ID);
    });
    CancelEditBtn.addEventListener("click", () => {
      CancelEdit(ID);
    });

    Modal.append(EditBtn, DeleteBtn, ApplyEditBtn, CancelEditBtn);
  };

  CreateModalTopBar();
  CreateNoteInfoSection();
  CreateNoteTextSection();
  CreateBtnSection();

  document.body.append(Modal);
  PositionModal(`.read-${ID}-modal`);
  AddDragEventListenersToModal(`.read-${ID}-modal`);
}

function NewTaskModal() {
  if (document.querySelector(".new-task-modal")) return;

  const NewTaskInfo = {
    Title: null,
    Date: null,
    Category: null,
  };

  const Modal = document.createElement("section");
  Modal.className = "modal new-task-modal";

  const InputsContainer = document.createElement("section");
  InputsContainer.className = "modal-inputs-container";
  InputsContainer.style.order = "2";

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(".new-task-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(HideModalBtn);
  };
  const CreateTitleSection = () => {
    const TitleSection = document.createElement("section");
    const TitleInput = document.createElement("input");
    const TitleInputBadge = document.createElement("span");
    const CharacterLimitTag = document.createElement("section");

    TitleSection.className = "task-title-section";
    TitleInput.className = "modal-input new-task-title-input";
    TitleInputBadge.className = "sticky-badge";
    CharacterLimitTag.className = "character-limit new-task-title-input-charlimit";

    TitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.CurrentLang];
    TitleInput.maxLength = "70";
    TitleInputBadge.innerText = Strings.Title[UserSettings.CurrentLang];

    TitleInput.addEventListener("input", () => {
      NewTaskInfo.Title = TitleInput.value;
      CharacterLimit(".new-task-title-input-charlimit", ".new-task-title-input");
    });

    TitleSection.append(TitleInputBadge, TitleInput, CharacterLimitTag);
    InputsContainer.append(TitleSection);
  };
  const CreateDateSection = () => {
    const DateSection = document.createElement("section");
    const DateInput = document.createElement("input");
    const DateInputBadge = document.createElement("span");

    DateSection.className = "task-date-section";
    DateInput.className = "new-task-date-input modal-input date-input";
    DateInputBadge.className = "sticky-badge";

    DateInputBadge.innerText = Strings.Date[UserSettings.CurrentLang];
    DateInput.placeholder = Strings.TaskDateInputPlaceHolder[UserSettings.CurrentLang];
    DateInput.setAttribute("readonly", "");

    DateInput.addEventListener("click", () => {
      SetupTargetInput(".new-task-date-input");
      ToggleDatePicker(".new-task-date-input");
    });
    let DateInputAttributeObserver = new MutationObserver(function (Mutation) {
      Mutation.forEach(function (Mutation) {
        if (Mutation.type === "attributes") {
          NewTaskInfo.Date = +DateInput.dataset.numericdate;
        }
      });
    });
    DateInputAttributeObserver.observe(DateInput, {
      attributes: true,
    });

    DateSection.append(DateInputBadge, DateInput);
    InputsContainer.append(DateSection);
  };
  const CreateCategorySection = () => {
    const CategorySelectBox = ReturnSelectBox();
    const TaskCategorySection = document.createElement("section");
    const TaskCategorySectionBadge = document.createElement("span");

    TaskCategorySection.className = "select-category-section";
    TaskCategorySectionBadge.className = "sticky-badge";

    TaskCategorySectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];

    TaskCategorySection.append(CategorySelectBox, TaskCategorySectionBadge);

    let SelectBoxAttributeObserver = new MutationObserver(function (Mutation) {
      Mutation.forEach(function (Mutation) {
        if (Mutation.type === "attributes") {
          NewTaskInfo.Category = CategorySelectBox.dataset.value;
        }
      });
    });
    SelectBoxAttributeObserver.observe(CategorySelectBox, {
      attributes: true,
    });
    InputsContainer.append(TaskCategorySection);
  };
  const CreateBtnSection = () => {
    const ButtonContainer = document.createElement("section");
    const ConfirmBtn = document.createElement("button");
    const CancelBtn = document.createElement("button");

    ButtonContainer.className = "modal-btn-container";
    ConfirmBtn.className = "confirm-btn green-btn";
    CancelBtn.className = "cancel-btn red-btn";

    ButtonContainer.style.order = "3";
    ConfirmBtn.innerText = Strings.Create[UserSettings.CurrentLang];
    CancelBtn.innerText = Strings.Return[UserSettings.CurrentLang];

    ConfirmBtn.addEventListener("click", function () {
      try {
        if (!NewTaskInfo.Title) throw new Error("Please write a title for your task");
        if (!NewTaskInfo.Date) throw new Error("Please pick a date for your task");
      } catch (Error) {
        DisplayMessage("Error", Error);
        return;
      }
      AddTask(NewTaskInfo.Title, NewTaskInfo.Date, NewTaskInfo.Category);
      HideModal(".new-task-modal");
    });
    CancelBtn.addEventListener("click", function () {
      HideModal(".new-task-modal");
    });

    ButtonContainer.append(ConfirmBtn, CancelBtn);
    Modal.append(ButtonContainer);
  };

  CreateModalTopBar();
  CreateTitleSection();
  CreateDateSection();
  CreateCategorySection();
  CreateBtnSection();

  Modal.append(InputsContainer);
  document.body.append(Modal);

  PositionModal(".new-task-modal");
  AddDragEventListenersToModal(".new-task-modal");
  CharacterLimit(".new-task-title-input-charlimit", ".new-task-title-input");
}
function EditTaskModal(ID) {
  if (document.querySelector(".edit-task-modal")) return;

  let TaskIndex = AllTasksArray.findIndex((Task) => {
    return Task.ID === ID;
  });
  const TaskInfo = {
    Title: AllTasksArray[TaskIndex].Title,
    Date: AllTasksArray[TaskIndex].NumericDate,
    Category: AllTasksArray[TaskIndex].UserCategory,
  };

  const Modal = document.createElement("section");
  Modal.className = "modal edit-task-modal";

  const InputsContainer = document.createElement("section");
  InputsContainer.className = "modal-inputs-container";
  InputsContainer.style.order = "2";

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(".edit-task-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(HideModalBtn);
  };
  const CreateTitleSection = () => {
    const TitleSection = document.createElement("section");
    const TitleInput = document.createElement("input");
    const TitleInputBadge = document.createElement("span");
    const CharacterLimitTag = document.createElement("section");

    TitleSection.className = "task-title-section";
    TitleInput.className = "modal-input edit-task-title-input";
    TitleInputBadge.className = "sticky-badge";
    CharacterLimitTag.className = "character-limit edit-task-title-input-charlimit";

    TitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.CurrentLang];
    TitleInput.maxLength = "70";
    TitleInputBadge.innerText = Strings.Title[UserSettings.CurrentLang];
    TitleInput.value = TaskInfo.Title;

    TitleInput.addEventListener("input", () => {
      TaskInfo.Title = TitleInput.value;
      CharacterLimit(".edit-task-title-input-charlimit", ".edit-task-title-input");
    });

    TitleSection.append(TitleInputBadge, TitleInput, CharacterLimitTag);
    InputsContainer.append(TitleSection);
  };
  const CreateDateSection = () => {
    const DateSection = document.createElement("section");
    const DateInput = document.createElement("input");
    const DateInputBadge = document.createElement("span");

    DateSection.className = "task-date-section";
    DateInput.className = "edit-task-date-input modal-input date-input";
    DateInputBadge.className = "sticky-badge";

    DateInputBadge.innerText = Strings.Date[UserSettings.CurrentLang];
    DateInput.placeholder = Strings.TaskDateInputPlaceHolder[UserSettings.CurrentLang];
    DateInput.setAttribute("readonly", "");
    if (UserSettings.Calendar === "Solar") {
      DateInput.value = PlacePersianNumbers(NumericToSolar(TaskInfo.Date));
    }
    if (UserSettings.Calendar === "Gregorian") {
      DateInput.value = PlacePersianNumbers(NumericToGregorian(TaskInfo.Date));
    }
    DateInput.addEventListener("click", () => {
      SetupTargetInput(".edit-task-date-input");
      ToggleDatePicker(".edit-task-date-input", TaskInfo.Date);
    });
    let DateInputAttributeObserver = new MutationObserver(function (Mutation) {
      Mutation.forEach(function (Mutation) {
        if (Mutation.type === "attributes") {
          TaskInfo.Date = +DateInput.dataset.numericdate;
        }
      });
    });
    DateInputAttributeObserver.observe(DateInput, {
      attributes: true,
    });

    DateSection.append(DateInputBadge, DateInput);
    InputsContainer.append(DateSection);
  };
  const CreateCategorySection = () => {
    const CategorySelectBox = ReturnSelectBox();
    const TaskCategorySection = document.createElement("section");
    const TaskCategorySectionBadge = document.createElement("span");

    TaskCategorySection.className = "select-category-section";
    TaskCategorySectionBadge.className = "sticky-badge";

    TaskCategorySectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.CurrentLang];

    TaskCategorySection.append(CategorySelectBox, TaskCategorySectionBadge);

    let SelectBoxAttributeObserver = new MutationObserver(function (Mutation) {
      Mutation.forEach(function (Mutation) {
        if (Mutation.type === "attributes") {
          TaskInfo.Category = CategorySelectBox.dataset.value;
        }
      });
    });
    SelectBoxAttributeObserver.observe(CategorySelectBox, {
      attributes: true,
    });
    InputsContainer.append(TaskCategorySection);
  };
  const CreateBtnSection = () => {
    const ButtonContainer = document.createElement("section");
    const ConfirmBtn = document.createElement("button");
    const CancelBtn = document.createElement("button");

    ButtonContainer.className = "modal-btn-container";
    ConfirmBtn.className = "confirm-btn green-btn";
    CancelBtn.className = "cancel-btn red-btn";

    ButtonContainer.style.order = "3";
    ConfirmBtn.innerText = Strings.Create[UserSettings.CurrentLang];
    CancelBtn.innerText = Strings.Return[UserSettings.CurrentLang];

    ConfirmBtn.addEventListener("click", function () {
      try {
        if (!TaskInfo.Title) throw new Error("Please write a title for your task");
        if (!TaskInfo.Date) throw new Error("Please pick a date for your task");
      } catch (Error) {
        DisplayMessage("Error", Error);
        return;
      }
      AllTasksArray[TaskIndex].Title = TaskInfo.Title;
      AllTasksArray[TaskIndex].NumericDate = TaskInfo.Date;
      AllTasksArray[TaskIndex].UserCategory = TaskInfo.Category;
      Save("Tasks");
      UpdateInbox();
      HideModal(".edit-task-modal");
    });
    CancelBtn.addEventListener("click", function () {
      HideModal(".edit-task-modal");
    });

    ButtonContainer.append(ConfirmBtn, CancelBtn);
    Modal.append(ButtonContainer);
  };

  CreateModalTopBar();
  CreateTitleSection();
  CreateDateSection();
  CreateCategorySection();
  CreateBtnSection();

  Modal.append(InputsContainer);
  document.body.append(Modal);

  PositionModal(".edit-task-modal");
  AddDragEventListenersToModal(".edit-task-modal");
  CharacterLimit(".edit-task-title-input-charlimit", ".edit-task-title-input");
}
function NewCategoryModal() {
  if (document.querySelector(".new-category-modal")) return;

  const UserCategoryInfo = {
    Name: null,
    Color: null,
    Icon: null,
  };

  const Modal = document.createElement("section");
  Modal.className = "modal new-category-modal";

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(".new-category-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(HideModalBtn);
  };
  const CreateTitleSection = () => {
    const InputContainer = document.createElement("section");
    const TitleSection = document.createElement("section");
    const TitleInputBadge = document.createElement("span");
    const TitleInput = document.createElement("input");
    const CharacterLimitTag = document.createElement("section");

    TitleSection.className = "category-title-section";
    InputContainer.className = "modal-inputs-container";
    TitleInputBadge.className = "sticky-badge";
    TitleInput.className = "new-category-title-input modal-input";
    CharacterLimitTag.className = "character-limit new-category-title-input-charlimit";

    InputContainer.style.order = "2";
    TitleInputBadge.innerText = Strings.Name[UserSettings.CurrentLang];
    TitleInput.placeholder = Strings.WriteAName[UserSettings.CurrentLang];
    TitleInput.maxLength = "32";

    TitleInput.addEventListener("input", () => {
      UserCategoryInfo.Name = TitleInput.value;
      CharacterLimit(".new-category-title-input-charlimit", ".new-category-title-input");
    });

    TitleSection.append(TitleInputBadge, TitleInput, CharacterLimitTag);
    InputContainer.append(TitleSection);
    Modal.append(InputContainer);
  };
  const CreateColorSection = () => {
    const ColorSection = document.createElement("section");
    const PickColorBadge = document.createElement("span");
    const ColorSlider = document.createElement("div");
    const ColorsContainer = document.createElement("section");
    const ColorSlideLeft = document.createElement("button");
    const ColorSlideRight = document.createElement("button");
    const ColorSlideLeftIcon = document.createElement("img");
    const ColorSlideRightIcon = document.createElement("img");

    ColorSection.className = "pick-color-section";
    PickColorBadge.className = "modal-title";
    ColorSlider.className = "color-slider";
    ColorsContainer.className = "colors-container";
    ColorSlideLeft.className = "slide-left-btn";
    ColorSlideRight.className = "slide-right-btn";
    ColorSlideLeftIcon.className = "icon";
    ColorSlideRightIcon.className = "icon";

    ColorSection.style.order = "3";
    PickColorBadge.innerText = Strings.PickColorBadge[UserSettings.CurrentLang];
    ColorSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
    ColorSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";

    ColorSlideLeft.addEventListener("click", () => ScrollLeft(".colors-container"));
    ColorSlideRight.addEventListener("click", () => ScrollRight(".colors-container"));

    CategoryColors.forEach((Color) => {
      const Button = document.createElement("button");
      Button.className = "color-pallet";
      Button.id = Color.ID;
      Button.style.background = Color.Color;
      Button.title = Color.Name;
      Button.addEventListener("click", () => {
        UserCategoryInfo.Color = Color.Color;
        HighLightSelectedColor(Color.ID);
      });
      ColorsContainer.append(Button);
    });

    ColorSlideLeft.append(ColorSlideLeftIcon);
    ColorSlideRight.append(ColorSlideRightIcon);
    ColorSlider.append(ColorSlideLeft, ColorsContainer, ColorSlideRight);
    ColorSection.append(PickColorBadge, ColorSlider);
    Modal.append(ColorSection);
  };
  const CreateIconSection = () => {
    const IconSection = document.createElement("section");
    const IconsContainer = document.createElement("section");
    const PickIconBadge = document.createElement("span");
    const IconSlider = document.createElement("div");
    const IconSlideLeft = document.createElement("button");
    const IconSlideRight = document.createElement("button");
    const IconSlideLeftIcon = document.createElement("img");
    const IconSlideRightIcon = document.createElement("img");

    IconSection.className = "pick-icon-section";
    PickIconBadge.className = "modal-title";
    IconSlider.className = "color-slider";
    IconsContainer.className = "icons-container";
    IconSlideLeft.className = "slide-left-btn";
    IconSlideRight.className = "slide-right-btn";
    IconSlideLeftIcon.className = "icon";
    IconSlideRightIcon.className = "icon";

    IconSection.style.order = "4";
    PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.CurrentLang];
    IconSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
    IconSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";

    IconSlideLeft.addEventListener("click", () => ScrollLeft(".icons-container"));
    IconSlideRight.addEventListener("click", () => ScrollRight(".icons-container"));

    CategoryIcons.forEach((Icon) => {
      const CategoryButton = document.createElement("button");
      CategoryButton.className = "pick-category-icon-button";
      CategoryButton.id = Icon.ID;
      CategoryButton.addEventListener("click", () => {
        UserCategoryInfo.Icon = Icon.Source;
        HighLightSelectedIcon(Icon.ID);
      });
      const CategoryIcon = document.createElement("img");
      CategoryIcon.className = "pick-category-icon";
      CategoryIcon.src = Icon.Source;
      CategoryButton.append(CategoryIcon);
      IconsContainer.append(CategoryButton);
    });

    IconSlideLeft.append(IconSlideLeftIcon);
    IconSlideRight.append(IconSlideRightIcon);
    IconSlider.append(IconSlideLeft, IconsContainer, IconSlideRight);
    IconSection.append(PickIconBadge, IconSlider);
    Modal.append(IconSection);
  };
  const CreateBtnSection = () => {
    const ButtonContainer = document.createElement("section");
    const ConfirmBtn = document.createElement("button");
    const CancelBtn = document.createElement("button");

    ButtonContainer.className = "modal-btn-container";
    ConfirmBtn.className = "confirm-btn green-btn";
    CancelBtn.className = "cancel-btn red-btn";

    ButtonContainer.style.order = "5";
    ConfirmBtn.innerText = Strings.Create[UserSettings.CurrentLang];
    CancelBtn.innerText = Strings.Return[UserSettings.CurrentLang];

    ConfirmBtn.addEventListener("click", function () {
      try {
        if (!UserCategoryInfo.Name) throw new Error("Please write a name for your category");
        if (!UserCategoryInfo.Color) throw new Error("Please pick a color for your category");
        if (!UserCategoryInfo.Icon) throw new Error("Please pick an icon for your category");
      } catch (Error) {
        DisplayMessage("Error", Error);
        return;
      }
      AddCategory(UserCategoryInfo.Name, UserCategoryInfo.Color, UserCategoryInfo.Icon);
      HideModal(".new-category-modal");
    });
    CancelBtn.addEventListener("click", function () {
      HideModal(".new-category-modal");
    });

    ButtonContainer.append(ConfirmBtn, CancelBtn);
    Modal.append(ButtonContainer);
  };

  CreateModalTopBar();
  CreateTitleSection();
  CreateColorSection();
  CreateIconSection();
  CreateBtnSection();

  document.body.append(Modal);

  PositionModal(".new-category-modal");
  AddDragEventListenersToModal(".new-category-modal");
  CharacterLimit(".new-category-title-input-charlimit", ".new-category-title-input");
}
function EditCategoryModal(ID) {
  if (document.querySelector(".edit-category-modal")) return;

  let Index = UserCategoriesArray.findIndex((Category) => {
    return Category.ID === ID;
  });
  const UserCategoryInfo = {
    Name: UserCategoriesArray[Index].Name,
    Color: UserCategoriesArray[Index].Color,
    Icon: UserCategoriesArray[Index].Icon,
  };

  const Modal = document.createElement("section");
  Modal.className = "modal edit-category-modal";

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(".edit-category-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(HideModalBtn);
  };
  const CreateTitleSection = () => {
    const InputContainer = document.createElement("section");
    const TitleSection = document.createElement("section");
    const TitleInputBadge = document.createElement("span");
    const TitleInput = document.createElement("input");
    const CharacterLimitTag = document.createElement("section");

    TitleSection.className = "category-title-section";
    InputContainer.className = "modal-inputs-container";
    TitleInputBadge.className = "sticky-badge";
    TitleInput.className = "edit-category-title-input modal-input";
    CharacterLimitTag.className = "character-limit edit-category-title-input-charlimit";

    TitleInputBadge.innerText = Strings.Name[UserSettings.CurrentLang];
    TitleInput.placeholder = Strings.WriteAName[UserSettings.CurrentLang];
    TitleInput.maxLength = "32";
    TitleInput.value = UserCategoryInfo.Name;

    TitleInput.addEventListener("input", () => {
      UserCategoryInfo.Name = TitleInput.value;
      CharacterLimit(".edit-category-title-input-charlimit", ".edit-category-title-input");
    });

    TitleSection.append(TitleInputBadge, TitleInput, CharacterLimitTag);
    InputContainer.append(TitleSection);
    Modal.append(InputContainer);
  };
  const CreateColorSection = () => {
    const ColorSection = document.createElement("section");
    const PickColorBadge = document.createElement("span");
    const ColorSlider = document.createElement("div");
    const ColorsContainer = document.createElement("section");
    const ColorSlideLeft = document.createElement("button");
    const ColorSlideRight = document.createElement("button");
    const ColorSlideLeftIcon = document.createElement("img");
    const ColorSlideRightIcon = document.createElement("img");

    ColorSection.className = "pick-color-section";
    PickColorBadge.className = "modal-title";
    ColorSlider.className = "color-slider";
    ColorsContainer.className = "colors-container";
    ColorSlideLeft.className = "slide-left-btn";
    ColorSlideRight.className = "slide-right-btn";
    ColorSlideLeftIcon.className = "icon";
    ColorSlideRightIcon.className = "icon";

    PickColorBadge.innerText = Strings.PickColorBadge[UserSettings.CurrentLang];
    ColorSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
    ColorSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";

    ColorSlideLeft.addEventListener("click", () => ScrollLeft(".colors-container"));
    ColorSlideRight.addEventListener("click", () => ScrollRight(".colors-container"));

    CategoryColors.forEach((Color) => {
      const Button = document.createElement("button");
      Button.className = "color-pallet";
      Button.id = Color.ID;
      Button.style.background = Color.Color;
      Button.title = Color.Name;
      Button.addEventListener("click", () => {
        UserCategoryInfo.Color = Color.Color;
        HighLightSelectedColor(Color.ID);
      });
      ColorsContainer.append(Button);
    });

    ColorSlideLeft.append(ColorSlideLeftIcon);
    ColorSlideRight.append(ColorSlideRightIcon);
    ColorSlider.append(ColorSlideLeft, ColorsContainer, ColorSlideRight);
    ColorSection.append(PickColorBadge, ColorSlider);
    Modal.append(ColorSection);
  };
  const CreateIconSection = () => {
    const IconSection = document.createElement("section");
    const IconsContainer = document.createElement("section");
    const PickIconBadge = document.createElement("span");
    const IconSlider = document.createElement("div");
    const IconSlideLeft = document.createElement("button");
    const IconSlideRight = document.createElement("button");
    const IconSlideLeftIcon = document.createElement("img");
    const IconSlideRightIcon = document.createElement("img");

    IconSection.className = "pick-icon-section";
    PickIconBadge.className = "modal-title";
    IconSlider.className = "icon-slider";
    IconsContainer.className = "icons-container";
    IconSlideLeft.className = "slide-left-btn";
    IconSlideRight.className = "slide-right-btn";
    IconSlideLeftIcon.className = "icon";
    IconSlideRightIcon.className = "icon";

    PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.CurrentLang];
    IconSlideLeftIcon.src = "../Icons/arrow-left-s-fill.svg";
    IconSlideRightIcon.src = "../Icons/arrow-right-s-fill.svg";

    IconSlideLeft.addEventListener("click", () => ScrollLeft(".icons-container"));
    IconSlideRight.addEventListener("click", () => ScrollRight(".icons-container"));

    CategoryIcons.forEach((Icon) => {
      const CategoryButton = document.createElement("button");
      CategoryButton.className = "pick-category-icon-button";
      CategoryButton.id = Icon.ID;
      CategoryButton.addEventListener("click", () => {
        UserCategoryInfo.Icon = Icon.Source;
        HighLightSelectedIcon(Icon.ID);
      });
      const CategoryIcon = document.createElement("img");
      CategoryIcon.className = "pick-category-icon";
      CategoryIcon.src = Icon.Source;
      CategoryButton.append(CategoryIcon);
      IconsContainer.append(CategoryButton);
    });

    IconSlideLeft.append(IconSlideLeftIcon);
    IconSlideRight.append(IconSlideRightIcon);
    IconSlider.append(IconSlideLeft, IconsContainer, IconSlideRight);
    IconSection.append(PickIconBadge, IconSlider);
    Modal.append(IconSection);
  };
  const CreateBtnSection = () => {
    const ButtonContainer = document.createElement("section");
    const ConfirmBtn = document.createElement("button");
    const CancelBtn = document.createElement("button");

    ButtonContainer.className = "modal-btn-container";
    ConfirmBtn.className = "confirm-btn green-btn";
    CancelBtn.className = "cancel-btn red-btn";

    ConfirmBtn.innerText = Strings.Edit[UserSettings.CurrentLang];
    CancelBtn.innerText = Strings.Return[UserSettings.CurrentLang];

    ConfirmBtn.addEventListener("click", function () {
      try {
        if (!UserCategoryInfo.Name) throw new Error("Please write a name for your category");
        if (!UserCategoryInfo.Color) throw new Error("Please pick a color for your category");
        if (!UserCategoryInfo.Icon) throw new Error("Please pick an icon for your category");
      } catch (Error) {
        DisplayMessage("Error", Error);
        return;
      }
      UserCategoriesArray[Index].Color = UserCategoryInfo.Color;
      UserCategoriesArray[Index].Name = UserCategoryInfo.Name;
      UserCategoriesArray[Index].Icon = UserCategoryInfo.Icon;
      Save("UGC");
      UpdateInbox();
      DisplayUserCategories();
      HideModal(".edit-category-modal");
    });
    CancelBtn.addEventListener("click", function () {
      HideModal(".edit-category-modal");
    });

    ButtonContainer.append(ConfirmBtn, CancelBtn);
    Modal.append(ButtonContainer);
  };

  CreateModalTopBar();
  CreateTitleSection();
  CreateColorSection();
  CreateIconSection();
  CreateBtnSection();

  document.body.append(Modal);

  PositionModal(".edit-category-modal");
  AddDragEventListenersToModal(".edit-category-modal");
  CharacterLimit(".edit-category-title-input-charlimit", ".edit-category-title-input");
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
function ScrollRight(Selector) {
  const Target = document.querySelector(Selector);
  Target.scrollLeft += 100;
}
function ScrollLeft(Selector) {
  const Target = document.querySelector(Selector);
  Target.scrollLeft -= 100;
}

function BackUpModal() {
  if (document.querySelector(".backup-modal")) return;

  const Modal = document.createElement("section");
  Modal.className = "modal backup-modal";

  const BackUpModalOptions = document.createElement("section");
  BackUpModalOptions.className = "backup-modal-options";

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function () {
      HideModal(".backup-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(HideModalBtn);
  };
  const CreateInsertBackUpFileSection = () => {
    const InsertBackUpFile = document.createElement("button");
    const InsertBackUpFileIcon = document.createElement("img");
    const InsertBackUpFileText = document.createElement("span");
    InsertBackUpFileIcon.className = "modal-btn-icon icon";
    InsertBackUpFileText.className = "modal-btn-text text";
    InsertBackUpFile.className = "modal-btn insert-backup-file-button";
    InsertBackUpFileText.innerText = Strings.InsertBackUpFile[UserSettings.CurrentLang];
    InsertBackUpFileIcon.src = "";
    InsertBackUpFile.addEventListener("click", () => {});
    InsertBackUpFile.append(InsertBackUpFileIcon, InsertBackUpFileText);
    BackUpModalOptions.append(InsertBackUpFile);
  };
  const CreateInsertBackUpTextSection = () => {
    const InsertBackUpText = document.createElement("button");
    const InsertBackUpTextIcon = document.createElement("img");
    const InsertBackUpTextText = document.createElement("span");
    const ReturnButton = document.createElement("button");
    const ReturnButtonIcon = document.createElement("img");
    const ReturnButtonText = Strings.Return[UserSettings.CurrentLang];
    const ModalSubPage = document.createElement("section");
    const ModalTitle = document.createElement("span");
    const ModalDescription = document.createElement("p");
    const ModalTextArea = document.createElement("textarea");
    const RestoreButton = document.createElement("button");

    InsertBackUpTextIcon.className = "modal-btn-icon icon";
    InsertBackUpTextText.className = "modal-btn-text text";
    InsertBackUpText.className = "modal-btn insert-backup-text-button";
    ReturnButton.className = "return-btn red-btn text";
    ReturnButtonIcon.className = "return-btn-icon icon";
    ModalSubPage.className = "modal-sub-page";
    ModalTitle.className = "modal-title text";
    ModalDescription.className = "modal-description text";
    ModalTextArea.className = "modal-text-area";
    RestoreButton.className = "restore-btn green-btn text";

    InsertBackUpTextText.innerText = Strings.InsertBackUpText[UserSettings.CurrentLang];
    RestoreButton.innerText = Strings.RestoreTask[UserSettings.CurrentLang];
    ModalTitle.innerText = Strings.RestoreFromText[UserSettings.CurrentLang];
    ModalDescription.innerText = Strings.RestoreFromTextDescription[UserSettings.CurrentLang];

    ModalTextArea.placeholder = Strings.InsertBackUpTextPlaceHolder[UserSettings.CurrentLang];
    InsertBackUpTextIcon.src = "";

    ReturnButton.addEventListener("click", ReturnFromModalSubPage);
    RestoreButton.addEventListener("click", () => RestoreFromText(ModalTextArea.value));
    InsertBackUpText.addEventListener("click", () => {
      BackUpModalOptions.style.display = "none";
      Modal.append(ModalSubPage);
    });

    ReturnButton.append(ReturnButtonIcon, ReturnButtonText);
    ModalSubPage.append(ModalTitle, ModalDescription, ModalTextArea, RestoreButton, ReturnButton);
    InsertBackUpText.append(InsertBackUpTextIcon, InsertBackUpTextText);
    BackUpModalOptions.append(InsertBackUpText);
  };
  const CreateGenerateBackUpFileSection = () => {
    const GenerateBackUpFile = document.createElement("button");
    const GenerateBackUpFileIcon = document.createElement("img");
    const GenerateBackUpFileText = document.createElement("span");
    GenerateBackUpFileIcon.className = "modal-btn-icon icon";
    GenerateBackUpFileText.className = "modal-btn-text text";
    GenerateBackUpFile.className = "modal-btn generate-backup-file-button";
    GenerateBackUpFileText.innerText = Strings.GenerateBackUpFile[UserSettings.CurrentLang];
    GenerateBackUpFileIcon.src = "";
    GenerateBackUpFile.addEventListener("click", () => {});
    GenerateBackUpFile.append(GenerateBackUpFileIcon, GenerateBackUpFileText);
    BackUpModalOptions.append(GenerateBackUpFile);
  };
  const CreateGenerateBackUpTextSection = () => {
    const GenerateBackUpText = document.createElement("button");
    const GenerateBackUpTextIcon = document.createElement("img");
    const GenerateBackUpTextText = document.createElement("span");
    const ReturnButton = document.createElement("button");
    const ReturnButtonIcon = document.createElement("img");
    const ReturnButtonText = Strings.Return[UserSettings.CurrentLang];
    const ModalSubPage = document.createElement("section");
    const ModalTitle = document.createElement("span");
    const ModalDescription = document.createElement("p");
    const ModalTextArea = document.createElement("textarea");
    const CopyButton = document.createElement("button");

    GenerateBackUpTextIcon.className = "modal-btn-icon icon";
    GenerateBackUpTextText.className = "modal-btn-text text";
    GenerateBackUpText.className = "modal-btn generate-backup-file-button";
    ReturnButton.className = "return-btn red-btn text";
    ReturnButtonIcon.className = "return-btn-icon icon";
    ModalSubPage.className = "modal-sub-page";
    ModalTitle.className = "modal-title text";
    ModalDescription.className = "modal-description text";
    ModalTextArea.className = "modal-text-area";
    CopyButton.className = "copy-to-clipboard-btn green-btn text";

    GenerateBackUpTextText.innerText = Strings.GenerateBackUpText[UserSettings.CurrentLang];
    ModalTitle.innerText = Strings.BackUpText[UserSettings.CurrentLang];
    ModalDescription.innerText = Strings.BackUpTextDescription[UserSettings.CurrentLang];
    CopyButton.innerText = Strings.CopyButton[UserSettings.CurrentLang];

    GenerateBackUpTextIcon.src = "";
    ModalTextArea.value = FetchLocalStorge();

    ReturnButton.addEventListener("click", ReturnFromModalSubPage);
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
    GenerateBackUpText.addEventListener("click", () => {
      BackUpModalOptions.style.display = "none";
      Modal.append(ModalSubPage);
    });

    ReturnButton.append(ReturnButtonIcon, ReturnButtonText);
    ModalSubPage.append(ModalTitle, ModalDescription, ModalTextArea, CopyButton, ReturnButton);
    GenerateBackUpText.append(GenerateBackUpTextIcon, GenerateBackUpTextText);
    BackUpModalOptions.append(GenerateBackUpText);
  };

  CreateModalTopBar();
  CreateInsertBackUpFileSection();
  CreateInsertBackUpTextSection();
  CreateGenerateBackUpFileSection();
  CreateGenerateBackUpTextSection();

  Modal.append(BackUpModalOptions);
  document.body.append(Modal);

  PositionModal(".backup-modal");
  AddDragEventListenersToModal(".backup-modal");
}
function ReturnFromModalSubPage() {
  let SubPage = document.querySelector(".modal-sub-page");
  SubPage.remove();
  let ModalButtonContainer = document.querySelector(".backup-modal-options");
  ModalButtonContainer.style.display = "flex";
}

function DeleteModal(Type, ID) {
  const Modal = document.createElement("section");
  Modal.className = "modal";

  const HideModalBtn = document.createElement("button");
  const HideModalIcon = document.createElement("img");
  const ModalText = document.createElement("p");
  const MoveToTrashContainer = document.createElement("section");
  const MoveToTrashText = document.createElement("p");
  const CheckBoxContainer = document.createElement("label");
  const MoveToTrashCheckBox = document.createElement("input");
  const CheckMark = document.createElement("div");
  const ModalBtnContainer = document.createElement("section");
  const ConfirmBtn = document.createElement("button");
  const CancelBtn = document.createElement("button");

  HideModalBtn.className = "close-btn icon";
  ModalText.className = "modal-text";
  MoveToTrashContainer.className = "move-to-trash-container";
  MoveToTrashText.className = "move-to-trash-text text";
  MoveToTrashCheckBox.className = "move-to-trash-checkbox";
  CheckBoxContainer.className = "checkbox-container";
  MoveToTrashCheckBox.className = "checkbox";
  CheckMark.className = "checkmark";
  ModalBtnContainer.className = "modal-btn-container";
  ConfirmBtn.className = "confirm-btn red-btn";
  CancelBtn.className = "cancel-btn green-btn";

  MoveToTrashCheckBox.type = "checkbox";
  MoveToTrashCheckBox.checked = true;
  HideModalIcon.src = "../Icons/close-large-line.svg";
  MoveToTrashText.innerText = Strings.MoveToTrashText[UserSettings.CurrentLang];
  ConfirmBtn.innerText = Strings.Delete[UserSettings.CurrentLang];
  CancelBtn.innerText = Strings.Return[UserSettings.CurrentLang];

  HideModalBtn.style.order = "1";
  ModalText.style.order = "2";
  MoveToTrashContainer.style.order = "3";
  ModalBtnContainer.style.order = "4";

  ConfirmBtn.addEventListener("click", function () {
    switch (Type) {
      case "Normal":
      case "Completed":
      case "Failed":
        if (MoveToTrashCheckBox.checked) MoveToTrash();
        else DeleteTask();
        HideModal(".delete-task-modal");
        break;
      case "Trashed":
        DeleteTask();
        HideModal(".delete-task-modal");
        break;
      case "DeleteCategory":
        DeleteCategory(ID);
        HideModal(".delete-category-modal");
        break;
    }
  });

  HideModalBtn.append(HideModalIcon);
  CheckBoxContainer.append(MoveToTrashCheckBox, CheckMark);
  MoveToTrashContainer.append(CheckBoxContainer, MoveToTrashText);
  ModalBtnContainer.append(CancelBtn, ConfirmBtn);
  Modal.append(HideModalBtn, ModalText, ModalBtnContainer);
  document.body.append(Modal);

  switch (Type) {
    case "Normal":
    case "Completed":
    case "Failed":
      if (document.querySelector(".delete-task-modal")) return;
      Modal.classList.add("delete-task-modal");
      ModalText.innerText = Strings.DeleteText[UserSettings.CurrentLang];
      Modal.append(MoveToTrashContainer);
      AddDragEventListenersToModal(".delete-task-modal");
      PositionModal(".delete-task-modal");
      CancelBtn.addEventListener("click", () => {
        HideModal(".delete-task-modal");
      });
      HideModalBtn.addEventListener("click", () => {
        HideModal(".delete-task-modal");
      });
      break;
    case "Trashed":
      if (document.querySelector(".delete-task-modal")) return;
      Modal.classList.add("delete-task-modal");
      ModalText.innerText = Strings.DeleteTrashText[UserSettings.CurrentLang];
      AddDragEventListenersToModal(".delete-task-modal");
      PositionModal(".delete-task-modal");
      CancelBtn.addEventListener("click", () => {
        HideModal(".delete-task-modal");
      });
      HideModalBtn.addEventListener("click", () => {
        HideModal(".delete-task-modal");
      });
      break;
    case "DeleteCategory":
      if (document.querySelector(".delete-category-modal")) return;
      Modal.classList.add("delete-category-modal");
      ModalText.innerText = Strings.DeleteCategoryText[UserSettings.CurrentLang];
      AddDragEventListenersToModal(".delete-category-modal");
      PositionModal(".delete-category-modal");
      CancelBtn.addEventListener("click", () => {
        HideModal(".delete-category-modal");
      });
      HideModalBtn.addEventListener("click", () => {
        HideModal(".delete-category-modal");
      });
      break;
  }
}

function ReturnSelectBox(UserCategory) {
  const SelectBox = document.createElement("div");
  const SelectBoxText = document.createElement("div");
  const SelectBoxOptionsContainer = document.createElement("div");
  const NoneOption = document.createElement("div");
  const SelectBoxIconContainer = document.createElement("div");
  const SelectBoxIcon = document.createElement("img");

  SelectBox.className = "select-box";
  SelectBoxText.className = "select-box-text";
  SelectBoxOptionsContainer.className = "options-container";
  NoneOption.className = "option";
  SelectBoxIconContainer.className = "select-box-icon-container";
  SelectBoxIcon.className = "select-box-icon icon";

  NoneOption.setAttribute("data-value", "None");
  SelectBox.setAttribute("data-value", "None");
  NoneOption.innerText = Strings.CategoryNoneOption[UserSettings.CurrentLang];
  SelectBoxText.innerText = NoneOption.innerText;
  SelectBoxIcon.src = "../Icons/arrow-down-s-fill.svg";

  NoneOption.addEventListener("click", () => {
    SelectBoxIconContainer.classList.toggle("show-select-box");
    SelectBox.dataset.value = "None";
    SelectBoxText.innerText = NoneOption.innerText;
  });
  SelectBoxIconContainer.addEventListener("click", () => {
    SelectBoxIcon.classList.toggle("rotate-icon");
    SelectBox.click();
  });
  SelectBox.addEventListener("click", () => {
    SelectBoxIcon.classList.toggle("rotate-icon");
    SelectBoxOptionsContainer.classList.toggle("show-select-box");
  });

  SelectBoxIconContainer.append(SelectBoxIcon);
  SelectBox.append(SelectBoxOptionsContainer, SelectBoxText, SelectBoxIconContainer);
  SelectBoxOptionsContainer.append(NoneOption);
  UserCategoriesArray.forEach((Category) => {
    const CategoryOption = document.createElement("div");
    CategoryOption.className = "option";
    CategoryOption.innerText = Category.Name;
    CategoryOption.setAttribute("data-value", Category.ID);
    CategoryOption.addEventListener("click", () => {
      SelectBoxIconContainer.classList.toggle("show-select-box");
      SelectBox.dataset.value = CategoryOption.dataset.value;
      SelectBoxText.innerText = CategoryOption.innerText;
    });
    SelectBoxOptionsContainer.append(CategoryOption);
    // Select Appropiate option based on selected task category
    if (AppObj.CurrentWindow.includes("UserCategory-")) {
      if (CategoryOption.dataset.value === AppObj.SelectedUserCategory) {
        SelectBox.dataset.value = CategoryOption.dataset.value;
        SelectBoxText.innerText = CategoryOption.innerText;
      }
    } else if (UserCategory) {
      if (CategoryOption.dataset.value === UserCategory) {
        SelectBox.dataset.value = CategoryOption.dataset.value;
        SelectBoxText.innerText = CategoryOption.innerText;
      }
    }
  });

  return SelectBox;
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
function HideModal(Selector) {
  const Modal = document.querySelector(Selector);
  if (Modal) Modal.remove();
}
function CharacterLimit(CharLimitSelector, InputSelector) {
  const CharacterLimitTag = document.querySelector(CharLimitSelector);
  const Input = document.querySelector(InputSelector);
  CharacterLimitTag.innerText = `${PlacePersianNumbers(Input.value.length)}/${PlacePersianNumbers(Input.maxLength)}`;
}
function AddDragEventListenersToModal(Selector) {
  if (!Selector) {
    DisplayMessage("Error", `Invalid selector passed to AddDragEventListenersToModal() , AppObj.ActiveModalID : ${AppObj.ActiveModalID}`);
    return;
  }
  const Modal = document.querySelector(Selector);
  Modal.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((AnotherModal) => {
      AnotherModal.classList.remove("active");
    });
    Modal.classList.add("active");
  });
  Modal.addEventListener("mousedown", (Event) => {
    if (!Event.target.className.includes("modal")) return;
    AppObj.DragModalMode = true;
    AppObj.ActiveModalID = Selector;
    document.querySelectorAll("*").forEach((Element) => {
      Element.classList.add("disable-selection");
    });
  });
  document.addEventListener("mouseup", () => {
    AppObj.DragModalMode = false;
    AppObj.ActiveModalID = null;
    document.querySelectorAll("*").forEach((Element) => {
      Element.classList.remove("disable-selection");
    });
  });
}
function PositionModal(Selector) {
  const Modal = document.querySelector(Selector);
  Modal.style.transform = `translateX(calc(-50% - ${GetRandomNumber(100, 400)}px))`;
}
document.addEventListener("mousemove", (Event) => {
  if (!AppObj.DragModalMode) return;
  if (!AppObj.ActiveModalID) {
    DisplayMessage("Error", `Invalid AppObj.ActiveModalID value detected , AppObj.ActiveModalID : ${AppObj.ActiveModalID}`);
    return;
  }
  const Modal = document.querySelector(AppObj.ActiveModalID);
  Modal.style.top = `${Event.clientY}px`;
  Modal.style.left = `${Event.clientX}px`;
});
