let AppElementsObj = {
  PreLoader: {
    Selector: ".preloader",
    Themes: {
      Dark: {
        BgColor: "#323232",
      },
      Light: {
        BgColor: "#c0c0c0",
      },
    },
  },
  Body: {
    Selector: "body",
    Themes: {
      Dark: {
        BgColor: "#323232",
      },
      Light: {
        BgColor: "#c0c0c0",
      },
    },
  },
  Background: {
    Selector: ".window,.top-bar,.side-bar",
    Themes: {
      Dark: {
        BgColor: "#1d2229",
      },
      Light: {
        BgColor: "#ffffff",
      },
    },
  },
  Icons: {
    Selector: ".icon",
    Themes: {
      Dark: {
        Color: "#c0c0c0",
      },
      Light: {
        Color: "#ffff80",
      },
    },
  },
  Text: {
    Themes: {
      Dark: {
        Color: "#c0c0c0",
      },
      Light: {
        Color: "#1a1b1d",
      },
    },
    Selector: ".text",
  },
  Hovered: {
    Selector: ".hovered",
    Themes: {
      Dark: {
        BgColor: "#F05454",
      },
      Light: {
        BgColor: "#FFC069",
      },
    },
  },
  SidebarItems: {
    Selector: ".side-bar-item",
    Themes: {
      Dark: {
        BgColor: "#171717",
        Hover: {
          BgColor: "#f05454",
        },
      },
      Light: {
        BgColor: "#DAD6D6",
        Hover: {
          BgColor: "#FFC069",
        },
      },
    },
  },
  SortBarBtns: {
    Selector: ".sort-buttons",
    Themes: {
      Dark: {
        BgColor: "#171717",
        Hover: {
          BgColor: "#F05454",
          Scale: "1.1",
          Transition: "500ms",
        },
      },
      Light: {
        BgColor: "#DAD6D6",
        Hover: {
          BgColor: "#FFC069",
          Scale: "1.1",
          Transition: "500ms",
        },
      },
    },
  },
  SearchInput: {
    Selector: ".search-bar",
    Themes: {
      Dark: {
        BgColor: "#171717",
      },
      Light: {
        BgColor: "#DAD6D6",
      },
    },
  },
  TaskElement: {
    Selector: ".task-container",
    Themes: {
      Dark: {
        BgColor: "#393E46",
        Color: "#c0c0c0",
      },
      Light: {
        BgColor: "#DAD6D6",
        Color: "#1B1A1D",
      },
    },
  },
  TaskTitle: {
    Selector: ".task-title",
    Themes: {
      Dark: {
        Color: "#c0c0c0",
      },
      Light: {
        Color: "#1a1b1d",
      },
    },
  },
  CompletedTaskBadge: {
    Selector: ".completed-task-badge",
    Order: null,
    Themes: {
      Dark: {
        BgColor: "#393E46",
      },
      Light: {
        BgColor: "#DAD6D6",
      },
    },
  },
  FailedTaskBadge: {
    Selector: ".failed-task-badge",
    Order: null,
    Themes: {
      Dark: {
        BgColor: "#393E46",
      },
      Light: {
        BgColor: "#DAD6D6",
        Color: "#1B1A1D",
      },
    },
  },
  TrashedTaskBadge: {
    Selector: ".trashed-task-badge",
    Order: null,
    Themes: {
      Dark: {
        BgColor: "#393E46",
      },
      Light: {
        BgColor: "#DAD6D6",
      },
    },
  },
  TaskDateAndTimeContainer: {
    Selector: ".date-container",
    Themes: {
      Dark: {
        BgColor: "#F05454",
      },
      Light: {
        BgColor: "#FFC069",
      },
    },
  },
  ContextMenu: {
    Selector: ".context-menu",
    Themes: {
      Dark: {
        BgColor: "#1B1A1D",
      },
      Light: {
        BgColor: "#F3EAD3",
      },
    },
  },
  ContextMenuItem: {
    Selector: ".context-menu-item",
    Themes: {
      Dark: {
        BgColor: "#1B1A1D",
        Hover: {
          BgColor: "#F05454",
          Scale: "",
          Transition: "500ms",
        },
      },
      Light: {
        BgColor: "#F3EAD3",
        Hover: {
          BgColor: "#FFC069",
          Scale: "",
          Transition: "500ms",
        },
      },
    },
  },
  WindowHeader: {
    Selector: ".window-header",
    Themes: {
      Dark: {
        BgColor: "#1b1a1d",
      },
      Light: {
        BgColor: "#DAD6D6",
      },
    },
  },
  SelectBar: {
    Selector: ".select-bar",
    Themes: {
      Dark: {
        BgColor: "#1d2229",
        BorderColor: "#323232",
      },
      Light: {
        BgColor: "#F3EAD3",
        BorderColor: "#c0c0c0",
      },
    },
  },
  SelectBarBtns: {
    Selector: ".select-bar-task-btn",
    Themes: {
      Dark: {
        BgColor: "#171717",
        Hover: {
          BgColor: "#F05454",
          Scale: "",
          Transition: "500ms",
        },
      },
      Light: {
        BgColor: "#DAD6D6",
        Hover: {
          BgColor: "#FFC069",
          Scale: "",
          Transition: "500ms",
        },
      },
    },
  },
  ExitFromSelectModeBtn: {
    Selector: ".exit-select-mode-btn",
    Themes: {
      Dark: {
        BgColor: "#FE4545",
      },
      Light: {
        BgColor: "#FE4545",
      },
    },
  },
  SettingsContainer: {
    Selector: ".settings-container",
    Themes: {
      Dark: {
        BgColor: "#1d2229",
        BorderColor: "#323232",
      },
      Light: {
        BgColor: "#393E46",
        BorderColor: "#c0c0c0",
      },
    },
  },
  SettingsHeader: {
    Selector: ".settings-header",
    Themes: {
      Dark: {
        BorderColor: "#323232",
      },
      Light: {
        BorderColor: "#c0c0c0",
      },
    },
  },
  SettingsTitle: {
    Selector: ".settings-title",
    Themes: {
      Dark: {
        Color: "#c0c0c0",
      },
      Light: {
        Color: "#1a1b1d",
      },
    },
  },
  SettingsItem: {
    Selector: ".setting-item",
    Themes: {
      Dark: {
        BgColor: "#171717",
      },
      Light: {
        BgColor: "#FE4545",
      },
    },
  },
  SettingsSubTitle: {
    Selector: ".setting-title",
    Themes: {
      Dark: {
        Color: "#c0c0c0",
      },
      Light: {
        Color: "#FE4545",
      },
    },
  },
  SettingsItemSelectBox: {
    Selector: ".setting-select-box",
    Themes: {
      Dark: {
        BgColor: "#c0c0c0",
        Color: "#171717",
      },
      Light: {
        BgColor: "#c0c0c0",
        Color: "#171717",
      },
    },
  },
  SettingsItemOption: {
    Selector: ".setting-select-box option",
    Themes: {
      Dark: {
        Color: "#171717",
      },
      Light: {
        Color: "#171717",
      },
    },
  },
  Modal: {
    Selector: ".modal",
    Themes: {
      Dark: {
        BgColor: "#c0c0c0",
      },
      Light: {
        BgColor: "#ffff80",
      },
    },
  },
  ModalInput: {
    Selector: ".modal-input",
    Themes: {
      Dark: {
        BgColor: "#c0c0c0",
      },
      Light: {
        BgColor: "#ffff80",
      },
    },
  },
  StickyInputBadge: {
    Selector: ".sticky-badge",
    Themes: {
      Dark: {
        BgColor: "#c0c0c0",
        Color: "",
      },
      Light: {
        BgColor: "#ffff80",
        Color: "",
      },
    },
  },
  CharacterLimit: {
    Selector: ".sticky-badge",
    Themes: {
      Dark: {
        BgColor: "#c0c0c0",
        Color: "",
      },
      Light: {
        BgColor: "#ffff80",
        Color: "",
      },
    },
  },
  ModalTitle: {
    Selector: ".modal-title",
    Themes: {
      Dark: {
        Color: "",
        BorderColor: "",
      },
      Light: {
        Color: "",
        BorderColor: "",
      },
    },
  },
  GreenOrConfirmBtn: {
    Selector: ".green-btn",
    Themes: {
      Dark: {
        BgColor: "#",
      },
      Light: {
        BgColor: "#",
      },
    },
  },
  RedOrCancelBtn: {
    Selector: ".red-btn",
    Themes: {
      Dark: {
        BgColor: "#",
      },
      Light: {
        BgColor: "#",
      },
    },
  },
  ModalTextArea: {
    Selector: ".modal-text-area",
    Themes: {
      Dark: {
        BgColor: "#",
        Color: "#",
      },
      Light: {
        BgColor: "#",
        Color: "#",
      },
    },
  },
  ModalBtn: {
    Selector: ".modal-button",
    Themes: {
      Dark: {
        BgColor: "#",
      },
      Light: {
        BgColor: "#",
      },
    },
  },
  NoteContainer: {
    Selector: ".note-container",
    Themes: {
      Dark: {
        BgColor: "#",
      },
      Light: {
        BgColor: "#",
      },
    },
  },
  NoteTitle: {
    Selector: ".note-title",
    Themes: {
      Dark: {
        BgColor: "#",
        Color: "#",
      },
      Light: {
        BgColor: "#",
        Color: "#",
      },
    },
  },
  NoteText: {
    Selector: ".note-text",
    Themes: {
      Dark: {
        Color: "#",
      },
      Light: {
        Color: "#",
      },
    },
  },
  ViewNoteBtn: {
    Selector: ".view-note-btn",
    Themes: {
      Dark: {
        BgColor: "#",
        Color: "#",
      },
      Light: {
        BgColor: "#",
        Color: "#",
      },
    },
  },
  MessageBox: {
    Selector: ".msg-box",
    Order: null,
    Themes: {
      Dark: {
        BgColor: "#F05454",
        Color: "#dad6d6",
      },
      Light: {
        BgColor: "#",
        Color: "#",
      },
    },
  },
  MessageTypeBox: {
    Selector: ".msg-type-wrapper",
    Order: null,
    Themes: {
      Dark: {
        BgColor: "#F05454",
      },
      Light: {
        BgColor: "#",
      },
    },
  },
  ErrorMessage: {
    Selector: ".error.msg-type-text",
    Order: null,
    Themes: {
      Dark: {
        Color: "#dad6d6",
      },
      Light: {
        Color: "#",
      },
    },
  },
  SuccessMessage: {
    Selector: ".success.msg-type-text",
    Order: null,
    Themes: {
      Dark: {
        Color: "#dad6d6",
      },
      Light: {
        Color: "#",
      },
    },
  },
};
function ThemeTweakerModal() {
  // Reqs
  let AppElementsObjClone = { ...AppElementsObj };
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
    for (let i in AppElementsObj) {
      const Row = document.createElement("div");
      const RowLabel = document.createElement("span");
      let BgColor = AppElementsObj[i]?.Themes[SelectedTheme]?.BgColor;
      let Color = AppElementsObj[i]?.Themes[SelectedTheme]?.Color;
      let BorderColor = AppElementsObj[i]?.Themes[SelectedTheme]?.BorderColor;
      let Hover = AppElementsObj[i]?.Themes[SelectedTheme]?.Hover?.BgColor;
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
          document.querySelectorAll(AppElementsObj[i].Selector).forEach((Element) => {
            Element.style.backgroundColor = BgColorPicker.value;
          });
          AppElementsObjClone[i].Themes[SelectedTheme].BgColor = BgColorPicker.value;
          BgColorInput.value = BgColorPicker.value;
        });
        BgColorInput.addEventListener("input", () => {
          if (BgColorInput.value.match(ValidColorFormat)) {
            document.querySelectorAll(AppElementsObj[i].Selector).forEach((Element) => {
              Element.style.backgroundColor = BgColorInput.value;
            });
            AppElementsObjClone[i].Themes[SelectedTheme].BgColor = BgColorInput.value;
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
          document.querySelectorAll(AppElementsObj[i].Selector).forEach((Element) => {
            Element.style.color = ColorPicker.value;
          });
          AppElementsObjClone[i].Themes[SelectedTheme].Color = ColorPicker.value;
          ColorInput.value = ColorPicker.value;
        });
        ColorInput.addEventListener("input", () => {
          if (ColorInput.value.match(ValidColorFormat)) {
            AppElementsObjClone[i].Themes[SelectedTheme].Color = ColorInput.value;
            ColorPicker.value = ColorInput.value;
            let FilterForSvg = HexToFilter(ColorInput.value);
            document.querySelectorAll(AppElementsObj[i].Selector).forEach((Element) => {
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
          document.querySelectorAll(AppElementsObj[i].Selector).forEach((Element) => {
            Element.style.borderColor = BorderColorPicker.value;
          });
          AppElementsObjClone[i].Themes[SelectedTheme].BorderColor = BorderColorPicker.value;
          BorderColorInput.value = BorderColorPicker.value;
        });
        BorderColorInput.addEventListener("input", () => {
          if (BorderColorInput.value.match(ValidColorFormat)) {
            AppElementsObjClone[i].Themes[SelectedTheme].BorderColor = BorderColorInput.value;
            BorderColorPicker.value = BorderColorInput.value;
            document.querySelectorAll(AppElementsObj[i].Selector).forEach((Element) => {
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
          AppElementsObjClone[i].Themes[SelectedTheme].Hover.BgColor = HoverBgColorPicker.value;
          HoverBgColorInput.value = HoverBgColorPicker.value;
        });
        HoverBgColorInput.addEventListener("input", () => {
          if (HoverBgColorInput.value.match(ValidColorFormat)) {
            AppElementsObjClone[i].Themes[SelectedTheme].Hover.BgColor = HoverBgColorInput.value;
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
    for (let i in AppElementsObjClone) {
      AppElementsObjClone[i].Themes[Name] = AppElementsObjClone[i].Themes.Dark;
    }
    AppObj.Themes.push(Name);
    SelectedTheme = Name;
    ApplyNewTheme();
    CreateThemeBar();
    CreateThemeModeOptions();
    HighLightSelectedThemeBtn(`${SelectedTheme}-theme-btn`);
  };
  const ApplyNewTheme = () => {
    localStorage.setItem("AppElementsObjClone", JSON.stringify(AppElementsObjClone));
    localStorage.setItem("Themes", JSON.stringify(AppObj.Themes));
  };
  const DeleteTheme = (Theme) => {
    if (Theme === "Dark" || Theme === "Light") {
      DisplayMessage("Error", `${Theme} is a defualt theme and can not be deleted`);
      return;
    }
    for (let i in AppElementsObjClone) {
      delete AppElementsObjClone[i].Themes[Theme];
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
    ApplyNewTheme();
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
  ApplyButton.addEventListener("click", ApplyNewTheme);
  DefualtPalletButton.addEventListener("click", () => {
    localStorage.removeItem("AppElementsObjClone");
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
function HexToFilter(hex) {
  class Color {
    constructor(r, g, b) {
      this.set(r, g, b);
    }

    toString() {
      return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    set(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
      angle = (angle / 180) * Math.PI;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      this.multiply([
        0.213 + cos * 0.787 - sin * 0.213,
        0.715 - cos * 0.715 - sin * 0.715,
        0.072 - cos * 0.072 + sin * 0.928,
        0.213 - cos * 0.213 + sin * 0.143,
        0.715 + cos * 0.285 + sin * 0.14,
        0.072 - cos * 0.072 - sin * 0.283,
        0.213 - cos * 0.213 - sin * 0.787,
        0.715 - cos * 0.715 + sin * 0.715,
        0.072 + cos * 0.928 + sin * 0.072,
      ]);
    }

    grayscale(value = 1) {
      this.multiply([
        0.2126 + 0.7874 * (1 - value),
        0.7152 - 0.7152 * (1 - value),
        0.0722 - 0.0722 * (1 - value),
        0.2126 - 0.2126 * (1 - value),
        0.7152 + 0.2848 * (1 - value),
        0.0722 - 0.0722 * (1 - value),
        0.2126 - 0.2126 * (1 - value),
        0.7152 - 0.7152 * (1 - value),
        0.0722 + 0.9278 * (1 - value),
      ]);
    }

    sepia(value = 1) {
      this.multiply([
        0.393 + 0.607 * (1 - value),
        0.769 - 0.769 * (1 - value),
        0.189 - 0.189 * (1 - value),
        0.349 - 0.349 * (1 - value),
        0.686 + 0.314 * (1 - value),
        0.168 - 0.168 * (1 - value),
        0.272 - 0.272 * (1 - value),
        0.534 - 0.534 * (1 - value),
        0.131 + 0.869 * (1 - value),
      ]);
    }

    saturate(value = 1) {
      this.multiply([
        0.213 + 0.787 * value,
        0.715 - 0.715 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 + 0.285 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 - 0.715 * value,
        0.072 + 0.928 * value,
      ]);
    }

    multiply(matrix) {
      const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    }

    brightness(value = 1) {
      this.linear(value);
    }
    contrast(value = 1) {
      this.linear(value, -(0.5 * value) + 0.5);
    }

    linear(slope = 1, intercept = 0) {
      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
      this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
    }

    hsl() {
      // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
      const r = this.r / 255;
      const g = this.g / 255;
      const b = this.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return {
        h: h * 100,
        s: s * 100,
        l: l * 100,
      };
    }

    clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }
      return value;
    }
  }
  class Solver {
    constructor(target, baseColor) {
      this.target = target;
      this.targetHSL = target.hsl();
      this.reusedColor = new Color(0, 0, 0);
    }

    solve() {
      const result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values),
      };
    }

    solveWide() {
      const A = 5;
      const c = 15;
      const a = [60, 180, 18000, 600, 1.2, 1.2];

      let best = { loss: Infinity };
      for (let i = 0; best.loss > 25 && i < 3; i++) {
        const initial = [50, 20, 3750, 50, 100, 100];
        const result = this.spsa(A, a, c, initial, 1000);
        if (result.loss < best.loss) {
          best = result;
        }
      }
      return best;
    }

    solveNarrow(wide) {
      const A = wide.loss;
      const c = 2;
      const A1 = A + 1;
      const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
      const alpha = 1;
      const gamma = 0.16666666666666666;

      let best = null;
      let bestLoss = Infinity;
      const deltas = new Array(6);
      const highArgs = new Array(6);
      const lowArgs = new Array(6);

      for (let k = 0; k < iters; k++) {
        const ck = c / Math.pow(k + 1, gamma);
        for (let i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }

        const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
        for (let i = 0; i < 6; i++) {
          const g = (lossDiff / (2 * ck)) * deltas[i];
          const ak = a[i] / Math.pow(A + k + 1, alpha);
          values[i] = fix(values[i] - ak * g, i);
        }

        const loss = this.loss(values);
        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }
      return { values: best, loss: bestLoss };

      function fix(value, idx) {
        let max = 100;
        if (idx === 2 /* saturate */) {
          max = 7500;
        } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
          max = 200;
        }

        if (idx === 3 /* hue-rotate */) {
          if (value > max) {
            value %= max;
          } else if (value < 0) {
            value = max + (value % max);
          }
        } else if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }
        return value;
      }
    }

    loss(filters) {
      // Argument is array of percentages.
      const color = this.reusedColor;
      color.set(0, 0, 0);

      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);

      const colorHSL = color.hsl();
      return (
        Math.abs(color.r - this.target.r) +
        Math.abs(color.g - this.target.g) +
        Math.abs(color.b - this.target.b) +
        Math.abs(colorHSL.h - this.targetHSL.h) +
        Math.abs(colorHSL.s - this.targetHSL.s) +
        Math.abs(colorHSL.l - this.targetHSL.l)
      );
    }

    css(filters) {
      function fmt(idx, multiplier = 1) {
        return Math.round(filters[idx] * multiplier);
      }
      return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
    }
  }
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  }

  const rgb = hexToRgb(hex.toString());
  if (rgb.length !== 3) {
    DisplayMessage("Error", "Invalid format passed to HexToFilter() function");
    return;
  }
  const color = new Color(rgb[0], rgb[1], rgb[2]);
  const solver = new Solver(color);
  const result = solver.solve();
  return result.filter;
}
