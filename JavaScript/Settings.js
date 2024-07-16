let UserSettings = {
  Lang: "en",
  Calendar: "Gregorian",
  Brightness: 100,
  Theme: "Dark",
  BgAnimation: "Particle",
  Wallpaper: "Wallpapers/NSFWBG.jpg",
};
function DisplaySettings() {
  if (document.querySelector(".settings-container")) return;
  const SettingsContainer = document.createElement("section");
  const SettingItemsContainer = document.createElement("section");
  SettingItemsContainer.className = "setting-items-container";
  SettingsContainer.className = "settings-container";
  // Setting Title and hide setting button
  const SettingHeader = document.createElement("header");
  const SettingTitle = document.createElement("span");
  const HideSettingButton = document.createElement("button");
  const HideSettingButtonIcon = document.createElement("img");
  SettingHeader.className = "settings-header";
  SettingTitle.className = "settings-title";
  HideSettingButton.className = "hide-settings-button";
  HideSettingButtonIcon.className = "hide-settings-button-icon icon";
  SettingTitle.innerText = Strings.SettingTitle[UserSettings.Lang];
  HideSettingButtonIcon.src = "../Icons/close-large-line.svg";
  HideSettingButton.addEventListener("click", HideSettings);
  SettingHeader.append(SettingTitle, HideSettingButton);
  HideSettingButton.append(HideSettingButtonIcon);
  SettingsContainer.append(SettingHeader, SettingItemsContainer);
  document.body.append(SettingsContainer);
  const ReturnBrightnessSettings = () => {
    const BrightnessSettingContainer = document.createElement("section");
    const BrightnessSettingTitle = document.createElement("span");
    const BrightnessBar = document.createElement("input");
    BrightnessSettingContainer.className = "setting-item";
    BrightnessSettingTitle.className = "setting-title";
    BrightnessBar.id = "brightness-bar";
    BrightnessBar.type = "range";
    BrightnessBar.min = "10";
    BrightnessBar.max = "100";
    BrightnessBar.value = UserSettings.Brightness;
    BrightnessSettingTitle.innerText = Strings.Brightness[UserSettings.Lang];
    BrightnessSettingTitle.id = "language-setting-title";
    BrightnessBar.id = "brightness-bar";
    BrightnessBar.addEventListener("input", () => {
      ChangeBrightness(BrightnessBar.value);
    });
    BrightnessSettingContainer.append(BrightnessSettingTitle, BrightnessBar);
    return BrightnessSettingContainer;
  };
  const ReturnLangSettings = () => {
    const LangSettingOptions = [
      {
        Name: "English",
        Value: "en",
      },
      {
        Name: "پارسی",
        Value: "fa",
      },
    ];
    const DefualtOption = LangSettingOptions.find((Option) => {
      return Option.Value === UserSettings.Lang;
    });
    const LanguageSettingContainer = document.createElement("section");
    const LanguageSettingTitle = document.createElement("span");
    const LanguageSettingSelectBox = ReturnSelectBox(LangSettingOptions, "settings-select-box language-select-box", DefualtOption, false, LanguageSwitcher);
    LanguageSettingContainer.className = "setting-item";
    LanguageSettingTitle.className = "setting-title";
    LanguageSettingTitle.innerText = Strings.LanguageSetting[UserSettings.Lang];
    LanguageSettingContainer.append(LanguageSettingTitle, LanguageSettingSelectBox);
    return LanguageSettingContainer;
  };
  const ReturnDatePickerSettings = () => {
    const DatePickerSettingOptions = [
      {
        Name: Strings.SolarOption[UserSettings.Lang],
        Value: "Solar",
      },
      { Name: Strings.GregorianOption[UserSettings.Lang], Value: "Gregorian" },
    ];
    const DefualtOption = DatePickerSettingOptions.find((Option) => {
      return Option.Value === UserSettings.Calendar;
    });
    const DatePickerSettingContainer = document.createElement("section");
    const DatePickerSettingTitle = document.createElement("span");
    const DatePickerSettingSelectBox = ReturnSelectBox(DatePickerSettingOptions, "settings-select-box date-picker-select-box", DefualtOption, false, DatePickerSwitcher);
    DatePickerSettingContainer.className = "setting-item";
    DatePickerSettingTitle.className = "setting-title";
    DatePickerSettingTitle.id = "date-picker-setting-title";
    DatePickerSettingTitle.innerText = Strings.DatePickerSetting[UserSettings.Lang];
    DatePickerSettingContainer.append(DatePickerSettingTitle, DatePickerSettingSelectBox);
    return DatePickerSettingContainer;
  };
  const ReturnThemeSettings = () => {
    let ThemeSettingOptions = [];
    AppObj.Themes.forEach((Theme) => {
      ThemeSettingOptions.push({
        Name: Theme,
        Value: Theme,
      });
    });
    const DefualtOption = ThemeSettingOptions.find((Option) => {
      return Option.Value === UserSettings.Theme;
    });
    const ThemeSettingContainer = document.createElement("section");
    const ThemeSettingTitle = document.createElement("span");
    const ThemeSettingSelectBox = ReturnSelectBox(ThemeSettingOptions, "settings-select-box theme-select-box", DefualtOption, false, ThemeSwitcher);
    ThemeSettingContainer.className = "setting-item";
    ThemeSettingTitle.className = "setting-title";
    ThemeSettingTitle.innerText = Strings.Theme[UserSettings.Lang];
    ThemeSettingContainer.append(ThemeSettingTitle, ThemeSettingSelectBox);
    return ThemeSettingContainer;
  };
  const ReturnBackgroundAnimationSettings = () => {
    let BgAnimationOptions = [
      { Name: Strings.Particle[UserSettings.Lang], Value: "Particle" },
      // { Name: Strings.Snow[UserSettings.Lang], Value: "Snow" },
      // { Name: Strings.Nasa[UserSettings.Lang], Value: "Nasa" },
      // { Name: Strings.Bubble[UserSettings.Lang], Value: "Bubble" },
    ];
    const DefualtOption = BgAnimationOptions.find((Option) => {
      return Option.Value === UserSettings.BgAnimation;
    });
    const BgAnimationContainer = document.createElement("section");
    const BgAnimationTitle = document.createElement("span");
    const BgAnimationSelectBox = ReturnSelectBox(BgAnimationOptions, "settings-select-box theme-select-box", DefualtOption, true, BgAnimationSwitcher);
    BgAnimationContainer.className = "setting-item";
    BgAnimationTitle.className = "setting-title";
    BgAnimationTitle.innerText = Strings.BgAnimation[UserSettings.Lang];
    BgAnimationContainer.append(BgAnimationTitle, BgAnimationSelectBox);
    return BgAnimationContainer;
  };
  const ReturnLoginRegisterBtn = () => {
    const LoginRegisterBtn = document.createElement("button");
    const LoginRegisterBtnIcon = document.createElement("img");
    const LoginRegisterBtnText = document.createElement("span");
    LoginRegisterBtnIcon.className = "side-bar-item-icon icon";
    LoginRegisterBtnIcon.src = "../Icons/cloud-line.svg";
    LoginRegisterBtnText.className = "side-bar-item-text text";
    LoginRegisterBtn.className = "cloud-storge-button setting-item";
    LoginRegisterBtnText.innerText = Strings.CouldStorgeButton[UserSettings.Lang];
    LoginRegisterBtn.addEventListener("click", AccountModal);
    LoginRegisterBtn.append(LoginRegisterBtnIcon, LoginRegisterBtnText);
    return LoginRegisterBtn;
  };
  const ReturnBackUpOptionsBtn = () => {
    const BackUpOptions = document.createElement("button");
    const BackUpOptionsIcon = document.createElement("img");
    const BackUpOptionsText = document.createElement("span");
    BackUpOptionsIcon.className = "side-bar-item-icon icon";
    BackUpOptionsIcon.src = "../Icons/inbox-archive-line.svg";
    BackUpOptionsText.className = "side-bar-item-text text";
    BackUpOptions.className = "generate-backup-button setting-item";
    BackUpOptionsText.innerText = Strings.BackUp[UserSettings.Lang];
    BackUpOptions.title = "ShortCut : F3";
    BackUpOptions.addEventListener("click", BackUpModal);
    BackUpOptions.append(BackUpOptionsIcon, BackUpOptionsText);
    return BackUpOptions;
  };
  const ReturnCustomizeThemeBtn = () => {
    const CustomizeTheme = document.createElement("button");
    const CustomizeThemeIcon = document.createElement("img");
    const CustomizeThemeText = document.createElement("span");
    CustomizeThemeIcon.className = "side-bar-item-icon icon";
    CustomizeThemeIcon.src = "../Icons/brush-line.svg";
    CustomizeThemeText.className = "side-bar-item-text text";
    CustomizeTheme.className = "customize-theme-button setting-item";
    CustomizeThemeText.innerText = Strings.CustomizeTheme[UserSettings.Lang];
    CustomizeTheme.title = "ShortCut : F4";
    CustomizeTheme.addEventListener("click", ThemeTweakerModal);
    CustomizeTheme.append(CustomizeThemeIcon, CustomizeThemeText);
    return CustomizeTheme;
  };
  SettingItemsContainer.append(
    ReturnBrightnessSettings(),
    ReturnLangSettings(),
    ReturnDatePickerSettings(),
    ReturnThemeSettings(),
    ReturnBackgroundAnimationSettings(),
    ReturnLoginRegisterBtn(),
    ReturnBackUpOptionsBtn(),
    ReturnCustomizeThemeBtn()
  );
  void SettingsContainer.offsetWidth;
  SettingsContainer.classList.add("setting-in");
}
function HideSettings() {
  const SettingsContainer = document.querySelector(".settings-container");
  SettingsContainer.classList.add("setting-out");
  setTimeout(() => SettingsContainer.remove(), 500);
}
async function LanguageSwitcher(Lang) {
  UserSettings.Lang = Lang;
  FixDirection();
  ShowDateAndClock();
  Save("UserSettings")
    .then((Reasponse) => {
      console.log(Reasponse);
      InistializeUI();
    })
    .catch((Error) => {
      DisplayMessage("Error", Error);
    });
}
async function ThemeSwitcher(Theme) {
  UserSettings.Theme = Theme;
  Save("UserSettings");
  InistializeUI();
}
function BgAnimationSwitcher(Animation) {
  UserSettings.BgAnimation = Animation;
  Save("UserSettings");
  InistializeUI();
}
function ChangeBrightness(Brightness) {
  const Overlay = document.querySelector(".brightness-overlay");
  Overlay.style.opacity = 100 - Brightness + "%";
  UserSettings.Brightness = Brightness;
}
function DatePickerSwitcher(Type) {
  UserSettings.Calendar = Type;
  DatePickerSettings.type = Type;
  Save("UserSettings");
  UpdateInbox();
}
