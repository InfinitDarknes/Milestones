const UserSettings = {
  CurrentLang: null,
  Calendar: null,
  Brightness: null,
  Theme: null,
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
  SettingTitle.innerText = Strings.SettingTitle[UserSettings.CurrentLang];
  HideSettingButtonIcon.src = "../Icons/close-large-line.svg";
  HideSettingButton.addEventListener("click", HideSettings);
  SettingHeader.append(SettingTitle, HideSettingButton);
  HideSettingButton.append(HideSettingButtonIcon);
  SettingsContainer.append(SettingHeader, SettingItemsContainer);
  document.body.append(SettingsContainer);
  // Brightness settings
  const BrightnessSettingContainer = document.createElement("section");
  const BrightnessSettingTitle = document.createElement("span");
  const BrightnessBar = document.createElement("input");
  BrightnessSettingContainer.className = "setting-item";
  BrightnessSettingTitle.className = "setting-title";
  BrightnessBar.id = "brightness-bar";
  BrightnessBar.type = "range";
  BrightnessBar.min = "10";
  BrightnessBar.max = "100";
  BrightnessBar.value = "100";
  BrightnessSettingTitle.innerText = Strings.Brightness[UserSettings.CurrentLang];
  BrightnessSettingTitle.id = "language-setting-title";
  BrightnessBar.id = "brightness-bar";
  BrightnessBar.addEventListener("input", ChangeBrightness);
  BrightnessSettingContainer.append(BrightnessSettingTitle, BrightnessBar);
  SettingItemsContainer.append(BrightnessSettingContainer);
  // Lang
  const LanguageSettingContainer = document.createElement("section");
  const LanguageSettingTitle = document.createElement("span");
  const LanguageSettingSelectBox = document.createElement("select");
  LanguageSettingContainer.className = "setting-item";
  LanguageSettingTitle.className = "setting-title";
  LanguageSettingSelectBox.className = "setting-select-box";
  LanguageSettingTitle.innerText = Strings.LanguageSetting[UserSettings.CurrentLang];
  LanguageSettingTitle.id = "language-setting-title";
  LanguageSettingSelectBox.id = "language-select-box";
  LanguageSettingContainer.append(LanguageSettingTitle, LanguageSettingSelectBox);
  SettingItemsContainer.append(LanguageSettingContainer);
  // English
  const EN = document.createElement("option");
  EN.innerText = "English";
  EN.id = "lang-en";
  EN.value = "en";
  EN.addEventListener("click", function () {
    LanguageSwitcher("en");
  });
  LanguageSettingSelectBox.append(EN);
  // Parsi/Farsi/Persian
  const FA = document.createElement("option");
  FA.innerText = "پارسی";
  FA.id = "lang-fa";
  FA.value = "fa";
  FA.title = "Persian";
  FA.addEventListener("click", function () {
    LanguageSwitcher("fa");
  });
  LanguageSettingSelectBox.append(FA);
  // DatePicker Setting
  const DatePickerSettingContainer = document.createElement("section");
  const DatePickerSettingTitle = document.createElement("span");
  const DatePickerSettingSelectBox = document.createElement("select");
  DatePickerSettingContainer.className = "setting-item";
  DatePickerSettingTitle.className = "setting-title";
  DatePickerSettingTitle.id = "date-picker-setting-title";
  DatePickerSettingSelectBox.className = "setting-select-box";
  DatePickerSettingTitle.innerText = Strings.DatePickerSetting[UserSettings.CurrentLang];
  DatePickerSettingContainer.append(DatePickerSettingTitle, DatePickerSettingSelectBox);
  SettingItemsContainer.append(DatePickerSettingContainer);
  // DatePicker Setting Options
  const LunarDatePickerOption = document.createElement("option");
  LunarDatePickerOption.innerText = Strings.LunarOption[UserSettings.CurrentLang];
  LunarDatePickerOption.id = "lunar-option";
  LunarDatePickerOption.addEventListener("click", () => DatePickerSwitcher("Lunar"));
  const SolarDatePickerOption = document.createElement("option");
  SolarDatePickerOption.innerText = Strings.SolarOption[UserSettings.CurrentLang];
  SolarDatePickerOption.id = "solar-option";
  SolarDatePickerOption.addEventListener("click", () => DatePickerSwitcher("Solar"));
  const GregorianDatePickerOption = document.createElement("option");
  GregorianDatePickerOption.innerText = Strings.GregorianOption[UserSettings.CurrentLang];
  GregorianDatePickerOption.id = "gregorian-option";
  GregorianDatePickerOption.addEventListener("click", () => DatePickerSwitcher("Gregorian"));
  DatePickerSettingSelectBox.append(LunarDatePickerOption, SolarDatePickerOption);
  DatePickerSettingSelectBox.append(GregorianDatePickerOption);
  // Clock Setting
  const ClockSettingContainer = document.createElement("section");
  const ClockSettingTitle = document.createElement("span");
  const ClockSettingSelectBox = document.createElement("select");
  ClockSettingContainer.className = "setting-item";
  ClockSettingTitle.className = "setting-title";
  ClockSettingTitle.id = "clock-setting-title";
  ClockSettingSelectBox.className = "setting-select-box";
  ClockSettingTitle.innerText = Strings.ClockSetting[UserSettings.CurrentLang];
  ClockSettingContainer.append(ClockSettingTitle, ClockSettingSelectBox);
  SettingItemsContainer.append(ClockSettingContainer);
  // Clock Setting Options
  const TwelveHourClockOption = document.createElement("option");
  TwelveHourClockOption.innerText = "12h";
  TwelveHourClockOption.id = "12h-option";
  const TwentyFourHourClockOption = document.createElement("option");
  TwentyFourHourClockOption.innerText = "24h";
  TwentyFourHourClockOption.id = "24h-option";
  ClockSettingSelectBox.append(TwelveHourClockOption);
  ClockSettingSelectBox.append(TwentyFourHourClockOption);
  // Theme Setting
  const ThemeSettingContainer = document.createElement("section");
  const ThemeSettingTitle = document.createElement("span");
  const ThemeSettingSelectBox = document.createElement("select");
  ThemeSettingContainer.className = "setting-item";
  ThemeSettingTitle.className = "setting-title";
  ThemeSettingTitle.id = "theme-setting-title";
  ThemeSettingSelectBox.className = "setting-select-box";
  ThemeSettingSelectBox.addEventListener("change", () => {
    console.log(ThemeSettingSelectBox.value);
    ThemeSwitcher(ThemeSettingSelectBox.value);
  });
  ThemeSettingTitle.innerText = Strings.ThemeSetting[UserSettings.CurrentLang];
  ThemeSettingContainer.append(ThemeSettingTitle, ThemeSettingSelectBox);
  SettingItemsContainer.append(ThemeSettingContainer);
  // Theme Setting Options
  AppObj.Themes.forEach((Theme) => {
    const ThemeOption = document.createElement("option");
    ThemeOption.id = `${Theme.toLowerCase()}-theme-option`;
    ThemeOption.value = Theme;
    ThemeOption.innerText = Theme;
    ThemeSettingSelectBox.append(ThemeOption);
  });
  // Cloud Storge Settings Section
  const CloudStorgeButton = document.createElement("button");
  const CloudStorgeButtonIcon = document.createElement("img");
  const CloudStorgeButtonText = document.createElement("span");
  CloudStorgeButtonIcon.className = "side-bar-item-icon icon";
  CloudStorgeButtonIcon.src = "../Icons/cloud-line.svg";
  CloudStorgeButtonText.className = "side-bar-item-text text";
  CloudStorgeButton.id = "cloud-storge-button";
  CloudStorgeButtonText.id = "cloud-storge-button-text";
  CloudStorgeButtonText.innerText = Strings.CouldStorgeButton[UserSettings.CurrentLang];
  CloudStorgeButton.addEventListener("click", () => {});
  CloudStorgeButton.append(CloudStorgeButtonIcon, CloudStorgeButtonText);
  SettingItemsContainer.append(CloudStorgeButton);
  // Generate BackUp section
  const BackUpOptions = document.createElement("button");
  const BackUpOptionsIcon = document.createElement("img");
  const BackUpOptionsText = document.createElement("span");
  BackUpOptionsIcon.className = "side-bar-item-icon icon";
  BackUpOptionsIcon.src = "../Icons/inbox-archive-line.svg";
  BackUpOptionsText.className = "side-bar-item-text text";
  BackUpOptions.id = "generate-backup-button";
  BackUpOptionsText.id = "generate-backup-button-text";
  BackUpOptionsText.innerText = Strings.BackUp[UserSettings.CurrentLang];
  BackUpOptions.addEventListener("click", BackUpModal);
  BackUpOptions.append(BackUpOptionsIcon, BackUpOptionsText);
  SettingItemsContainer.append(BackUpOptions);
  //
  void SettingsContainer.offsetWidth;
  SettingsContainer.classList.add("setting-in");
  DisplayUserSettingIntoDom();
}
function HideSettings() {
  const SettingsContainer = document.querySelector(".settings-container");
  SettingsContainer.classList.add("setting-out");
  setTimeout(() => SettingsContainer.remove(), 500);
}
function LanguageSwitcher(Lang) {
  UserSettings.CurrentLang = Lang;
  FixDirection();
  ShowDateAndClock();
  localStorage.setItem("Lang", Lang.toString());
  location.reload();
}
function ThemeSwitcher(Theme) {
  UserSettings.Theme = Theme;
  localStorage.setItem("Theme", Theme.toString());
  document.body.className = Theme;
  location.reload();
}
function ChangeBrightness() {
  let BrightnessValue = document.getElementById("brightness-bar").value;
  let Overlay = document.getElementById("overlay");
  UserSettings.Brightness = BrightnessValue;
  localStorage.setItem("Brightness", BrightnessValue.toString());
  Overlay.style.opacity = 100 - UserSettings.Brightness + "%";
}
function DatePickerSwitcher(Type) {
  UserSettings.Calendar = Type;
  DatePickerSettings.type = Type;
  localStorage.setItem("DatePickerType", Type);
  UpdateInbox();
}
function DisplayUserSettingIntoDom() {
  // Lang
  switch (UserSettings.CurrentLang) {
    case "fa":
      const FA = document.getElementById("lang-fa");
      FA.selected = true;
      break;
    case "en":
      const EN = document.getElementById("lang-en");
      EN.selected = true;
      break;
  }
  // Date Picker
  switch (UserSettings.Calendar) {
    case "Solar":
      const Solar = document.getElementById("solar-option");
      Solar.selected = true;
      break;
    case "Lunar":
      const Lunar = document.getElementById("lunar-option");
      Lunar.selected = true;
      break;
    case "Gregorian":
      const Gregorian = document.getElementById("gregorian-option");
      Gregorian.selected = true;
      break;
  }
  // Theme
  const Theme = document.querySelector(`#${UserSettings.Theme.toLowerCase()}-theme-option`);
  console.log(Theme);
  Theme.selected = true;
  // Brightness
  if (UserSettings.Brightness) {
    const BrightnessBar = document.getElementById("brightness-bar");
    BrightnessBar.value = UserSettings.Brightness;
  }
}
