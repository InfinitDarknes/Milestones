const UserSettings = {
  CurrentLang: null,
  AutoWriter: null,
  SideBar: null,
  TopBar: null,
  AutoBackUp: null,
  Calendar: null,
  ClockFormat: null,
  Brightness: null,
  Theme: null,
};
function DisplaySettings() {
  if (DoesElementExist("settings-container")) return;
  const SettingsContainer = document.createElement("section");
  const SettingItemsContainer = document.createElement("section");
  SettingItemsContainer.id = "setting-items-container";
  SettingsContainer.id = "settings-container";
  // Setting Title and hide setting button
  const SettingHeader = document.createElement("header");
  const SettingTitle = document.createElement("span");
  const HideSettingButton = document.createElement("button");
  const HideSettingButtonIcon = document.createElement("img");
  SettingHeader.id = "settings-header";
  SettingTitle.id = "settings-title";
  HideSettingButton.id = "hide-settings-button";
  HideSettingButtonIcon.id = "hide-settings-button-icon";
  SettingTitle.innerText = Strings.SettingTitle[UserSettings.CurrentLang];
  HideSettingButtonIcon.src = IconsSrc.CloseIcon[UserSettings.Theme];
  HideSettingButton.addEventListener("click", HideSettings);
  SettingHeader.appendChild(SettingTitle);
  SettingHeader.appendChild(HideSettingButton);
  HideSettingButton.appendChild(HideSettingButtonIcon);
  SettingsContainer.appendChild(SettingHeader);
  SettingsContainer.appendChild(SettingItemsContainer);
  document.body.appendChild(SettingsContainer);
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
  SettingItemsContainer.appendChild(BrightnessSettingContainer);
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
  LanguageSettingContainer.appendChild(LanguageSettingTitle);
  LanguageSettingContainer.appendChild(LanguageSettingSelectBox);
  SettingItemsContainer.appendChild(LanguageSettingContainer);
  // English
  const EN = document.createElement("option");
  EN.innerText = "English";
  EN.id = "lang-en";
  EN.value = "en";
  EN.addEventListener("click", function () {
    LanguageSwitcher("en");
  });
  LanguageSettingSelectBox.appendChild(EN);
  // Parsi/Farsi/Persian
  const FA = document.createElement("option");
  FA.innerText = "پارسی";
  FA.id = "lang-fa";
  FA.value = "fa";
  FA.title = "Persian";
  FA.addEventListener("click", function () {
    LanguageSwitcher("fa");
  });
  LanguageSettingSelectBox.appendChild(FA);
  // Sidebar Setting
  const SideBarSettingContainer = document.createElement("section");
  const SideBarSettingTitle = document.createElement("span");
  const SideBarSettingSelectBox = document.createElement("select");
  SideBarSettingContainer.className = "setting-item";
  SideBarSettingTitle.className = "setting-title";
  SideBarSettingTitle.id = "sidebar-setting-title";
  SideBarSettingSelectBox.className = "setting-select-box";
  SideBarSettingTitle.innerText = Strings.SideBarSetting[UserSettings.CurrentLang];
  SideBarSettingContainer.appendChild(SideBarSettingTitle);
  SideBarSettingContainer.appendChild(SideBarSettingSelectBox);
  SettingItemsContainer.appendChild(SideBarSettingContainer);
  // Sidebar Setting Options
  const HideSideBarOption = document.createElement("option");
  HideSideBarOption.innerText = Strings.HideSideBarOption[UserSettings.CurrentLang];
  HideSideBarOption.id = "hide-sidebar-option";
  const ShowSideBarOption = document.createElement("option");
  ShowSideBarOption.innerText = Strings.ShowSideBarOption[UserSettings.CurrentLang];
  ShowSideBarOption.id = "show-sidebar-option";
  SideBarSettingSelectBox.appendChild(ShowSideBarOption);
  SideBarSettingSelectBox.appendChild(HideSideBarOption);
  // Topbar Setting
  const TopBarSettingContainer = document.createElement("section");
  const TopBarSettingTitle = document.createElement("span");
  const TopBarSettingSelectBox = document.createElement("select");
  TopBarSettingContainer.className = "setting-item";
  TopBarSettingTitle.className = "setting-title";
  TopBarSettingTitle.id = "topbar-setting-title";
  TopBarSettingSelectBox.className = "setting-select-box";
  TopBarSettingTitle.innerText = Strings.TopBarSetting[UserSettings.CurrentLang];
  TopBarSettingContainer.appendChild(TopBarSettingTitle);
  TopBarSettingContainer.appendChild(TopBarSettingSelectBox);
  SettingItemsContainer.appendChild(TopBarSettingContainer);
  // Topbar Setting Options
  const DisableTopBarOption = document.createElement("option");
  DisableTopBarOption.innerText = Strings.DisableOption[UserSettings.CurrentLang];
  DisableTopBarOption.id = "disable-topbar-option";
  const EnableTopBarOption = document.createElement("option");
  EnableTopBarOption.innerText = Strings.EnableOption[UserSettings.CurrentLang];
  EnableTopBarOption.id = "enable-topbar-option";
  TopBarSettingSelectBox.appendChild(DisableTopBarOption);
  TopBarSettingSelectBox.appendChild(EnableTopBarOption);
  // Auto Writer Setting
  const AutoWriterSettingContainer = document.createElement("section");
  const AutoWriterSettingTitle = document.createElement("span");
  const AutoWriterSettingSelectBox = document.createElement("select");
  AutoWriterSettingContainer.className = "setting-item";
  AutoWriterSettingTitle.className = "setting-title";
  AutoWriterSettingTitle.id = "auto-writer-setting-title";
  AutoWriterSettingSelectBox.className = "setting-select-box";
  AutoWriterSettingTitle.innerText = Strings.AutoWriterSetting[UserSettings.CurrentLang];
  AutoWriterSettingContainer.appendChild(AutoWriterSettingTitle);
  AutoWriterSettingContainer.appendChild(AutoWriterSettingSelectBox);
  SettingItemsContainer.appendChild(AutoWriterSettingContainer);
  // Auto Writer Setting Options
  const DisableAutoWriterOption = document.createElement("option");
  DisableAutoWriterOption.innerText = Strings.DisableOption[UserSettings.CurrentLang];
  DisableAutoWriterOption.id = "disable-auto-writer-option";
  const EnableAutoWriterOption = document.createElement("option");
  EnableAutoWriterOption.innerText = Strings.EnableOption[UserSettings.CurrentLang];
  EnableAutoWriterOption.id = "enable-auto-writer-option";
  AutoWriterSettingSelectBox.appendChild(DisableAutoWriterOption);
  AutoWriterSettingSelectBox.appendChild(EnableAutoWriterOption);
  // Auto Backup Setting
  const AutoBackupSettingContainer = document.createElement("section");
  const AutoBackupSettingTitle = document.createElement("span");
  const AutoBackupSettingSelectBox = document.createElement("select");
  AutoBackupSettingContainer.className = "setting-item";
  AutoBackupSettingTitle.className = "setting-title";
  AutoBackupSettingTitle.id = "auto-backup-setting-title";
  AutoBackupSettingSelectBox.className = "setting-select-box";
  AutoBackupSettingTitle.innerText = Strings.AutoBackupSetting[UserSettings.CurrentLang];
  AutoBackupSettingContainer.appendChild(AutoBackupSettingTitle);
  AutoBackupSettingContainer.appendChild(AutoBackupSettingSelectBox);
  SettingItemsContainer.appendChild(AutoBackupSettingContainer);
  // Auto Backup Setting Options
  const DisableAutoBackupOption = document.createElement("option");
  DisableAutoBackupOption.innerText = Strings.DisableOption[UserSettings.CurrentLang];
  DisableAutoBackupOption.id = "disable-auto-backup-option";
  const EnableAutoBackupOption = document.createElement("option");
  EnableAutoBackupOption.innerText = Strings.EnableOption[UserSettings.CurrentLang];
  EnableAutoBackupOption.id = "enable-auto-backup-option";
  AutoBackupSettingSelectBox.appendChild(DisableAutoBackupOption);
  AutoBackupSettingSelectBox.appendChild(EnableAutoBackupOption);
  // DatePicker Setting
  const DatePickerSettingContainer = document.createElement("section");
  const DatePickerSettingTitle = document.createElement("span");
  const DatePickerSettingSelectBox = document.createElement("select");
  DatePickerSettingContainer.className = "setting-item";
  DatePickerSettingTitle.className = "setting-title";
  DatePickerSettingTitle.id = "date-picker-setting-title";
  DatePickerSettingSelectBox.className = "setting-select-box";
  DatePickerSettingTitle.innerText = Strings.DatePickerSetting[UserSettings.CurrentLang];
  DatePickerSettingContainer.appendChild(DatePickerSettingTitle);
  DatePickerSettingContainer.appendChild(DatePickerSettingSelectBox);
  SettingItemsContainer.appendChild(DatePickerSettingContainer);
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
  DatePickerSettingSelectBox.appendChild(LunarDatePickerOption);
  DatePickerSettingSelectBox.appendChild(SolarDatePickerOption);
  DatePickerSettingSelectBox.appendChild(GregorianDatePickerOption);
  // Clock Setting
  const ClockSettingContainer = document.createElement("section");
  const ClockSettingTitle = document.createElement("span");
  const ClockSettingSelectBox = document.createElement("select");
  ClockSettingContainer.className = "setting-item";
  ClockSettingTitle.className = "setting-title";
  ClockSettingTitle.id = "clock-setting-title";
  ClockSettingSelectBox.className = "setting-select-box";
  ClockSettingTitle.innerText = Strings.ClockSetting[UserSettings.CurrentLang];
  ClockSettingContainer.appendChild(ClockSettingTitle);
  ClockSettingContainer.appendChild(ClockSettingSelectBox);
  SettingItemsContainer.appendChild(ClockSettingContainer);
  // Clock Setting Options
  const TwelveHourClockOption = document.createElement("option");
  TwelveHourClockOption.innerText = "12h";
  TwelveHourClockOption.id = "12h-option";
  const TwentyFourHourClockOption = document.createElement("option");
  TwentyFourHourClockOption.innerText = "24h";
  TwentyFourHourClockOption.id = "24h-option";
  ClockSettingSelectBox.appendChild(TwelveHourClockOption);
  ClockSettingSelectBox.appendChild(TwentyFourHourClockOption);
  // Theme Setting
  const ThemeSettingContainer = document.createElement("section");
  const ThemeSettingTitle = document.createElement("span");
  const ThemeSettingSelectBox = document.createElement("select");
  ThemeSettingContainer.className = "setting-item";
  ThemeSettingTitle.className = "setting-title";
  ThemeSettingTitle.id = "theme-setting-title";
  ThemeSettingSelectBox.className = "setting-select-box";
  ThemeSettingSelectBox.addEventListener("change", () => ThemeSwitcher(ThemeSettingSelectBox.value));
  ThemeSettingTitle.innerText = Strings.ThemeSetting[UserSettings.CurrentLang];
  ThemeSettingContainer.appendChild(ThemeSettingTitle);
  ThemeSettingContainer.appendChild(ThemeSettingSelectBox);
  SettingItemsContainer.appendChild(ThemeSettingContainer);
  // Theme Setting Options
  const DarkThemeOption = document.createElement("option");
  DarkThemeOption.innerText = Strings.DarkThemeOption[UserSettings.CurrentLang];
  DarkThemeOption.id = "dark-theme-option";
  DarkThemeOption.value = "Dark";
  const LightThemeOption = document.createElement("option");
  LightThemeOption.innerText = Strings.LightThemeOption[UserSettings.CurrentLang];
  LightThemeOption.id = "light-theme-option";
  LightThemeOption.value = "Light";
  const NeonThemeOption = document.createElement("option");
  NeonThemeOption.innerText = Strings.NeonThemeOption[UserSettings.CurrentLang];
  NeonThemeOption.id = "neon-theme-option";
  NeonThemeOption.value = "Neon";
  ThemeSettingSelectBox.appendChild(DarkThemeOption);
  ThemeSettingSelectBox.appendChild(LightThemeOption);
  ThemeSettingSelectBox.appendChild(NeonThemeOption);
  // Cloud Storge Settings Section
  const CloudStorgeButton = document.createElement("button");
  const CloudStorgeButtonIcon = document.createElement("img");
  const CloudStorgeButtonText = document.createElement("span");
  CloudStorgeButtonIcon.className = "side-bar-item-icon";
  CloudStorgeButtonIcon.src = IconsSrc.CloudStorgeIcon[UserSettings.Theme];
  CloudStorgeButtonText.className = "side-bar-item-text";
  CloudStorgeButton.id = "cloud-storge-button";
  CloudStorgeButtonText.id = "cloud-storge-button-text";
  CloudStorgeButtonText.innerText = Strings.CouldStorgeButton[UserSettings.CurrentLang];
  CloudStorgeButton.addEventListener("click", () => {});
  CloudStorgeButton.appendChild(CloudStorgeButtonIcon);
  CloudStorgeButton.appendChild(CloudStorgeButtonText);
  SettingItemsContainer.appendChild(CloudStorgeButton);
  // Generate BackUp section
  const BackUpOptions = document.createElement("button");
  const BackUpOptionsIcon = document.createElement("img");
  const BackUpOptionsText = document.createElement("span");
  BackUpOptionsIcon.className = "side-bar-item-icon";
  BackUpOptionsIcon.src = IconsSrc.GenerateBackupIcon[UserSettings.Theme];
  BackUpOptionsText.className = "side-bar-item-text";
  BackUpOptions.id = "generate-backup-button";
  BackUpOptionsText.id = "generate-backup-button-text";
  BackUpOptionsText.innerText = Strings.BackUp[UserSettings.CurrentLang];
  BackUpOptions.addEventListener("click", BackUpModal);
  BackUpOptions.append(BackUpOptionsIcon, BackUpOptionsText);
  SettingItemsContainer.appendChild(BackUpOptions);
  //
  void SettingsContainer.offsetWidth;
  SettingsContainer.classList.add("setting-in");
  DisplayUserSettingIntoDom();
}
function HideSettings() {
  const SettingsContainer = document.getElementById("settings-container");
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
}
function LoadUserSettings() {
  UserSettings.CurrentLang = localStorage.getItem("Lang") ? localStorage.getItem("Lang") : "en";
  UserSettings.Theme = localStorage.getItem("Theme") ? localStorage.getItem("Theme") : "Dark";
  document.body.className = UserSettings.Theme;
  //
  UserSettings.Calendar = localStorage.getItem("DatePickerType") ? localStorage.getItem("DatePickerType") : "Gregorian";
  DatePickerSettings.type = localStorage.getItem("DatePickerType") ? localStorage.getItem("DatePickerType") : "Gregorian";
  UserSettings.Brightness = localStorage.getItem("Brightness") ? localStorage.getItem("Brightness") : 100;
  const Overlay = document.getElementById("overlay");
  Overlay.style.opacity = 100 - UserSettings.Brightness + "%";
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
  switch (UserSettings.Theme) {
    case "Dark":
      const Dark = document.getElementById("dark-theme-option");
      Dark.selected = true;
      break;
    case "Light":
      const Light = document.getElementById("light-theme-option");
      Light.selected = true;
      break;
    case "Neon":
      const Neon = document.getElementById("neon-theme-option");
      Neon.selected = true;
      break;
  }
  if (UserSettings.Brightness) {
    const BrightnessBar = document.getElementById("brightness-bar");
    BrightnessBar.value = UserSettings.Brightness;
  }
}
