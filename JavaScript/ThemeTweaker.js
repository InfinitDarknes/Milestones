function ThemeTweakerModal() {
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
  HideModalBtn.addEventListener("click", HideModal);
  // Finaly
  HideModalBtn.append(HideModalIcon);
  ButtonContainer.append(ApplyButton, DefualtPalletButton, DeleteThemeBtn);
  ThemeTweakerModal.append(HideModalBtn, ThemeBar, Options, ButtonContainer);
  document.body.append(ThemeTweakerModal);
  CreateThemeBar();
  CreateThemeModeOptions();
  AddDragEventListenersToModal();
  HighLightSelectedThemeBtn(`${SelectedTheme.toLowerCase()}-theme-btn`);
}
function HighLightSelectedThemeBtn(ID) {
  const ThemeBtns = document.querySelectorAll(".theme-bar-btn");
  ThemeBtns.forEach((Button) => {
    if (Button.id === ID) Button.classList.add("hovered");
    else Button.classList.remove("hovered");
  });
}
