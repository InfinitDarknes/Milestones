function ThemeTweakerModal() {
  if (document.querySelector(".theme-tweaker-modal")) return;
  // Reqs
  let UserThemes = { ...ThemeObj };
  let SelectedTheme = UserSettings.Theme;
  let ValidColorFormat = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  // Define
  const ThemeTweakerModal = document.createElement("section");
  const HideModalBtn = document.createElement("button");
  const HideModalIcon = document.createElement("img");
  const ThemeBar = document.createElement("div");
  const SearchBar = document.createElement("input");
  const Options = document.createElement("section");
  const ButtonContainer = document.createElement("div");
  const ApplyButton = document.createElement("button");
  const DeleteThemeBtn = document.createElement("button");
  const DefualtPalletButton = document.createElement("button");
  // ID and class
  ThemeTweakerModal.className = "theme-tweaker-modal modal";

  HideModalBtn.className = "close-btn icon";
  ThemeBar.className = "theme-bar";
  SearchBar.className = "theme-modal-search-bar";
  Options.className = "theme-tweaker-options";
  ButtonContainer.className = "theme-tweaker-modal-btn-container";
  ApplyButton.className = "theme-tweaker-modal-btn apply-btn";
  DeleteThemeBtn.className = "theme-tweaker-modal-btn delete-btn";
  DefualtPalletButton.className = "theme-tweaker-modal-btn defualt-btn";
  // InnerText and src and placeholder
  SearchBar.placeholder = Strings.Search[UserSettings.Lang];
  ApplyButton.innerText = Strings.Apply[UserSettings.Lang];
  DefualtPalletButton.innerText = "Defualt Pallet";
  DeleteThemeBtn.innerText = `${Strings.Delete[UserSettings.Lang]} ${Strings.Theme[UserSettings.Lang].toLowerCase()}`;
  HideModalIcon.src = "../Icons/close-large-line.svg";
  ApplyButton.title = "ShortCut : CTRL + S";
  DeleteThemeBtn.title = "ShortCut : DEL";
  HideModalBtn.title = "ShortCut : ESC";
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
    NewThemeBtn.innerText = `${Strings.Add[UserSettings.Lang]} ${Strings.Theme[UserSettings.Lang].toLowerCase()}`;
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
      let Hover = ThemeObj[i]?.Themes[SelectedTheme]?.Hover?.BgColor;
      let Opacity = ThemeObj[i]?.Themes[SelectedTheme]?.Opacity;
      let TextOpacity = ThemeObj[i]?.Themes[SelectedTheme]?.TextOpacity;
      let Border = ThemeObj[i]?.Themes[SelectedTheme]?.Border;
      if (BgColor !== undefined) {
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
        CssPropertyLabel.innerText = Strings.BackgroundColor[UserSettings.Lang];
        BgColorPicker.placeholder = Strings.BackgroundColor[UserSettings.Lang];

        BgColorPicker.type = "color";
        BgColorInput.type = "text";

        Container.style.order = 3;

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
          } else if (BgColorInput.value === "") {
            UserThemes[i].Themes[SelectedTheme].BgColor = BgColorInput.value;
          } else {
            DisplayMessage("Error", `Invalid color format at ${i} , value must be in Hex format`);
          }
        });
        CssProperyInputsContainer.append(BgColorInput, BgColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (Color !== undefined) {
        Strings.BackgroundColor[UserSettings.Lang];
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
        CssPropertyLabel.innerText = Strings.Color[UserSettings.Lang];
        ColorPicker.placeholder = Strings.Color[UserSettings.Lang];

        ColorPicker.type = "color";
        ColorInput.type = "text";

        Container.style.order = 4;

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
          } else if (ColorInput.value === "") {
            UserThemes[i].Themes[SelectedTheme].Color = ColorInput.value;
          } else {
            DisplayMessage("Error", `Invalid color format at ${i} , value must be in Hex format`);
          }
        });
        CssProperyInputsContainer.append(ColorInput, ColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (Border !== undefined) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const PositionSelect = document.createElement("select");
        const StyleSelect = document.createElement("select");
        const WidthInput = document.createElement("input");
        const ColorInput = document.createElement("input");
        const OpacityInput = document.createElement("input");

        const BorderStyles = ["None", "Hidden", "Dotted", "Dashed", "Solid", "Double", "Groove", "Ridge", "Inset", "Outset", "Initial", "Inherit"];
        const BorderPositions = ["All", "Top", "Bottom", "Left", "Right"];

        BorderStyles.forEach((Style) => {
          const OptionElement = document.createElement("option");
          OptionElement.className = "modal-option";
          OptionElement.textContent = Style;
          OptionElement.value = Style;
          StyleSelect.append(OptionElement);
        });
        BorderPositions.forEach((Position) => {
          const OptionElement = document.createElement("option");
          OptionElement.className = "modal-option";
          OptionElement.textContent = Position;
          if (Position === "All") OptionElement.value = "";
          else OptionElement.value = Position;
          PositionSelect.append(OptionElement);
        });

        Container.className = "theme-tweaker-inner-row-container";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        CssPropertyLabel.className = "css-property-label";
        PositionSelect.className = "css-property-select-box mini";
        StyleSelect.className = "css-property-select-box mini";
        WidthInput.className = "css-property-input mini";
        ColorInput.className = "css-property-input mini";
        OpacityInput.className = "css-property-input mini";

        PositionSelect.value = Border[0];
        WidthInput.value = +Border[1];
        StyleSelect.value = Border[2] || "None";
        ColorInput.value = Border[3];
        OpacityInput.value = +Border[4];
        CssPropertyLabel.innerText = Strings.Border[UserSettings.Lang];

        WidthInput.type = "number";
        ColorInput.type = "text";
        OpacityInput.type = "number";

        WidthInput.placeholder = "Width";
        ColorInput.placeholder = "Color";
        OpacityInput.placeholder = "Opacity";

        Container.style.order = 2;

        OpacityInput.min = 0;
        OpacityInput.max = 100;
        WidthInput.min = 0;

        PositionSelect.addEventListener("change", () => {
          UserThemes[i].Themes[SelectedTheme].Border[0] = PositionSelect.value;
          if (!WidthInput.value || !ColorInput.value || !OpacityInput.value || !StyleSelect.value) {
            return;
          }
          document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
            Element.style.border = "";
            Element.style.borderTop = "";
            Element.style.borderBottom = "";
            Element.style.borderLeft = "";
            Element.style.borderRight = "";
            Element.style[`border${PositionSelect.value}`] = `${WidthInput.value}px ${StyleSelect.value} ${HexToRgba(ColorInput.value, OpacityInput.value / 100)}`;
          });
        });
        WidthInput.addEventListener("input", () => {
          if (!isNaN(+WidthInput.value)) {
            console.log("b width");
            UserThemes[i].Themes[SelectedTheme].Border[1] = WidthInput.value.toString();
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style.borderWidth = `${WidthInput.value}px`;
            });
          } else {
            DisplayMessage("Error", `Invalid width format At ${i} , value must be a number`);
          }
        });
        StyleSelect.addEventListener("change", () => {
          UserThemes[i].Themes[SelectedTheme].Border[2] = StyleSelect.value;
          document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
            Element.style["border" + PositionSelect.value + "Style"] = StyleSelect.value;
          });
        });
        ColorInput.addEventListener("input", () => {
          if (ColorInput.value.match(ValidColorFormat) || ColorInput.value === "") {
            UserThemes[i].Themes[SelectedTheme].Border[3] = ColorInput.value;
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style["border" + PositionSelect.value + "Color"] = HexToRgba(ColorInput.value, OpacityInput.value / 100);
            });
          } else {
            DisplayMessage("Error", `Invalid color format at ${i} , value must be in Hex format`);
          }
        });
        OpacityInput.addEventListener("input", () => {
          if (OpacityInput.value && +OpacityInput.value >= 0 && +OpacityInput.value <= 100) {
            UserThemes[i].Themes[SelectedTheme].Border[4] = OpacityInput.value.toString();
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style["border" + PositionSelect.value + "Color"] = HexToRgba(ColorInput.value, OpacityInput.value / 100);
            });
          } else {
            DisplayMessage("Error", `Invalid opacity format at ${i} , value must be from 0 to 100 only`);
          }
        });
        CssProperyInputsContainer.append(PositionSelect, WidthInput, StyleSelect, ColorInput, OpacityInput);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (Opacity !== undefined) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const OpacityInput = document.createElement("input");

        Container.className = "theme-tweaker-inner-row-container";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        CssPropertyLabel.className = "css-property-label";
        OpacityInput.className = "css-property-input";

        OpacityInput.value = Opacity;
        CssPropertyLabel.innerText = `${Strings.BackgroundOpacity[UserSettings.Lang]} (%)`;
        OpacityInput.placeholder = `${Strings.BackgroundOpacity[UserSettings.Lang]} (%)`;
        OpacityInput.min = 0;
        OpacityInput.max = 100;

        OpacityInput.type = "number";

        Container.style.order = 6;

        OpacityInput.addEventListener("input", () => {
          if (OpacityInput.value && OpacityInput.value >= 0 && OpacityInput.value <= 100) {
            UserThemes[i].Themes[SelectedTheme].Opacity = OpacityInput.value;
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style.backgroundColor = HexToRgba(UserThemes[i].Themes[SelectedTheme].BgColor, OpacityInput.value / 100);
            });
          } else {
            DisplayMessage("Error", `Invalid opacity format at ${i} , value must be from 0 to 100 only`);
          }
        });
        CssProperyInputsContainer.append(OpacityInput);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (TextOpacity !== undefined) {
        const Container = document.createElement("div");
        const CssPropertyLabel = document.createElement("label");
        const CssProperyInputsContainer = document.createElement("div");
        const OpacityInput = document.createElement("input");

        Container.className = "theme-tweaker-inner-row-container";
        CssProperyInputsContainer.className = "css-property-inputs-container";
        CssPropertyLabel.className = "css-property-label";
        OpacityInput.className = "css-property-input";

        OpacityInput.value = TextOpacity;
        CssPropertyLabel.innerText = `${Strings.TextOpacity[UserSettings.Lang]} (%)`;
        OpacityInput.placeholder = `${Strings.TextOpacity[UserSettings.Lang]} (%)`;
        OpacityInput.min = 0;
        OpacityInput.max = 100;

        OpacityInput.type = "number";

        Container.style.order = 7;

        OpacityInput.addEventListener("input", () => {
          if (OpacityInput.value && OpacityInput.value >= 0 && OpacityInput.value <= 100) {
            UserThemes[i].Themes[SelectedTheme].TextOpacity = OpacityInput.value;
            document.querySelectorAll(ThemeObj[i].Selector).forEach((Element) => {
              Element.style.color = HexToRgba(UserThemes[i].Themes[SelectedTheme].Color, OpacityInput.value / 100);
            });
          } else {
            DisplayMessage("Error", `Invalid opacity format at ${i} , value must be from 0 to 100 only`);
          }
        });
        CssProperyInputsContainer.append(OpacityInput);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      if (Hover !== undefined) {
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

        CssPropertyLabel.innerText = Strings.HoverBg[UserSettings.Lang];
        HoverBgColorInput.placeholder = Strings.HoverBg[UserSettings.Lang];
        HoverBgColorPicker.value = Hover;
        HoverBgColorInput.value = Hover;

        HoverBgColorPicker.type = "color";
        HoverBgColorInput.type = "text";

        Container.style.order = 5;

        HoverBgColorPicker.addEventListener("input", () => {
          UserThemes[i].Themes[SelectedTheme].Hover.BgColor = HoverBgColorPicker.value;
          HoverBgColorInput.value = HoverBgColorPicker.value;
        });
        HoverBgColorInput.addEventListener("input", () => {
          if (HoverBgColorInput.value.match(ValidColorFormat) || ColorInput.value === "") {
            UserThemes[i].Themes[SelectedTheme].Hover.BgColor = HoverBgColorInput.value;
            HoverBgColorPicker.value = HoverBgColorInput.value;
          } else {
            DisplayMessage("Error", `Invalid color format at ${i} , value must be in Hex format`);
          }
        });
        CssProperyInputsContainer.append(HoverBgColorInput, HoverBgColorPicker);
        Container.append(CssPropertyLabel, CssProperyInputsContainer);
        Row.append(Container);
      }
      Row.className = "theme-tweaker-modal-row";
      RowLabel.className = "theme-tweaker-modal-row-label";
      RowLabel.innerText = i;
      Row.style.order = 1;
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
    if (Theme === "Dark") {
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
  // Search Input function
  const SearchElements = (KeyWord) => {
    CreateThemeModeOptions();
    const Elements = Array.from(document.querySelectorAll(".theme-tweaker-modal-row-label"));
    const Matches = Elements.filter((Elem) => {
      if (Elem.innerHTML.toLowerCase().includes(KeyWord.toLowerCase())) {
        Elem.parentElement.style.display = "flex";
        return Elem;
      } else {
        Elem.parentElement.style.display = "none";
      }
    });
    if (Matches.length === 0) {
      if (!document.querySelector(".theme-tweaker-options .empty-box-container")) {
        EmptyBox("No element was found :(", ".theme-tweaker-options");
      }
    }
  };
  // Events
  SearchBar.addEventListener("input", () => {
    SearchElements(SearchBar.value.toLowerCase());
  });
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
  ThemeTweakerModal.append(HideModalBtn, ThemeBar, SearchBar, Options, ButtonContainer);
  document.body.append(ThemeTweakerModal);
  CreateThemeBar();
  CreateThemeModeOptions();
  ChooseActiveModal();
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
    HideModalBtn.title = "ShortCut : ESC";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();
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
    TitleBadge.className = "sticky-badge text";
    TitleInput.className = "note-title-input modal-input";
    CharacterLimitTag.className = "character-limit note-title-input-charlimit text";

    TitleBadge.innerText = Strings.Title[UserSettings.Lang];
    TitleInput.placeholder = Strings.NoteTitleInputPlaceHolder[UserSettings.Lang];
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
    NoteBadge.className = "sticky-badge text";

    NoteBadge.innerText = Strings.NoteBadge[UserSettings.Lang];

    NoteSection.append(NoteBadge, NoteTextArea);
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
    ConfirmBtn.innerText = Strings.Create[UserSettings.Lang];
    CancelBtn.innerText = Strings.Return[UserSettings.Lang];
    ConfirmBtn.title = "ShortCut : Enter";

    ConfirmBtn.addEventListener("click", function () {
      let RawNoteContent = tinymce.activeEditor.getContent({ format: "raw" });
      let Content = tinymce.activeEditor.getContent();
      try {
        if (!NewNoteInfo.Title) throw MessageBoxStrings.EmptyNoteTitle[UserSettings.Lang];
        if (!Content) throw MessageBoxStrings.EmptyNoteText[UserSettings.Lang];
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
  ChooseActiveModal();
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
    HideModalBtn.title = "ShortCut : ESC";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();
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
    TitleLabel.innerText = `${Strings.Title[UserSettings.Lang]} : `;
    IDLabel.innerText = `${Strings.ID[UserSettings.Lang]} : `;
    DateLabel.innerText = `${Strings.DateOfCreation[UserSettings.Lang]} : `;

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

    EditBtn.innerText = Strings.Edit[UserSettings.Lang];
    DeleteBtn.innerText = Strings.Delete[UserSettings.Lang];
    CancelEditBtn.innerText = Strings.Cancel[UserSettings.Lang];
    ApplyEditBtn.innerText = Strings.Apply[UserSettings.Lang];

    ApplyEditBtn.title = "ShortCut : CTRL + S";

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
  ChooseActiveModal();
  AddDragEventListenersToModal(`.read-${ID}-modal`);
}

function AccountModal() {
  alert("This feature is experimental it is not completed and functional do not enter your real information!");
  if (document.querySelector(".account-modal")) return;

  const Modal = document.createElement("section");
  Modal.className = "modal account-modal";

  let SignUpInProgressFlag = false;

  const CreateModalTopBar = () => {
    const ModalTopBar = document.createElement("div");
    const HideModalBtn = document.createElement("button");
    const HideModalIcon = document.createElement("img");

    ModalTopBar.className = "modal-top-bar";
    HideModalBtn.className = "close-btn icon";
    HideModalBtn.title = "ShortCut : ESC";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();
      HideModal(".account-modal");
    });

    ModalTopBar.append(HideModalBtn);
    HideModalBtn.append(HideModalIcon);
    Modal.append(HideModalBtn);
  };
  const CreateLoginSection = () => {
    if (document.querySelector(".account-form")) {
      document.querySelector(".account-form").remove();
    }
    let LoginInfo = {
      Email: null,
      UserName: null,
      Password: null,
    };

    const LoginForm = document.createElement("form");
    const Title = document.createElement("div");
    const InputContainer1 = document.createElement("div");
    const InputContainer2 = document.createElement("div");
    const InputContainer1Badge = document.createElement("span");
    const InputContainer2Badge = document.createElement("span");
    const Email_UserNameInput = document.createElement("input");
    const PasswordInput = document.createElement("input");
    const Options = document.createElement("div");
    const CreateAccountOption = document.createElement("a");
    const ForgotPasswordOption = document.createElement("a");
    const LoginBtn = document.createElement("button");

    LoginForm.className = "account-form";
    Title.className = "account-modal-title";
    InputContainer1.className = "input-container";
    InputContainer2.className = "input-container";
    InputContainer1Badge.className = "sticky-badge";
    InputContainer2Badge.className = "sticky-badge";
    Email_UserNameInput.className = "account-input";
    PasswordInput.className = "account-input";
    Options.className = "account-options";
    CreateAccountOption.className = "account-link";
    ForgotPasswordOption.className = "account-link";
    LoginBtn.className = "account-btn";

    Title.innerText = Strings.Login[UserSettings.Lang];
    InputContainer1Badge.innerText = `${Strings.Email[UserSettings.Lang]}/${Strings.UserName[UserSettings.Lang]}`;
    InputContainer2Badge.innerText = `${Strings.Password[UserSettings.Lang]}`;
    CreateAccountOption.innerText = Strings.CreateAccount[UserSettings.Lang];
    ForgotPasswordOption.innerText = Strings.ForgotPassword[UserSettings.Lang];
    LoginBtn.innerText = Strings.Login[UserSettings.Lang];

    Email_UserNameInput.placeholder = `${Strings.Email[UserSettings.Lang]}/${Strings.UserName[UserSettings.Lang]}`;
    PasswordInput.placeholder = `${Strings.Password[UserSettings.Lang]}`;
    LoginBtn.type = "submit";

    Email_UserNameInput.type = "text";
    PasswordInput.type = "password";

    const ViewPasswordBtn = document.createElement("button");
    const ViewPasswordBtnIcon = document.createElement("img");
    ViewPasswordBtn.className = "view-pwd-btn";
    ViewPasswordBtnIcon.className = "view-pwd-btn-icon icon";
    ViewPasswordBtn.type = "button";
    ViewPasswordBtnIcon.setAttribute("inert", "");
    ViewPasswordBtnIcon.src = "../Icons/eye-line.svg";
    ViewPasswordBtn.append(ViewPasswordBtnIcon);
    ViewPasswordBtn.addEventListener("click", function () {
      const Input = this.closest("div").querySelector("input");
      Input.type = Input.type === "text" ? "password" : "text";
      this.querySelector("img").src = Input.type === "text" ? "../Icons/eye-off-line.svg" : "../Icons/eye-line.svg";
    });

    LoginForm.addEventListener("submit", (Event) => {
      Event.preventDefault();
      try {
        if (!Email_UserNameInput || !PasswordInput.value) {
          throw new Error(Strings.FormInputError[UserSettings.Lang]);
        }
        if (Email_UserNameInput.value.includes("@")) {
          if (!EmailRegEx.test(Email_UserNameInput.value)) {
            throw new Error(Strings.EmailFormatError[UserSettings.Lang]);
          }
        } else {
          if (!UserNameRegex.test(Email_UserNameInput.value)) {
            throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
          }
        }
        if (!PasswordRegex.test(PasswordInput.value)) {
          throw new Error(Strings.PasswordFormatError[UserSettings.Lang]);
        }
      } catch (Error) {
        DisplayMessage("Error", Error);
        return;
      }
      if (EmailRegEx.test(Email_UserNameInput.value)) {
        LoginInfo.Email = Email_UserNameInput.value.toLowerCase().trim();
        LoginInfo.UserName = null;
      } else {
        LoginInfo.UserName = Email_UserNameInput.value.toLowerCase().trim();
        LoginInfo.Email = null;
      }
      LoginInfo.Password = PasswordInput.value.trim();
      console.log(LoginInfo);
    });
    CreateAccountOption.addEventListener("click", CreateSignUpSection);
    ForgotPasswordOption.addEventListener("click", CreateForgetPasswordSection);

    LoginForm.append(Title, InputContainer1, InputContainer2, Options, LoginBtn);
    InputContainer1.append(InputContainer1Badge, Email_UserNameInput);
    InputContainer2.append(InputContainer2Badge, PasswordInput, ViewPasswordBtn);
    Options.append(CreateAccountOption, ForgotPasswordOption);
    Modal.append(LoginForm);
  };
  const CreateSignUpSection = () => {
    if (document.querySelector(".account-form")) {
      document.querySelector(".account-form").remove();
    }

    let SignUpInfo = {
      Email: null,
      UserName: null,
      Password: null,
      UserData: null,
    };

    const SignUpForm = document.createElement("form");
    const Title = document.createElement("div");

    const InputContainer1 = document.createElement("div");
    const InputContainer2 = document.createElement("div");
    const InputContainer3 = document.createElement("div");
    const InputContainer4 = document.createElement("div");
    const InputContainer1Badge = document.createElement("span");
    const InputContainer2Badge = document.createElement("span");
    const InputContainer3Badge = document.createElement("span");
    const InputContainer4Badge = document.createElement("span");
    const EmailInput = document.createElement("input");
    const UserNameInput = document.createElement("input");
    const PasswordInput = document.createElement("input");
    const RepeatPasswordInput = document.createElement("input");
    const Options = document.createElement("div");
    const LoginOption = document.createElement("a");
    const SignUpBtn = document.createElement("button");

    SignUpForm.className = "account-form";
    Title.className = "account-modal-title";
    InputContainer1.className = "input-container";
    InputContainer2.className = "input-container";
    InputContainer3.className = "input-container";
    InputContainer4.className = "input-container";
    InputContainer1Badge.className = "sticky-badge";
    InputContainer2Badge.className = "sticky-badge";
    InputContainer3Badge.className = "sticky-badge";
    InputContainer4Badge.className = "sticky-badge";
    EmailInput.className = "account-input";
    UserNameInput.className = "account-input";
    PasswordInput.className = "account-input";
    RepeatPasswordInput.className = "account-input";
    Options.className = "account-options";
    LoginOption.className = "account-link";
    SignUpBtn.className = "account-btn";

    Title.innerText = Strings.SignUp[UserSettings.Lang];
    InputContainer1Badge.innerText = Strings.Email[UserSettings.Lang];
    InputContainer2Badge.innerText = `${Strings.UserName[UserSettings.Lang]}`;
    InputContainer3Badge.innerText = `${Strings.Password[UserSettings.Lang]}`;
    InputContainer4Badge.innerText = `${Strings.RepeatPassword[UserSettings.Lang]}`;
    LoginOption.innerText = Strings.LoginOption[UserSettings.Lang];
    SignUpBtn.innerText = Strings.SignUp[UserSettings.Lang];

    EmailInput.placeholder = Strings.Email[UserSettings.Lang];
    UserNameInput.placeholder = Strings.UserName[UserSettings.Lang];
    PasswordInput.placeholder = Strings.Password[UserSettings.Lang];
    RepeatPasswordInput.placeholder = Strings.RepeatPassword[UserSettings.Lang];
    SignUpBtn.type = "submit";

    EmailInput.type = "email";
    PasswordInput.type = "password";
    RepeatPasswordInput.type = "password";

    SignUpForm.addEventListener("submit", async (Event) => {
      Event.preventDefault();
      if (SignUpInProgressFlag) return;
      CreateWaitningPage();
      try {
        if (!EmailInput || !PasswordInput.value || !RepeatPasswordInput.value || !UserNameInput.value) {
          throw new Error(Strings.FormInputError[UserSettings.Lang]);
        }
        if (!ValidateEmail(EmailInput.value)) {
          throw new Error(Strings.EmailFormatError[UserSettings.Lang]);
        }
        if (!ValidateUserName(UserNameInput.value)) {
          throw new Error(Strings.UserNameFormatError[UserSettings.Lang]);
        }
        if (!ValidatePassword(PasswordInput.value)) {
          throw new Error(Strings.PasswordFormatError[UserSettings.Lang]);
        }
        if (PasswordInput.value !== RepeatPasswordInput.value) {
          throw new Error(Strings.ConfirmPasswordError[UserSettings.Lang]);
        }

        let EmailExist = await DoesEmailExist(EmailInput.value.toLowerCase().trim());
        let UserNameExist = await DoesUserNameExist(UserNameInput.value.toLowerCase().trim());

        if (EmailExist) {
          throw new Error(Strings.EmailExistsError[UserSettings.Lang]);
        }
        if (UserNameExist) {
          throw new Error(Strings.UserNameExistsError[UserSettings.Lang]);
        }
      } catch (Error) {
        DisplayMessage("Error", Error);
        RemoveWaitingPage();
        return;
      }
      SignUpInfo.Email = EmailInput.value.toLowerCase().trim();
      SignUpInfo.UserName = UserNameInput.value.toLowerCase().trim();
      SignUpInfo.Password = PasswordInput.value.trim();
      SignUpInfo.UserData = FetchLocalStorge();
      SignUpInProgressFlag = true;
      SignUp(SignUpInfo)
        .then((Reasponse) => {
          SignUpInProgressFlag = false;
          console.log(Reasponse);
          DisplayMessage("Success", Strings.SignUpSuccessMessage[UserSettings.Lang]);
        })
        .catch((Error) => {
          SignUpInProgressFlag = false;
          console.log(Error);
          DisplayMessage("Error", Error);
        })
        .finally(RemoveWaitingPage);
    });

    const ViewPasswordBtn = document.createElement("button");
    const ViewPasswordBtnIcon = document.createElement("img");
    ViewPasswordBtn.className = "view-pwd-btn";
    ViewPasswordBtnIcon.className = "view-pwd-btn-icon icon";
    ViewPasswordBtn.type = "button";
    ViewPasswordBtnIcon.setAttribute("inert", "");
    ViewPasswordBtnIcon.src = "../Icons/eye-line.svg";
    ViewPasswordBtn.append(ViewPasswordBtnIcon);
    const ViewPasswordBtn1 = ViewPasswordBtn.cloneNode(true);
    const ViewPasswordBtn2 = ViewPasswordBtn.cloneNode(true);
    ViewPasswordBtn1.addEventListener("click", function () {
      const Input = this.closest("div").querySelector("input");
      Input.type = Input.type === "text" ? "password" : "text";
      this.querySelector("img").src = Input.type === "text" ? "../Icons/eye-off-line.svg" : "../Icons/eye-line.svg";
    });
    ViewPasswordBtn2.addEventListener("click", function () {
      const Input = this.closest("div").querySelector("input");
      Input.type = Input.type === "text" ? "password" : "text";
      this.querySelector("img").src = Input.type === "text" ? "../Icons/eye-off-line.svg" : "../Icons/eye-line.svg";
    });

    LoginOption.addEventListener("click", CreateLoginSection);

    SignUpForm.append(Title, InputContainer1, InputContainer2, InputContainer3, InputContainer4, Options, SignUpBtn);
    InputContainer1.append(InputContainer1Badge, EmailInput);
    InputContainer2.append(InputContainer2Badge, UserNameInput);
    InputContainer3.append(InputContainer3Badge, PasswordInput, ViewPasswordBtn1);
    InputContainer4.append(InputContainer4Badge, RepeatPasswordInput, ViewPasswordBtn2);
    Options.append(LoginOption);

    Modal.append(SignUpForm);
  };
  const CreateForgetPasswordSection = () => {
    if (document.querySelector(".account-form")) {
      document.querySelector(".account-form").remove();
    }
    const ForgetPasswordInfo = {
      Email: null,
    };
  };
  const CreateWaitningPage = () => {
    const Page = document.createElement("div");
    const LoadingText = document.createElement("span");
    const Loader = document.createElement("div");

    Page.className = "waiting-page";
    LoadingText.className = "loading-text text";
    LoadingText.innerText = Strings.Loading[UserSettings.Lang];
    Loader.className = "loader";

    Page.append(LoadingText, Loader);
    Modal.append(Page);
  };
  const RemoveWaitingPage = () => {
    const Page = document.querySelector(".account-modal .waiting-page");
    if (Page) {
      Page.remove();
    }
  };

  CreateModalTopBar();
  CreateLoginSection();

  document.body.append(Modal);
  PositionModal(".account-modal");
  ChooseActiveModal();
  AddDragEventListenersToModal(".account-modal");
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
    HideModalBtn.title = "ShortCut : ESC";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();
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

    TitleSection.className = "input-container";
    TitleInput.className = "modal-input new-task-title-input";
    TitleInputBadge.className = "sticky-badge text";
    CharacterLimitTag.className = "character-limit new-task-title-input-charlimit text";

    TitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.Lang];
    TitleInput.maxLength = "70";
    TitleInputBadge.innerText = Strings.Title[UserSettings.Lang];

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
    DateInputBadge.className = "sticky-badge text";

    DateInputBadge.innerText = Strings.Date[UserSettings.Lang];
    DateInput.placeholder = Strings.TaskDateInputPlaceHolder[UserSettings.Lang];
    DateInput.setAttribute("readonly", "");

    DateInput.addEventListener("click", () => {
      SetupTargetInput(".new-task-date-input");
      ToggleDatePicker(".new-task-date-input");
    });

    let DateInputAttributeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-numericdate") {
          NewTaskInfo.Date = Number(DateInput.dataset.numericdate);
        }
      });
    });
    DateInputAttributeObserver.observe(DateInput, {
      attributes: true,
      attributeFilter: ["data-numericdate"],
    });

    DateSection.append(DateInputBadge, DateInput);
    InputsContainer.append(DateSection);
  };
  const CreateCategorySection = () => {
    let SelectBoxOptions = [];
    UserCategoriesArray.forEach((Category) => {
      SelectBoxOptions.push({ Name: Category.Name, Value: Category.ID });
    });
    let DefualtOption = SelectBoxOptions.find((Option) => {
      return Option.Value === AppObj.SelectedUserCategory;
    });

    const CategorySelectBox = ReturnSelectBox(SelectBoxOptions, "task-modal-select-box", DefualtOption, true, false);
    const TaskCategorySection = document.createElement("section");
    const TaskCategorySectionBadge = document.createElement("span");

    TaskCategorySection.className = "select-category-section";
    TaskCategorySectionBadge.className = "sticky-badge text";

    TaskCategorySectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.Lang];

    TaskCategorySection.append(TaskCategorySectionBadge, CategorySelectBox);

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
    ConfirmBtn.title = "ShortCut : Enter";

    ButtonContainer.style.order = "3";
    ConfirmBtn.innerText = Strings.Create[UserSettings.Lang];
    CancelBtn.innerText = Strings.Return[UserSettings.Lang];

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
  SetupTargetInput(".new-task-date-input");
  if (AppObj.CurrentWindow.includes("Today")) {
    LoadToday();
  } else if (AppObj.CurrentWindow.includes("Tomorrow")) {
    LoadTomorrow();
  } else if (AppObj.CurrentWindow.includes("In2Days")) {
    LoadIn2Days();
  } else {
    LoadToday();
  }
  PositionModal(".new-task-modal");
  ChooseActiveModal();
  AddDragEventListenersToModal(".new-task-modal");
  CharacterLimit(".new-task-title-input-charlimit", ".new-task-title-input");
}
function EditTaskModal(ID) {
  if (document.querySelector(".edit-task-modal")) return;

  AppObj.EditMode = true;

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
    HideModalBtn.title = "ShortCut : ESC";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();

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

    TitleSection.className = "input-container";
    TitleInput.className = "modal-input edit-task-title-input";
    TitleInputBadge.className = "sticky-badge text";
    CharacterLimitTag.className = "character-limit edit-task-title-input-charlimit text";

    TitleInput.placeholder = Strings.TaskTitleInputPlaceHolder[UserSettings.Lang];
    TitleInput.maxLength = "70";
    TitleInputBadge.innerText = Strings.Title[UserSettings.Lang];
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
    DateInputBadge.className = "sticky-badge text";

    DateInputBadge.innerText = Strings.Date[UserSettings.Lang];
    DateInput.placeholder = Strings.TaskDateInputPlaceHolder[UserSettings.Lang];
    DateInput.setAttribute("readonly", "");
    DateInput.addEventListener("click", () => {
      SetupTargetInput(".edit-task-date-input");
      ToggleDatePicker(".edit-task-date-input", TaskInfo.Date);
    });

    let DateInputAttributeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-numericdate") {
          TaskInfo.Date = Number(DateInput.dataset.numericdate);
        }
      });
    });
    DateInputAttributeObserver.observe(DateInput, {
      attributes: true,
      attributeFilter: ["data-numericdate"],
    });

    DateSection.append(DateInputBadge, DateInput);
    InputsContainer.append(DateSection);
  };
  const CreateCategorySection = () => {
    let SelectBoxOptions = [];
    UserCategoriesArray.forEach((Category) => {
      SelectBoxOptions.push({ Name: Category.Name, Value: Category.ID });
    });
    let DefualtOption = SelectBoxOptions.find((Option) => {
      return Option.Value === TaskInfo.Category;
    });

    const CategorySelectBox = ReturnSelectBox(SelectBoxOptions, "task-modal-select-box", DefualtOption, true, false);
    const TaskCategorySection = document.createElement("section");
    const TaskCategorySectionBadge = document.createElement("span");

    TaskCategorySection.className = "select-category-section";
    TaskCategorySectionBadge.className = "sticky-badge text";

    TaskCategorySectionBadge.innerText = Strings.SelectCategoryBadge[UserSettings.Lang];

    TaskCategorySection.append(TaskCategorySectionBadge, CategorySelectBox);

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
    ConfirmBtn.title = "ShortCut : Enter";

    ButtonContainer.style.order = "3";
    ConfirmBtn.innerText = Strings.Edit[UserSettings.Lang];
    CancelBtn.innerText = Strings.Return[UserSettings.Lang];

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
      AppObj.EditMode = false;
    });
    CancelBtn.addEventListener("click", function () {
      HideModal(".edit-task-modal");
      AppObj.EditMode = false;
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

  SetupTargetInput(".edit-task-date-input");
  LoadCustomDate(TaskInfo.Date);
  PositionModal(".edit-task-modal");
  ChooseActiveModal();
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
    HideModalBtn.title = "ShortCut : ESC";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();

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
    TitleInputBadge.className = "sticky-badge text";
    TitleInput.className = "new-category-title-input modal-input";
    CharacterLimitTag.className = "character-limit new-category-title-input-charlimit text";

    InputContainer.style.order = "2";
    TitleInputBadge.innerText = Strings.Name[UserSettings.Lang];
    TitleInput.placeholder = Strings.WriteAName[UserSettings.Lang];
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
    ColorsContainer.style.gridTemplateColumns = `repeat(${CategoryColors.length},1fr)`;
    PickColorBadge.innerText = Strings.PickColorBadge[UserSettings.Lang];
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
    IconsContainer.style.gridTemplateColumns = `repeat(${CategoryIcons.length},1fr)`;
    PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.Lang];
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
      CategoryIcon.className = "pick-category-icon icon";
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
    ConfirmBtn.title = "ShortCut : Enter";

    ButtonContainer.style.order = "5";
    ConfirmBtn.innerText = Strings.Create[UserSettings.Lang];
    CancelBtn.innerText = Strings.Return[UserSettings.Lang];

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
  ChooseActiveModal();
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
    HideModalBtn.title = "ShortCut : ESC";

    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();

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
    TitleInputBadge.className = "sticky-badge text";
    TitleInput.className = "edit-category-title-input modal-input";
    CharacterLimitTag.className = "character-limit edit-category-title-input-charlimit text";

    TitleInputBadge.innerText = Strings.Name[UserSettings.Lang];
    TitleInput.placeholder = Strings.WriteAName[UserSettings.Lang];
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

    ColorsContainer.style.gridTemplateColumns = `repeat(${CategoryColors.length},1fr)`;
    PickColorBadge.innerText = Strings.PickColorBadge[UserSettings.Lang];
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

    IconsContainer.style.gridTemplateColumns = `repeat(${CategoryIcons.length},1fr)`;
    PickIconBadge.innerText = Strings.PickIconBadge[UserSettings.Lang];
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
      CategoryIcon.className = "pick-category-icon icon";
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
    ConfirmBtn.title = "ShortCut : Enter";

    ConfirmBtn.innerText = Strings.Edit[UserSettings.Lang];
    CancelBtn.innerText = Strings.Return[UserSettings.Lang];

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
  ChooseActiveModal();
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
    HideModalBtn.title = "ShortCut : ESC";

    ModalTopBar.style.order = "1";
    HideModalIcon.src = "../Icons/close-large-line.svg";

    HideModalBtn.addEventListener("click", function (Event) {
      Event.stopPropagation();

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
    InsertBackUpFileText.innerText = Strings.InsertBackUpFile[UserSettings.Lang];
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
    const ReturnButtonText = Strings.Return[UserSettings.Lang];
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

    InsertBackUpTextText.innerText = Strings.InsertBackUpText[UserSettings.Lang];
    RestoreButton.innerText = Strings.RestoreTask[UserSettings.Lang];
    ModalTitle.innerText = Strings.RestoreFromText[UserSettings.Lang];
    ModalDescription.innerText = Strings.RestoreFromTextDescription[UserSettings.Lang];

    ModalTextArea.placeholder = Strings.InsertBackUpTextPlaceHolder[UserSettings.Lang];
    InsertBackUpTextIcon.src = "";
    RestoreButton.title = "ShortCut : Enter";

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
    GenerateBackUpFileText.innerText = Strings.GenerateBackUpFile[UserSettings.Lang];
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
    const ReturnButtonText = Strings.Return[UserSettings.Lang];
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

    GenerateBackUpTextText.innerText = Strings.GenerateBackUpText[UserSettings.Lang];
    ModalTitle.innerText = Strings.BackUpText[UserSettings.Lang];
    ModalDescription.innerText = Strings.BackUpTextDescription[UserSettings.Lang];
    CopyButton.innerText = Strings.CopyButton[UserSettings.Lang];

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
  ChooseActiveModal();
  AddDragEventListenersToModal(".backup-modal");
}
function ReturnFromModalSubPage() {
  let SubPage = document.querySelector(".modal-sub-page");
  SubPage.remove();
  let ModalButtonContainer = document.querySelector(".backup-modal-options");
  ModalButtonContainer.style.display = "flex";
}

function DeleteModal(Type, ID) {
  if (document.querySelector(".delete-modal")) return;
  const Modal = document.createElement("section");
  Modal.className = "modal delete-modal";

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
  MoveToTrashText.innerText = Strings.MoveToTrashText[UserSettings.Lang];
  ConfirmBtn.innerText = Strings.Delete[UserSettings.Lang];
  CancelBtn.innerText = Strings.Return[UserSettings.Lang];
  ConfirmBtn.title = "ShortCut : Enter";
  HideModalBtn.title = "ShortCut : ESC";

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
      ModalText.innerText = Strings.DeleteText[UserSettings.Lang];
      Modal.append(MoveToTrashContainer);
      ChooseActiveModal();
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
      ModalText.innerText = Strings.DeleteTrashText[UserSettings.Lang];
      ChooseActiveModal();
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
      ModalText.innerText = Strings.DeleteCategoryText[UserSettings.Lang];
      ChooseActiveModal();
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
  if (Modal) {
    Modal.remove();
    if (Selector.includes(".read-Note")) AppObj.EditNoteMode = false;
    ChooseActiveModal();
  }
}
function CharacterLimit(CharLimitSelector, InputSelector) {
  const CharacterLimitTag = document.querySelector(CharLimitSelector);
  const Input = document.querySelector(InputSelector);
  CharacterLimitTag.innerText = `${PlacePersianNumbers(Input.value.length)}/${PlacePersianNumbers(Input.maxLength)}`;
}
function AddDragEventListenersToModal(Selector) {
  if (!Selector) {
    DisplayMessage("Error", `Invalid selector passed to ChooseActiveModal();AddDragEventListenersToModal() , AppObj.ActiveModalID : ${AppObj.ActiveModalID}`);
    return;
  }
  const Modal = document.querySelector(Selector);
  let Timer;
  Modal.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((AnotherModal) => {
      AnotherModal.classList.remove("active");
    });
    Modal.classList.add("active");
  });

  Modal.addEventListener("mousedown", (Event) => {
    if (!Event.target.className.includes("modal")) return;
    Timer = setTimeout(() => {
      AppObj.DragModalMode = true;
      AppObj.ActiveModalID = Selector;
      document.querySelectorAll("*").forEach((Element) => {
        Element.classList.add("disable-selection");
      });
    }, 180);
  });
  document.addEventListener("mouseup", () => {
    clearTimeout(Timer);
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
function ChooseActiveModal() {
  // This function decides witch is the active modal out of all of them being open
  let Modals = Array.from(document.querySelectorAll(".modal"));
  Modals.forEach((Modal) => {
    if (Modals.indexOf(Modal) === Modals.length - 1) {
      Modal.classList.add("active");
    } else {
      Modal.classList.remove("active");
    }
  });
}
